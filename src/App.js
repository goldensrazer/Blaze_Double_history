import { useState } from 'react';
import crypto from "crypto-js";
import preview from './preview.gif';

const TILES = [
  { number: 0, color: "white" },
  { number: 11, color: "black" },
  { number: 5, color: "red" },
  { number: 10, color: "black" },
  { number: 6, color: "red" },
  { number: 9, color: "black" },
  { number: 7, color: "red" },
  { number: 8, color: "black" },
  { number: 1, color: "red" },
  { number: 14, color: "black" },
  { number: 2, color: "red" },
  { number: 13, color: "black" },
  { number: 3, color: "red" },
  { number: 12, color: "black" },
  { number: 4, color: "red" }
];

function App() {
  const [state, setState] = useState({
    server_seed: "e2b721e3660b7b328f632406e7fc8859d819473eb7bf8a108b4a57cff34dbc78",
    amount: 10
  });
  const chain = [state.server_seed];

  for (let i = 0; i < state.amount; i++) {
    chain.push(
      crypto.SHA256(chain[chain.length - 1]).toString(crypto.enc.Hex)
    );
  }

  const clientSeed =
    "0000000000000000002aeb06364afc13b3c4d52767e8c91db8cdb39d8f71e8dd";

  return (
    <div className="App">
      <h1>Bem-vindo</h1>

      <img alt='' className='preview' src={preview} />
      <h3>Created by Kel R.C</h3>
      <h3 className='attemption'>Lembrando o histórico é, dessa chave para trás, quando eu acertar para frente, fica todo mundo rico!</h3>

      <div className='form'>
        <div className='server_seed'>
          <h3>Digite server_seed do ultimo jogo !!! ultima key 2022-01-25 20:39</h3>
          <input
            type={'text'}
            value={state.server_seed}
            onChange={e => setState(event => ({ ...event, server_seed: e.target.value }))}
          />
        </div>
        <div className='count'>
          <h3>Digite a quantidade a ser exibida no histórico</h3>
          <input
            type={'number'}
            value={state.amount}
            onChange={e => setState(event => ({ ...event, amount: e.target.value }))}
          />
        </div>
      </div>
      <h1>Double rolls:</h1>

      {!state.server_seed || state.server_seed.length !== 64 ? (
        <h3 style={{ color: "red" }}>
          Please enter a server seed to view this table
        </h3>
      ) : (

        <div className="parent" >
          {chain.map((seed, index) => {
            const hash = crypto.HmacSHA256(clientSeed, seed).toString(crypto.enc.Hex);
            // roulette number from 0-15
            const n = parseInt(hash, 16) % 15;

            const tile = TILES.find(t => t.number === n);

            return (

              <div key={index} className="roulette-tile">
                <div className={`lg-box ${tile.color}`}>

                  {
                    tile.color === 'white' ?
                      <img className="lg-box" alt="" src="https://blaze.com/static/media/logo-icon.75d9365f.svg"></img> : <div className="number">{tile.number}</div>
                  }
                </div>

              </div>
            );
          })}
        </div>

      )}
    </div>
  );
}

export default App;
