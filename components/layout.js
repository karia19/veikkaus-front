

import Head from 'next/head';
import Footer from '../components/footer';
import Navia from './navbar';
//import Foot from '../components/footer'

const Layout = (props) => {

    return(
     <div>
      <Head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/> 
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> 
        <link href="https://fonts.googleapis.com/css2?family=Fascinate&display=swap" rel="stylesheet"></link>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Audiowide" />

      </Head>
        <Navia />
       {props.children}

       
     </div>   
    )
}

export default Layout;