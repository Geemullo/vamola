
import './App.css'
import { useEffect, useState } from 'react';
import  credentials  from '../credentials/google-sheets-api.json'
import { ApiIGDB } from '../components/IGDBapi/api'

const apiKey = credentials.api_key

function App() {

  const [ dados, setDados ] = useState([])
  
  const spreadsheetId = "1lUANANghsg43FFiX4reWdXkjDRHVHu8tPTuZjRO631k"
  

  const dadosPlanilha = async (url) => {
    const res = await fetch(url)
    const data = await res.json()
    const result = data.values.map((dados) => ({
      status: dados[0],
      jogo: dados[1],
      nota: dados[2],
      comentario: dados[3],
      data_inicio: dados[4],
      data_fim: dados[5],
      duracao: dados[6],
      mortes: dados[7],
      trechos: dados[8]
    }))
    setDados(result)
  }

  /*useEffect(() => {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/'JOGOS'!A7:K?key=${apiKey}`
    dadosPlanilha(url)
  }, [])*/

  return (
      <div>
        {/* <div className='cards'>
          {dados.length > 0 && dados.map((objeto) => 
            <div className='rows'>
              <p>{objeto.status}</p>
              <p>{objeto.jogo}</p>
              <p>{objeto.nota}</p>
              <p>{objeto.data_inicio}</p>
              <p>{objeto.data_fim}</p>
              <p>{objeto.duracao}</p>
              <p>{objeto.mortes}</p>
            </div>)}
        </div> */}
        <ApiIGDB />
      </div>
  )
}

export default App
