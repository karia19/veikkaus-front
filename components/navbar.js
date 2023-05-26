import styles from '../styles/Home.module.css'
import Link from 'next/link';

const Navia = () => {



    return(
        <header className={styles.navHeader}>
            <div className={styles.navMain} >
                <div className={styles.navLogo}>
                    <Link href="/"><h3 style={{ fontFamily: "Audiowide"}}>DRONSET</h3></Link>

                </div>
                
                <nav className={styles.navData}>
                    <ul>
                         <li><Link href="/track_stats" ><a>History data</a></Link></li>
                         <li><Link href="/toto_history" ><a>Odds</a></Link></li>

                    </ul>
                
                </nav>

            </div>
        </header>

    )
}

export default Navia;