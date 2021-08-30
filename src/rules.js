import React from "react";
import { Link } from "react-router-dom";

import "./rules.css";

const Rules = () => (
  <div id="regras">
    <div id="regras-center">
      <h1>Regras do Jogo da Bomba</h1>
      <p>
        O jogo irá apresentar-se como uma tabela 3 para 3 onde terão números
        aleatórios, de 1 a 9, onde:
      </p>
      <p>
        7 casas terão entre prémios monetários a prémios físicos ( ex:
        Telemóvel, computador, etc). Estes prémios iram ser distribuídos
        aleatoriamente pela tabela, garantindo que o custo total não ultrapassa
        os 10000€.
      </p>
      <p>
        1 casa terá um jackpot (Valor aleatório entre 2000€ e 4000€ + custo do
        prémio mais caro em jogo), no qual o jogado, para o ganhar, terá que
        responder corretamente a uma pergunta, no tempo máximo de 1 minuto. Se
        acertar, ganha o jackpot e todos os outros prémios que já ganhou. Se
        errar, ganha os prémios que ganhou anteriormente.
      </p>
      <p>
        1 casa terá uma bomba, no qual o jogador, perde tudo o que eventualmente
        tenha ganho.
      </p>
      <p className="negrito">
        O objetivo do jogo é ganhar o número máximo de prémios + jackpot, sem
        acertar na bomba.
      </p>

      <h1>Prémios disponíveis</h1>
      <ul>
        <li>Prémios monetários: 100€, 200€, 300€, 400€, 500€;</li>
        <li>Outros prémios:</li>
        <li>Telemóvel 800€;</li>
        <li>Viagem aos Açores para 2 pessoas 1000€;</li>
        <li>Viagem à Madeira para 2 pessoas 1000€;</li>
        <li>Máquina de lavar roupa 600€;</li>
        <li>Máquina de lavar loiça 800€;</li>
        <li>Micro-ondas 100€;</li>
        <li>Frigorífico 850€;</li>
        <li>Máquina de café 100€;</li>
        <li>Computador 950€;</li>
        <li>Tablet 250€;</li>
        <li>Cruzeiro às ilhas gregas p/ 2 pessoas 2000€;</li>
        <li>Colar de Romeu Bettencourt 1000€;</li>
        <li>Viagem à Turquia p/ 2 pessoas 750€;</li>
        <li>Bicicleta de manutenção 300€;</li>
        <li>Viagem à Turquia p/ 2 pessoas 750€;</li>
        <li>Fim de semana p/ 2 pessoas no Hotel Buçaco 1000€.</li>
      </ul>
    </div>
    <Link to="./game" style={{ textDecoration: "none" }}>
      <button className="button-rules">Jogar</button>
    </Link>
  </div>
);

export default Rules;
