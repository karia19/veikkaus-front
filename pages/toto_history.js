import Layout from "../components/layout"
import React, { useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import moment from "moment";
import { useRecoilState } from "recoil";
import { horseOds, startNums, selectStart, detailsForResults, selectDetailsRes } from "../context/recoilData";
import PlotHistory from "../components/plotHistoryHorses";
import FromPoolId from "../components/fromPoolId";

const History = () => {
    const [ selDay, setSelDay ] = useState(new Date())
    const [ history, setHistory ] = useRecoilState(horseOds)
    const [ raceLen, setRaceLen ] = useRecoilState(startNums)
    const [ selNum, setSelNum ] = useRecoilState(selectStart)
    const [ raceDetails, setRaceDetails ] = useState([])
    const [ allDetails, setAllDetails ] = useRecoilState(detailsForResults)
    const [ showSel, setShowSel ] = useRecoilState(selectDetailsRes)

    React.useEffect(() => {
        
        (async() => {
            try {
               
                const days = {
                    day: moment(selDay).format('YYYY-MM-DD')
                }
                const ownApi = await axios.post("/api/historyRes", days)
                //console.log("dsd", ownApi)
                setAllDetails(ownApi.data)
                setRaceDetails(ownApi.data[0])

                const response = await axios.post("http://toto.kumstrapi.xyz/api/v1/toto/history_ods", days)
                setRaceLen(ownApi.data.map(x => x['raceNumber']))
                setHistory(JSON.parse(response.data))    
                //console.log(raceLen)            
            } catch(e){
              console.log("!")
            }
    
        })()
    },[selDay])
    console.log("whaaat", showSel)
    return(
        <Layout>


                <div className="container">
                    <div style={{}}>
                        <div style={{ padding: "20px"}} >
                            <p className="h3 text-center">Valitse päivä ja katso sieltä sen päivän ketoimet, kertoimet on päivittetty puolentunnin välein</p>
                        </div>
                        <div>
                            <Calendar onChange={setSelDay} />


                        </div>
                        {raceLen.length != 0 && raceDetails.length != 0 ?
                        <div>
                            <div style={{ marginTop: "20px"}}>
                                <h4 className="display-6 text-center" >{raceDetails['card']['trackName']} {raceDetails['card']['meetDate']}</h4>
                                <h3 className="h4">Lähtö {showSel['raceNumber']}</h3>
                                <p>{showSel['seriesSpecification']}</p>
                                <a style={{ color: "purple"}} href={showSel['videoLink']} target="_blank">Katso lähdön {showSel['raceNumber']}  video</a>       
                            </div>
                                <nav>
                                <ul className="pagination w-200 p-3">
                                
                                    {raceLen.map(x => 
                                        <li className="page-item"><a onClick={() => setSelNum(x)} className="page-link" href="#">{x}</a></li>
                                        
                                    )}
                                
                                </ul>
                                </nav>
                            <div>
                                <h5 style={{ paddingBottom: "20px", color: "blueviolet"}} className="fs-4">Tulos: {showSel['toteResult']} </h5>
                                <FromPoolId />
                            </div>
                               
                                <PlotHistory />

                        </div>            
                            :
                                    <p></p>
                                
                            }
                       
                    </div>
                   
                </div>
        </Layout>

        
    )
}


export default History;