import axios from "axios";
import { useRecoilState } from "recoil";
import { selectDetailsRes, selectStart } from "../context/recoilData";
import React from 'react';

const fromPoolId = () => {
    const [ selNum, setSelNum ] = useRecoilState(selectStart)
    const [ raceData, setRaceData ] = useRecoilState(selectDetailsRes)
    const [ showData, setShowData ] = React.useState([])

    React.useEffect(() => {
        (async() => {
            try {
                console.log("this is from poolId", raceData)

                const sendData = {
                    id: raceData['raceId']
                }
                const resFromApi = await axios.post("/api/historyDetails", sendData)
                console.log("what is response", resFromApi)
                setShowData(resFromApi.data['runners'])


            } catch(e){
              console.log("!")
            }
    
        })()
    },[selNum])



    return (
        <div>
            {showData.length != 0 ?
                <div className="">
                <div className="list-group">
                    {showData.map(x =>
                    <div>
                     
                    <div  className="d-flex w-50 justify-content-between">
                        <h6 classNAme="mb-2">{x['startNumber']}. {x['horseName']}</h6>
                        <small>KM: {x['kmTime']}</small>

                        </div>
                            <p class="mb-1">Ohjastaja: <strong>{x['driverFirstName']} {x['driverLastName']} </strong>.   Kerroin: <strong> {x['winProbable'] / 100 } </strong>
                               
                            </p>
                            <small></small>
                    
                    </div>
                    
                     
                )}
                </div>
               
                </div>
                :

                <p>No data</p>
            }

        </div>
    )
}


export default fromPoolId;