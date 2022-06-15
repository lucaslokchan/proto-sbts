import Head from 'next/head'
import 'bulma/css/bulma.css'
import styles from '../styles/SBT.module.css'

const sbt = () => {
    
    //window.ethereum
    const connectwalletHandler = () => {
        if (typeof window.ethereum !== 'undefined') {
            window.ethereum.request({ method: 'eth_requestAccounts' });
          } else {
              //metamask not installed
              console.log("Please instll MetaMask")
          }
    }
    return (
        <div className={styles.main}>
         <Head>
         d   <title>Soulbound Token</title>
            <meta name="description" content="Claim you Soulbound Token" />
        </Head>
        <navbar className="navbar mt-4 mb-4">
            <div className="container">
                <div className="navbar-brand">
                    <h1>Soulbound Token</h1>
                </div>
                <div className="navbar-end">
                    <button onClick={connectwalletHandler} className="button is-primary">Connect Wallet</button>
                </div>
            </div>
        </navbar>
        <section>
            <div className="container">
                <p>placeholder text</p>
            </div>
        </section>
      </div>
        )
}

export default sbt