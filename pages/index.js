import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Lauout from '../components/layout'
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { horses, startNums, raceCity, horseOds } from "../context/recoilData"
import { useRecoilState, useResetRecoilState } from 'recoil';
import ShowHorses from '../components/horsesStats';

const tracks = ['', 'Kuopio', 'Vermo', 'Härmä', 'Pori', 'Ylivieska', 'Jokimaa', 'Kaustinen', 
'Seinäjoki', 'Joensuu', 'Kouvola', 'Mikkeli', 'Lappeenranta', 'Oulu', 
'Forssa', 'Turku', 'Joensuu', 'Jyväskylä','Teivo', 'Vieremä', 'Kuopio', 'Kajaani']


const todayUrl = "http://0.0.0.0:8000/api/v1/toto/today"
const todayOdsURL = "http://0.0.0.0:8000/api/v1/toto/odds"

const dockerInAWS = "http://toto.kumstrapi.xyz/api/v1/toto/today"
const dockerInAWSOds = "http://toto.kumstrapi.xyz/api/v1/toto/odds"


export default function Home() {
  const [ isDataREady ,setIsDataReady ] = useState('')
  const [ horse, setHorses ] = useRecoilState(horses)
  const [ city, setCity ] = useState('')
  const [ startsLen, setStartsLen ] = useRecoilState(startNums)
  const [ cityRecoil, setCityRecoil ] = useRecoilState(raceCity)
  const [ todayOds, setTodayOds ] = useRecoilState(horseOds)
  const [ cityWhenReady, setCityWhenReady ] = useState('')
  const [ message, setMessage ] = useState('')


  const serachCity = async () => {
    const place = {
      city: city
    }
    setCityRecoil(city)

    try {
      setIsDataReady('data loading')
      setMessage('')
      //const resHorses = await axios.post("http://localhost:8000/api/v1/toto/today", place)
      const resHorses = await axios.post(dockerInAWS, place)


      //const today_ods_moves = await axios.post("http://localhost:8000/api/v1/toto/odds", place)
      const today_ods_moves = await axios.post(dockerInAWSOds, place)
      console.log(today_ods_moves, "helooo")

      setTodayOds(today_ods_moves.data)
      
      console.log(JSON.parse(resHorses.data['horses']))
      setHorses(JSON.parse(resHorses.data['horses']))
      setStartsLen(resHorses.data['starts'])
      
      if (resHorses.statusText == 'OK'){
        setIsDataReady('')
        setCityWhenReady(city)
      } 
      
    } catch(e){
      console.log("!")
      setIsDataReady("")
      setTodayOds([])
      setStartsLen([])
      setHorses([])
      setMessage(`No data in ${city} check today race city`)
      setCityWhenReady('')

    }

  }






  return (
    <div>
      <Head>
        <title>Today TOTO</title>
      </Head>
      <Lauout>
          <main className="container" style={{ marginTop: "20px"}}>   
                    
                    <h2 style={{fontFamily:'Fascinate'}}>TOTO-APP</h2>
                    <p style={{ width: "70%"}}>Kaikki sivuston tiedot päivitetään noin kerran viikossa. Valittavana vain tietyt radat ja näille myös ennustukset lähtöihin.
                    Sama myös jos haet historia tietoja valittavana vain tietyt radat. Tässä haussa hateaan päivän lähdön tiedot</p>
                    
                    
                    {isDataREady.length != 0 ?
                        <div className="spinner-border text-info" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        :
                        <p></p>
                    }
                    <div style={{ paddingTop: "19px" }}>
                      <select className="custom-select" onChange={(e) => setCity(e.target.value)}>
                        {tracks.map(x => 
                          <option value={x} >{x}</option>
                        )}
                      </select>
                    </div>
                    <div style={{justifyContent: "left", marginTop: "20px", marginBottom: "20px"}}>
                      <button  onClick={() => serachCity()} className="btn btn-outline-dark">Get Stats</button>
                    
                    </div>

                    {isDataREady.length != 0 ?
                        <p></p>
                        :
                        <div>
                          {cityWhenReady.length == 0 ?
                            <p></p>
                            :
                            <div>
                              <h2>{cityWhenReady}</h2>
                              <p style={{ width: "70%", paddingTop: "10px", paddingBottom: "20px"}}>LP = Viimeinen sijoitus, Hw = Hevosen voittoprosentti, Dw = Ohjastajan voittoprosentti, Cw = Valmentajan voittoprosentti. <strong>
                              Tiedot on laskettu vuodelta 2022</strong></p>   
                            </div>
                          }
                                            
                          <ShowHorses />
                        </div>
                        
                       
                    }
                    {message.length != 0
                        ?
                        <div class="alert alert-danger" role="alert">
                           {message}
                        </div>
                        :
                        <p></p>
                    
                    }

                  
                    
                   
          </main>
      </Lauout>
    
    </div>
  )
}
