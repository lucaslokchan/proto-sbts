import Head from 'next/head'
import 'bulma/css/bulma.css'
import styles from '../styles/SBT.module.css'
import Web3 from 'web3'
import { useState, useEffect } from 'react'
import sbtContract from '../../sbt'

const sbt = () => {
    //state hook for storing error message in error variable
    const [error, setError] = useState('')
    const [address, setAddress] = useState('')
    const [uri, setURI] = useState('')
    const [desc, setDesc] = useState('')
    const [image, setImage] = useState('')

    let url = 'https://ipfs.io/ipfs/' + uri

    const fetchURI = async () => {
        const response = await fetch(url);
        return response.json();
    }

    let web3

    useEffect(() => {
        getSBTHandler()
        //fetchURI().then(response => setDesc(response['description']))
        connectwalletHandler()
        fetchURI().then(response => setDesc(JSON.stringify(response)))
        fetchURI().then(response => setImage(response['image']))
    })

    const getSBTHandler = async () => {
        const uri = await sbtContract.methods.tokenURI(0).call()
        setURI(uri)
    }

    //window.ethereum
    const connectwalletHandler = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                //Instantiate web3 instance for calling smart contract methods
                web3 = new Web3(window.ethereum)
                setAddress(ethereum.selectedAddress)
            } catch(err) {
                setError(err.message)
            }
            
          } else {
              //metamask not installed
              setError("Please install MetaMask")
          }
    }
    return (
        <div className={styles.main}>
         <Head>
            <title>Soulbound Token</title>
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
                <p>Contract Address: <a href="https://ropsten.etherscan.io/address/0x7CfDF10b930fd61E65243e62515B24dA28792ae7">0x7CfDF10b930fd61E65243e62515B24dA28792ae7</a></p>
                <p>New Contract Address: <a href="https://ropsten.etherscan.io/address/0xAab2d8b6F6D3eE17510c87111e1563a4611FfFb2">0xAab2d8b6F6D3eE17510c87111e1563a4611FfFb2</a></p>
            </div>
        </section>
        <section>
            <div className="container has-text-danger">
                <p>{error}</p>
            </div>
        </section>
        <section>
            <div className="container">
                <p>Wallet Address: {address}</p>
                <img src="https://raw.githubusercontent.com/lucaslokchan/proto-sbts/main/image/diagram.png"></img>
                <button onClick={connectwalletHandler} className="button is-primary">Request Degree</button>
                <button onClick={connectwalletHandler} className="button is-primary">Request Award</button>
                <button onClick={connectwalletHandler} className="button is-primary">Request Property Access Right</button>
                <button onClick={connectwalletHandler} className="button is-primary">Request Certificate of Attendance</button>
                <button onClick={connectwalletHandler} className="button is-primary">Request Data Cooperatives Right</button>
                <button onClick={connectwalletHandler} className="button is-primary">Request Membership</button>
            </div>
        </section>
        <section>
            <div className="container">
                <img src="https://ipfs.io/ipfs/QmV2xtiLjjWAafJNh3UbcQk17tQYD4eczmLKbfVeEvk9fm" width="200"></img>
                <img src="https://ipfs.io/ipfs/Qmegm71SQhYk9tjVJH3BfefNFGVpozW76gQmhfWqh5urSd" width="200"></img>
                <img src="https://ipfs.io/ipfs/QmSZzstHUUsze5LNFd76q9L8KGqtNaBy9HR83jC6V8amSV" width="200"></img>
                <img src="https://ipfs.io/ipfs/QmUe6G7x4D8wSfqkNMnNNcVPrTwSPYo8X7ygVeSpx8xeuM" width="200"></img>
                <img src="https://ipfs.io/ipfs/QmVctnn93hVETEP2fcBxgGdwr36vuaV2jQF3pro3CLBxm3" width="200"></img>
                <img src="https://ipfs.io/ipfs/QmYpAkxHPyW5tS66uhZRCymu4fsPQJwb1quzm2Rkf5tWZy" width="200"></img>
            </div>
        </section>
        <section>
            <div className="container">
                <p>SBT URI: {uri}</p>
                <p>{url}</p>
                <p>Description: {desc}</p>
                <img src={image}/>
            </div>
        </section>
        <section>
            <div className="container">
                
            </div>
        </section>
        <footer className="footer">
            <div className="content has-text-centered">
                <p><strong>© 2022 Lucas Chan</strong> </p>
                <p><a href="https://github.com/lucaslokchan/proto-sbts">Github</a> |  
                   <a href="https://www.linkedin.com/in/lucaslokchan/"> Linkedln</a> 
                </p>
            </div>
        </footer>
      </div>
      
        )
}

export default sbt