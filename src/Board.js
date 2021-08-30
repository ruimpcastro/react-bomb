import React, { Component } from "react";
import { Link } from "react-router-dom";
import Square from "./Square";
import Pergunta from "./Pergunta";
import "./Board.css";

import Iphone from "./assets/iphone-12.jpeg";
import Viagem from "./assets/bilhetes-de-aviao.jpeg";
import Roupa from "./assets/lavar-roupa.jpg";
import Louca from "./assets/lavar-louca.jpeg";
import Microondas from "./assets/microondas.jpeg";
import Frigorifico from "./assets/frigorifico.jpeg";
import Cafe from "./assets/cafe.jpeg";
import iMac from "./assets/imac.jpeg";
import Tablet from "./assets/tablet.jpeg";
import Cruzeiro from "./assets/cruise.jpeg";
import Colar from "./assets/colar.jpeg";
import Bicicleta from "./assets/bicicleta.jpeg";
import Hotel from "./assets/hotel.jpeg";
import Notas from "./assets/notas.jpeg";
import Bomba from "./assets/bomba.gif";

function shuffle() {
  let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While list not empty
  while (0 !== currentIndex) {
    // Pick a random element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function resetPremios() {
  premios = [
    ["Telemóvel - 800€", 800, Iphone],
    ["Viagem aos Açores para 2 pessoas - 1000€", 1000, Viagem],
    ["Viagem à Madeira para 2 pessoas - 1000€", 1000, Viagem],
    ["Máquina de lavar roupa - 600€", 600, Roupa],
    ["Máquina de lavar loiça - 800€", 800, Louca],
    ["Micro-ondas - 100€", 100, Microondas],
    ["Frigorífico - 850€", 850, Frigorifico],
    ["Máquina de café - 100€", 100, Cafe],
    ["Computador - 950€", 950, iMac],
    ["Tablet - 250€", 250, Tablet],
    ["Cruzeiro à ilhas gregas para 2 pessoas - 2000€", 2000, Cruzeiro],
    ["Colar de Romeu Bettencourt - 1000€", 1000, Colar],
    ["Viagem à Turquia para 2 pessoas - 750€", 750, Viagem],
    ["Bicicleta de Manutenção - 300€", 300, Bicicleta],
    ["Fim de semana para 2 pessoas no Hotel Buçaco - 1000€", 1000, Hotel],
    ["Prémio Monetário - 100€", 100, Notas],
    ["Prémio Monetário - 200€", 200, Notas],
    ["Prémio Monetário - 300€", 300, Notas],
    ["Prémio Monetário - 400€", 400, Notas],
    ["Prémio Monetário - 500€", 500, Notas],
  ];
}

function escolha(choices) {
  let index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function totalPremios(listaPremios) {
  let totalPremio = 0;
  for (let i = 0; i <= listaPremios.length; i++) {
    totalPremio *= listaPremios[1];
  }
  return totalPremio;
}

function removeItem(value) {
  let index = premios.indexOf(value);
  if (index > -1) {
    premios.splice(index, 1);
  }
}

function gerarJackpot() {
  return Math.floor(Math.random() * 2000) + 2000 + maiorPremio;
}

function gerarListaPremios() {
  let listaPremios = [];
  while (listaPremios.length < 9) {
    let premioEscolhido = escolha(premios);
    listaPremios.push(premioEscolhido);
    removeItem(premioEscolhido);
    if (premioEscolhido[1] > maiorPremio) {
      maiorPremio = premioEscolhido[1];
    }
  }
  if (totalPremios(listaPremios) > 10000) {
    resetPremios();
    gerarListaPremios();
  }
  resetPremios();
  return listaPremios;
}

function inserirEspeciais() {
  let indexJackpot = 0;
  let indexBomba = 0;
  while (indexJackpot === indexBomba) {
    indexJackpot = Math.floor(Math.random() * 8);
    indexBomba = Math.floor(Math.random() * 8);
  }
  premiosSelecionados[indexJackpot] = ["JACKPOT", jackpot];
  premiosSelecionados[indexBomba] = ["Bomba", 0, Bomba];
}

let array = shuffle();
let premios;
let maiorPremio = 0;
resetPremios();
let premiosSelecionados = gerarListaPremios();
let jackpot = gerarJackpot();
inserirEspeciais();
console.log(premiosSelecionados);

class Board extends Component {
  constructor(props) {
    super(props);
    this.premiosDescobertos = [];
    this.totalPremios = 0;
    this.valorPremio = 0;
    this.imageList = [];
    this.state = {
      premiosDescobertos: [],
      valorPremio: [],
      imageList: [],
      totalPremios: 0,
      bomba: false,
    };
  }

  handleClick(i) {
    if (!this.state.bomba) {
      let nomePremio = premiosSelecionados[i - 1][0];
      let custoPremio = premiosSelecionados[i - 1][1];
      let imagePremio = premiosSelecionados[i - 1][2];
      if (nomePremio === "Bomba") {
        this.setState({
          premiosDescobertos: [
            "Acertou na bomba! Perdeu todos os seus prémios!",
          ],
          valorPremio: custoPremio,
          totalPremios: 0,
          bomba: true,
          imageList: [Bomba],
        });
      } else if (
        !this.state.premiosDescobertos.includes(nomePremio) &&
        nomePremio !== "JACKPOT"
      ) {
        let totalPremios = this.state.totalPremios;
        let premiosDescobertos = this.state.premiosDescobertos;
        let imageList = this.state.imageList;
        totalPremios += custoPremio;
        premiosDescobertos.push(nomePremio);
        imageList.push(imagePremio);
        this.setState({
          totalPremios: totalPremios,
          premiosDescobertos: premiosDescobertos,
          imageList: imageList,
        });
        console.log("Prémios descobertos: ", this.state.premiosDescobertos);
        console.log("Sum prémios: ", this.state.totalPremios);
        console.log("Imagem de prémios: ", this.state.imageList);
      }
      if (nomePremio === "JACKPOT") {
        this.makePerguntaVisible();
      }
    }
  }

  handleQuestionClick(resposta, parent) {
    let premiosDescobertos = parent.state.premiosDescobertos;
    let totalPremios = parent.state.totalPremios;
    let bomba = parent.state.bomba;
    if (resposta === "nao") {
      // ERROU
      premiosDescobertos.push("JACKPOT: RESPOSTA FALHADA");
      parent.setState({
        premiosDescobertos: premiosDescobertos,
        totalPremios: totalPremios,
        bomba: bomba,
      });
    } else {
      // ACERTOU
      premiosDescobertos.push("JACKPOT: RESPOSTA ACERTADA");
      totalPremios += jackpot;
      parent.setState({
        premiosDescobertos: premiosDescobertos,
        totalPremios: totalPremios,
        bomba: bomba,
      });
    }
    parent.makePerguntaInvisible();
  }

  makePerguntaVisible() {
    let divElement = document.getElementById("perguntaDiv");
    divElement.style.visibility = "visible";
  }

  makePerguntaInvisible() {
    let divElement = document.getElementById("perguntaDiv");
    divElement.style.visibility = "hidden";
  }

  renderPergunta() {
    return (
      <Pergunta
        parentCallback={this.handleQuestionClick}
        parent={this}
        invisible={true}
      />
    );
  }

  renderSquare(i) {
    return (
      <Square value={i} onClick={() => this.handleClick(i)} parent={this} />
    );
  }

  listText() {
    let lista = this.state.premiosDescobertos;
    let returnString = [];
    for (let i = 0; i < lista.length; i++) {
      returnString.push(<p className="premio">{lista[i]}</p>);
    }
    return returnString;
  }

  listToHTML() {
    let lista = this.state.premiosDescobertos;
    let imagem = this.state.imageList;
    let returnString = [];
    for (let i = 0; i < lista.length; i++) {
      returnString = (
        <div className="premio-and-image">
          <p style={{ margin: "0", padding: "0" }}>{lista[i]}</p>
          <img className="premio-img" src={imagem[i]} alt={lista[i]} />
        </div>
      );
    }
    return returnString;
  }

  render() {
    const status = "The bomb";

    return (
      <div className="table">
        <div id="perguntaDiv">{this.renderPergunta()}</div>
        <div className="status">
          <h1>{status}</h1>
        </div>
        <br />
        <div className="board-row">
          {this.renderSquare(array[0])}
          {this.renderSquare(array[1])}
          {this.renderSquare(array[2])}
        </div>

        <div className="board-row">
          {this.renderSquare(array[3])}
          {this.renderSquare(array[4])}
          {this.renderSquare(array[5])}
        </div>

        <div className="board-row">
          {this.renderSquare(array[6])}
          {this.renderSquare(array[7])}
          {this.renderSquare(array[8])}
        </div>
        <div>
          <h3>Prémio: {this.state.totalPremios}</h3>
        </div>
        <div className="premios">
          <h3>Prémios</h3>
          {this.listText()}
        </div>
        <div className="premio-temp">{this.listToHTML()}</div>
        <div className="left-buttons">
          <Link to="./">
            <button className="button-rules">Regras</button>
          </Link>
          <button
            className="button-restart"
            onClick={() => {
              window.location.href = "./game";
            }}
          >
            Recomeçar jogo
          </button>
        </div>
      </div>
    );
  }
}

export default Board;
