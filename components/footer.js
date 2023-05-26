import styles from '../styles/Home.module.css'
import Image from 'next/image'


const Footer = () => {


    return(
        <footer style={{ backgroundColor: "black", color: "white", marginTop: "20px"}} className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="font-monospace"
        >
          Dronset
         
        </a>
      </footer>
    )
}


export default Footer;