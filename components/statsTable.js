import React from 'react'
import { driverStats, coachStats, tracDetailsCar, tracDetailsVolt } from '../context/recoilData';
import { useRecoilState } from 'recoil';
import Layout from './layout';





const statsTable = () => {
    const [ driver, setDriver ] = useRecoilState(driverStats)
    const [ coach, setCaoch ] = useRecoilState(coachStats)
    const [ car, setCar ] = useRecoilState(tracDetailsCar)
    const [ volt, setVolt ] = useRecoilState(tracDetailsVolt)


    console.log("this is from taable", tracDetailsCar)

    const ShowTrackDetails = () => {
      console.log(car.length)
      if (car.length > 0){
     

        return(
          <div>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Track</th>
                <th>Car</th>
                <th>Volt</th>
               
              </tr>
            </thead>
            <tbody>
                {car.map((x ,y)=>
                  // eslint-disable-next-line react/jsx-key
                  <tr key={y}>
                    <td>{y+ 1}</td>
                    <td>{x} %</td>
                    <td>{volt[y]} %</td>
                  
                  
                  </tr>
                )}
            </tbody>
            </table>

          </div>
        )
      } else {
        return(
            <p></p>
        )
      }
    }
    const DriverStarts = () => {
      if (driver.length == 0){
        return(
          <p>No data ready</p>
        )
      } else {
        return (
         
            <table className='table table-striped' >
                  <thead>
                     <tr>
                       <th>Name</th>
                       <th>Wins</th>
                       <th>Starts</th>
                       <th>%</th>
                      
                     </tr>
                  </thead>
                  <tbody>      
                       {driver.map((x ,y)=>
                         // eslint-disable-next-line react/jsx-key
                         <tr key={y}>
                           <td>{x['name']}</td>
                           <td>{x['wins']}</td>
                           <td>{x['starts']}</td>  
                           <td>{x['proba']}</td>
                         
                         </tr>
                       )}
                  </tbody> 
              </table>
              
            
        )
      }
    }
    const CoachStarts = () => {
      if (coach.length == 0){
        return(
          <p>No data ready</p>
        )
      } else {
        return (
         
            <table className='table table-striped' >
                  <thead>
                     <tr>
                       <th>Name</th>
                       <th>Wins</th>
                       <th>Starts</th>
                       <th>%</th>
                      
                     </tr>
                  </thead>
                  <tbody>      
                       {coach.map((x ,y)=>
                         // eslint-disable-next-line react/jsx-key
                         <tr key={y}>
                           <td>{x['name']}</td>
                           <td>{x['wins']}</td>  
                           <td>{x['starts']}</td>
                           <td>{x['proba']}</td>
                         
                         </tr>
                       )}
                  </tbody> 
              </table>
              
            
        )
      }
    }

    return(
     
        <div>
          <ShowTrackDetails />
          <div className='row' style={{ height: "300px" , paddingTop: "20px"}} >
            <div className='col'>
              <h3>Drivers</h3>
              <DriverStarts />
            </div>
            <div className='col'>
              <h3>Coach</h3>
              <CoachStarts />
            </div>
          </div>
        </div>
    )
}

export default statsTable;