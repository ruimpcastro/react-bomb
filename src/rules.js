import React from "react";
import { Link } from "react-router-dom";

import "./rules.css";

const Rules = () => (
  <div id="regras">
    <div id="regras-center">
      <h1>A Bomba</h1>
      <h3>Regras do jogo</h3>
      <p>
        O jogo é constituido por nove casas. Oito dessas casas têm prémios e uma
        delas tem a bomba.
      </p>
      <p>
        O objetivo do jogo é não acertar na bomba e quando quiser pode desistir
        do jogo recebendo os prémios no momento em que desiste. O total dos
        prémios pode chegar até 10.000€ em valor!
      </p>
      <p>
        Uma das casas constitui o Jackpot que dá um grande valor no prémio mas
        para ganhar o Jackpot terá de responder a uma pergunta de cultura geral.
      </p>
      <p>
        Caso acerte na bomba perde todos os seus prémios! Pronto para jogar?
      </p>
      <p className="negrito">
        O objetivo do jogo é ganhar o número máximo de prémios + jackpot, sem
        acertar na bomba.
      </p>
    </div>
    <div className="play">
      <Link
        to="./game"
        style={{
          width: "100%",
          textDecoration: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <button className="button-play">
          <h3>Jogar</h3>
        </button>
      </Link>
    </div>
  </div>
);

export default Rules;
