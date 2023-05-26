import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Lauout from '../components/layout'
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { driverStats, coachStats, tracDetailsCar, tracDetailsVolt } from "../context/recoilData"
import { useRecoilState } from 'recoil';
import StatsTable from '../components/statsTable';

const tracks = ['', 'Kuopio', 'Vermo', 'Härmä', 'Pori', 'Ylivieska', 'Jokimaa', 'Kaustinen', 
'Seinäjoki', 'Joensuu', 'Kouvola', 'Mikkeli', 'Lappeenranta', 'Oulu', 
'Forssa', 'Turku', 'Joensuu', 'Jyväskylä','Teivo', 'Vieremä', 'Kajaani']


              
const dockerURL =  "http://0.0.0.0:8000/api/v1/toto/history" 
const dockerInAWS = "http://toto.kumstrapi.xyz/api/v1/toto/history"


export default function Home() {
  const [ isDataREady ,setIsDataReady ] = useState('')
  const [ driver, setDriver ] = useRecoilState(driverStats)
  const [ coach, setCaoch ] = useRecoilState(coachStats)
  const [ car, setCar ] = useRecoilState(tracDetailsCar)
  const [ volt, setVolt ] = useRecoilState(tracDetailsVolt)
  const [ city, setCity ] = useState('')
  const [ message, setMessage ] = useState('')
  const [ cityDealy, setCityDelay ] = useState('')


  /*
  useEffect(() => {
    (async() => {
        try {
          setIsDataReady('data loading')
          const res_stats = await axios.get("http://localhost:8000/api/v1/toto")
      
          setCaoch(JSON.parse(res_stats.data['coach']))
          setDriver(JSON.parse(res_stats.data['drivers']))
        

          if (Object.keys(res_stats.data["car"]).length > 0){
              setIsDataReady('')
              setCar(JSON.parse(res_stats.data['car']))
              setVolt(JSON.parse(res_stats.data['volt']))

          }
        } catch(e){
          console.log("!")
        }

    })()
  },[])
  */

  const serachCity = async () => {
    const place = {
      city: city
    }
    try {
      setIsDataReady('data loading')
      const res_stats = await axios.post(dockerInAWS, place)
      setMessage('')
      setCityDelay(city)
  
      setCaoch(JSON.parse(res_stats.data['coach']))
      setDriver(JSON.parse(res_stats.data['drivers']))
    

      if (Object.keys(res_stats.data["car"]).length > 0){
          setIsDataReady('')
        
          setCar(JSON.parse(res_stats.data['car']))
          setVolt(JSON.parse(res_stats.data['volt']))

      }
    } catch(e){
      setMessage("no data")
      setCar([])
      setDriver([])
      setCaoch([])
      setVolt([])
      setIsDataReady('')
      setCityDelay(city)

    }

  }






  return (
    <div>
      <Head>
     
      </Head>
      <Lauout>
          <main className='container'>   


                    {isDataREady.length != 0 ?
                      
                        <div className="spinner-border text-info" role="status" >
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        :
                        <p></p>
                    }
                    <h1>Ratatiedot</h1>
                    <p className=''>Tiedot päivittyvät noin kerran viikossa. Tiedot ovat vuosilta 2017-2022</p>

                    <div style={{ padding: "20px" ,display: 'flex', justifyContent: "center", alignItems: "center"}}>
                      <select  onChange={(e) => setCity(e.target.value)}>
                        {tracks.map(x => 
                          <option value={x} >{x}</option>
                        )}
                      </select>
                    </div>
                    <div style={{display: 'flex', justifyContent: "center", alignItems: "center"}}>
                      <button onClick={() => serachCity()} style={{ backgroundColor: "black",color: "white", marginBottom: "20px"  }} className={styles.button51}>Get Stats</button>
                    
                    </div>

                    {cityDealy.length != 0 ?
                        <h2 style={{ justifyContent: "center"}}>{cityDealy}</h2>
                        :
                        <p></p>

                    }
                    
                    {message.length != 0
                        ?
                        <div class="alert alert-danger" role="alert">
                            There is no data sorry. 
                            Try another city
                        </div>
                        :
                        <p></p>
                    
                    }
                  
                    <StatsTable />
          </main>
      </Lauout>
    
    </div>
  )
}
