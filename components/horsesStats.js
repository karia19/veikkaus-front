import axios from "axios";
import React from "react";
import { useRecoilState } from "recoil";
import { horses, startNums, raceCity, selectStart } from "../context/recoilData";
import PlotHorses from '../components/plotHorses';

//const dockerInAWS = "http://toto.kumstrapi.xyz/api/v1/toto/machine_learn"
const dockerInAWS = "https://server-toto.onrender.com/api/v1/toto/machine_learn"

const todayHorses = () => {
    const [ todayHorses, setTodayHorses ] = useRecoilState(horses)
    const [ startsLen, setStartsLen ] = useRecoilState(startNums)
    const [ startH, setStartH ] = React.useState([])
    const [ selNum, setSelNum ] = useRecoilState(selectStart)
    const [ searcCity, setSearchCity ] = useRecoilState(raceCity)
    const [ rTensor, setRTensor ] = React.useState([])
    const [ message, setMessage ] = React.useState('')

    React.useEffect(() => {
        (async() => {
            try {
                setStartH(todayHorses.filter(x => x['start_num'] == selNum))

            } catch(e){
              console.log("!")
            }
    
        })()
    },[selNum])

    const tensorFlow  = async () => {
        const place = {
            city: searcCity
        }
        try {
            setMessage("Ladataan ennustuksia tämä voi viedä hetken")
            //const resTensor =  await axios.post("http://0.0.0.0:8000/api/v1/toto/machine_learn", place)
            
            const resTensor =  await axios.post(dockerInAWS, place)

            console.log("this is res from ten", resTensor)
            setRTensor(resTensor.data)
            setMessage('')
            if (resTensor.data['message'].length != 0){
                console.log("messgae")
                setMessage("Virhe ladatessa...")
            } else if (resTensor.data.length != 0) {
                
            } else {
                console.log("kaikki öadattu")
                setRTensor(resTensor.data)
                setMessage('')
            }

        } catch(e){
            console.log(e)
        }

    }
    
    const StartHorses = () => {
        

        if (startH.length != 0){
            return(
                <div>
                    {message.length == 0 ?
                        <p></p>
                        :
                        
                        <div className="spinner-grow text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    }
                    <h4 style={{marginTop: "17px"}}>Start {selNum}</h4>
                    <table className='table table-striped' >
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Horse</th>
                            <th>Driver</th>
                            <th>D</th>
                            <th>€ 2022</th>
                            <th>LP</th>
                            <th>%</th>
                            <th>Hw %</th>
                            <th>Dw %</th>
                            <th>Cw %</th>
                            <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>      
                            {startH.map((x ,y)=>
                                // eslint-disable-next-line react/jsx-key
                                <tr key={y}>
                                <td>{x['track']}</td>
                                <td>{x['name']}</td>
                                <td>{x['driver']}</td>
                                <td>{x['distance']}m</td>
                                <td>{x['win_money'] / 100}€</td>
                                <td>{x['last_run']}</td>  
                                <td>{x['probable'].toFixed(2)}%</td>
                                <td>{x['horse_win_prob'].toFixed(2)}</td>
                                <td>{x['d_w_pr'].toFixed(2)}</td>
                                <td>{x['c_w_pr'].toFixed(2)}</td>
                                <td>{x['points']}</td>
                                </tr>
                            )}
                        </tbody> 
                    </table>

                    
                    {rTensor.length != 0 ?

                        <div style={{ diplay: "flex"}}>
                        <h4 style={{fontFamily:'Aduiowied', paddingTop: "20px"}}>This is result from predictions</h4>
                        <table className='table table-striped' >
                            <thead>
                                <tr>
                                        <th>Model</th>
                                             {rTensor['boost'].map((x, y) =>
                                        
                                        <th>{y + 1}</th>
                                    
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>Boost</td>
                                    {rTensor['boost'].map((x ,y) =>
                                    // eslint-disable-next-line react/jsx-key
                                    
                                    <td>{x}</td>
                                
                                    
                                    
                                )}
                                
                                </tr>
                                <tr>
                                <td>Logas</td>
                                {rTensor['logas'].map((x ,y) =>
                                    // eslint-disable-next-line react/jsx-key
                                    
                                    <td>{x}</td>
                                
                                    
                                    
                                )}
                                </tr>
                                <tr>
                                <td>Xgbc</td>
                                {rTensor['xgbc'].map((x ,y) =>
                                    // eslint-disable-next-line react/jsx-key
                                    
                                    <td>{x}</td>
                                
                                    
                                    
                                )}

                                </tr>
                            
                            </tbody> 
                        </table>
                      
                    </div>
                    :   
                    <div>
                  
                        <p></p>
                    
                    

                   
                    </div>
                    }
                    <PlotHorses />
                </div>
            )
        } else {
            return(
                null
            )
        }

    }
    return(
        <div>
            {startsLen.length != 0 ?
            <nav>
            <ul className="pagination w-100 p-3">
                {startsLen.map(x => 
                    <li className="page-item"><a onClick={() => setSelNum(x)} className="page-link" href="#">{x}</a></li>
                    
                )}
                <li className="page-itme" ><a className="page-link" href="#" onClick={() => tensorFlow()}>Make predictions</a></li>

            </ul>
            </nav>
                    :
                    <p></p>
                
            }
            {/*
            <div style={{ display: "flex"}}>
                {startsLen.map(x => 
                    <button onClick={() => setSelNum(x)} style={{ marginLeft: "10px"}} className="btn btn-outline-primary">{x}</button>
                    
                )}
                

            </div>
            */}
            {/*
            <button onClick={() => tensorFlow()} style={{marginTop: "20px"}} className="btn btn-info">Predict</button>
            */}

            <StartHorses />
            
          
        </div>
    )
}


export default todayHorses;
