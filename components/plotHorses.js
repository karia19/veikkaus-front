import React from 'react'
import { RecoilState, useRecoilState } from "recoil";
import { horseOds, startNums, selectStart, todayOds } from "../context/recoilData"
import { Line } from 'react-chartjs-2';



const plotData = () => {
    //const [ toda, setTodayOds ] = useRecoilState(horseOds)
    const [ selNum, setSelNum ] = useRecoilState(selectStart)
    const [ dataHorses, setDataHorses ] = useRecoilState(todayOds)
    //const [ startLen, setStratLen ] = React.useState([])
    const [ shoePlot, setShoePlot ] = React.useState(false)
    const [ plotData, setPlotData ] = React.useState([])
    const [ dataPointsTime, setDataPoints ] = React.useState([])
    
    const start_one_value = []    
    const datasets = []
    const teamNames = []

    React.useEffect(() => {
        (async() => {
            try {
                
                const start_nums = dataHorses.map(x => x['track'])
                start_one_value = [...new Set(start_nums)]
                
                setDataPoints(dataHorses.filter(x => x['track'] == start_one_value[0]).map(x => x['update_time']))

                for (let i = 1; i <= start_one_value.length +1; i++){
                        teamNames.push(i);
                        let points = dataHorses.filter(x => x['track'] == i) 
                        let name = points.map(x => x['name'])
                       

                        let r = Math.floor(Math.random() * (255 - 1 + 1)) + 1;
                        let g = Math.floor(Math.random() * (255 - 1 + 1)) + 1;
                        let b = Math.floor(Math.random() * (255 - 1 + 1)) + 1;
                
                        datasets.push( {
                            label: name[0],
                            data:  points.map(x => x['probable']),
                            backgroundColor: `rgba(${b},${g},${r},1)`,
                            fill: false,
                
                            backgroundColor: `rgba(${b},${g},${r},1)`,
                            borderColor: `rgba(${b},${g},${r},1)`,
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: 'rgba(75,192,192,1)',
                            pointBackgroundColor: '#fff',
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                            pointHoverBorderColor: 'rgba(220,220,220,1)',
                            pointHoverBorderWidth: 2,
                            pointRadius: 3,
                            pointHitRadius: 10,
                
                        },)
                 
                }
                setPlotData(datasets)
                console.log("from async", datasets)
            
            
                
            } catch(e){
              console.log("!")
            }
    
        })()
    },[selNum])

 
  
        
    const ShoPlot = () => {
        if (shoePlot == false){
            return(
                <p></p>
            )
        } else {
            console.log(dataPointsTime)
            const data = {
                labels: dataPointsTime,
                options: {
                    maintainAspectRatio: false,
                    responsive: true,
                    aspectRatio: 1,
                    
                    
                    legend: {
                        "display": true
                    },
                    scales: {
                        yAxes: [
                          {
                            ticks: {
                              beginAtZero: true,
                            },
                          },
                        ],
                    },
                    zoom: {
                      enabled: false,
                      drag: true,
                      mode: "x"
                    },
                    pan: {
                      enabled: true,
                      mode: "x",
                      speed: 2
                    }
                },
              
                datasets: plotData
              }
            
        
                return(
                  <div >
                     <Line  height={500}
                        width={800} data={data} tooltip ></Line>
                  </div> 
                )
      
        }
    }


    return(
        <div>
            <button styles={{ paddingTop: "20px"}} className='btn btn-outline-dark' onClick={() => setShoePlot(true)}>Show ods</button>

            <div style={{ paddingBottom: "30px", paddingTop: "30px"}} >
                <ShoPlot />    

            </div> 

           
        </div>
    )
}


export default plotData;