import React, { Component } from "react";
import Square from "./Square";
import "./Board.css";

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
    ["Telemóvel", 800],
    ["Viagem aos Açores para 2 pessoas", 1000],
    ["Viagem à Madeira para 2 pessoas", 1000],
    ["Máquina de lavar roupa", 600],
    ["Máquina de lavar loiça", 800],
    ["Micro-ondas", 100],
    ["Frigorífico", 850],
    ["Máquina de café", 100],
    ["Computador", 950],
    ["Tablet", 250],
    ["Cruzeiro à ilhas gregas para 2 pessoas", 2000],
    ["Colar de Romeu Bettencourt", 1000],
    ["Viagem à Turquia para 2 pessoas", 750],
    ["Bicicleta de Manutenção", 300],
    ["Fim de semana para 2 pessoas no Hotel Buçaco", 1000],
    ["Prémio Monetário (100€)", 100],
    ["Prémio Monetário (200€)", 200],
    ["Prémio Monetário (300€)", 300],
    ["Prémio Monetário (400€)", 400],
    ["Prémio Monetário (500€)", 500],
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
  premiosSelecionados[indexBomba] = ["Bomba", 0];
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
    this.state = { premiosDescobertos: [], totalPremios: 0, bomba: false };
  }

  handleClick(i) {
    if (!this.state.bomba) {
      let nomePremio = premiosSelecionados[i - 1][0];
      let custoPremio = premiosSelecionados[i - 1][1];
      if (nomePremio === "Bomba") {
        this.setState({
          premiosDescobertos: ["ACERTOU NA BOMBA! PERDEU OS SEUS PRÉMIOS!"],
          totalPremios: 0,
          bomba: true,
        });
      } else if (
        !this.state.premiosDescobertos.includes(nomePremio) &&
        nomePremio !== "JACKPOT"
      ) {
        let totalPremios = this.state.totalPremios;
        let premiosDescobertos = this.state.premiosDescobertos;
        totalPremios += custoPremio;
        premiosDescobertos.push(nomePremio);
        this.setState({
          totalPremios: totalPremios,
          premiosDescobertos: premiosDescobertos,
        });
        console.log(this.state.premiosDescobertos);
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
  }

  renderSquare(i) {
    return (
      <Square value={i} onClick={() => this.handleClick(i)} parent={this} />
    );
  }

  listToHTML() {
    let lista = this.state.premiosDescobertos;
    let returnString = "";
    for (let i = 0; i < lista.length; i++) {
      returnString += lista[i] + "\n";
    }
    return returnString;
  }

  render() {
    const status = "The bomb";

    return (
      <div className="table">
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
        <div className="premios">{this.listToHTML()}</div>
      </div>
    );
  }
}

export default Board;
