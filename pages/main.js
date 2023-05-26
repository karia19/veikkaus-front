import axios from "axios"
import { useEffect, useState } from 'react'
import { getData } from './api/startday'

const fetchData = async () => await axios.get('http://localhost:8000/api/v1/toto')
  .then(res => ({
    error: false,
    //users: res.data['coach'],
    users: res.data['message']
  }))
  .catch(() => ({
      error: true,
      users: null,
    }),
  );



function Page({ data }) {
    console.log(data)

    return(
        <div>
            <p>HAloo</p>
        </div>
    )
  }
  
  // This gets called on every request
export async function getServerSideProps() {
    const data = await getData();
    console.log("da", data)

    return {
      props: data,
    };
}
  
export default Page