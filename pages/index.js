import Head from 'next/head'
import 'bulma/css/bulma.css'
import styles from '../styles/SBT.module.css'
import Web3 from 'web3'
import { useState, useEffect } from 'react'
import sbtContract from '../sbt'

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
                <p>Contract Address: 0x7CfDF10b930fd61E65243e62515B24dA28792ae7</p>
                <p>placeholder text</p>
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
      </div>
        )
}

export default sbt