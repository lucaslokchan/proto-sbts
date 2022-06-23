import Head from 'next/head'
import 'bulma/css/bulma.css'
import styles from '../styles/SBT.module.css'
import Web3 from 'web3'
import { useState, useEffect } from 'react'
import sbtContract from '../sbt'
import cards from '../styles/CARDS.module.css'

const sbt = () => {
    //state hook for storing error message in error variable
    const [error, setError] = useState('')
    const [address, setAddress] = useState('')
    const [uri, setURI] = useState('')
    const [desc, setDesc] = useState('')
    const [image, setImage] = useState('')
    const [tokenowned, setTokenOwned] = useState([])
    const [buttontext, setButtonText] = useState('Connect Wallet')
    const [totalsupply, setTotalSupply] = useState('')

    let url = 'https://ipfs.io/ipfs/' + uri

    //const fetchURI = async () => {
    //    const response = await fetch(url);
    //    return response.json();
    //}

    let web3

    useEffect(() => {
        getSBTHandler()
        //fetchURI().then(response => setDesc(response['description']))
        connectwalletHandler()
        //fetchURI().then(response => setDesc(JSON.stringify(response)))
        //fetchURI().then(response => setImage(response['image']))
        setAddress(ethereum.selectedAddress)
        setButtonText(ethereum.selectedAddress)
        getTotalSupplyHandler().then(response => setTotalSupply(response))
    })

    useEffect(() => {
        if (ethereum.selectedAddress != null) {
            getTokenOwnedHandler().then(response => setTokenOwned(response)) 
        }   
    }, [])

    //refresh page when wallet address changes
    useEffect(() => {
        if (window.ethereum) {
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          window.ethereum.on("accountsChanged", () => {
            //window.location.reload();
            setAddress(ethereum.selectedAddress)
            getTokenOwnedHandler().then(response => setTokenOwned(response))
            setButtonText(ethereum.selectedAddress)
          });
        }
        if (ethereum.selectedAddress == null) {
            setButtonText("Connect Wallet")
        }
      });
    
    const getSBTHandler = async () => {
        const uri = await sbtContract.methods.tokenURI(0).call()
        setURI(uri)
    }

    const getTotalSupplyHandler = async () => {
        const supply = await sbtContract.methods.totalSupply().call()
        return supply
    }

    const getTokenOwnedHandler = async () => {
        var tokenid = new Array();
        var urilist = new Array();
        var responselist = new Array();
        const balance = await sbtContract.methods.balanceOf(ethereum.selectedAddress).call((err, result) => { return result });
        for (let i = 0; i < balance; i++) {
            let id = await sbtContract.methods.tokenOfOwnerByIndex(ethereum.selectedAddress, i).call()
            tokenid[i] = id
        }
        for (let i = 0; i < tokenid.length; i++) {
            let uri = await sbtContract.methods.tokenURI(tokenid[i]).call()
            urilist[i] = uri
        }
        for (let i = 0; i < urilist.length; i++) {
            let response = await fetch(url + urilist[i]).then(data => data.json());
            responselist.push(response)
        }
        return responselist
    }

    function requestSBTHandler() {
        sbtContract.methods.requestSBT(ethereum.selectedAddress, "QmTsyBd5b1963UvAoBH1vR15Q5Kdkq43g9VR4wWc2W2bvU").send({ from: ethereum.selectedAddress })
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
                    <button onClick={connectwalletHandler} className="button is-primary">{buttontext}</button>
                </div>
            </div>
        </navbar>
        
        <div class="hero-body" style={{ height:"70vh" }}>
            <div class="container has-text-left">
                <div class="columns">
                    <div class="column is-5">
                        <h1 class="title is-2">
                            Soulbound Token
                        </h1>
                        <h2 class="subtitle is-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad.
                        </h2>
                        <h2 class="subtitle is-6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                        </h2>
                        <div>
                            <button onClick={requestSBTHandler} className="button">Request SBT</button>
                        </div>
                    </div>

                    <div class="column is-6 is-offset-1">
                        <h1 class="title is-2">
                            Stats
                        </h1>
                        <h2 class="subtitle is-4">
                            Contract Address: <a href = "https://ropsten.etherscan.io/address/0xAab2d8b6F6D3eE17510c87111e1563a4611FfFb2">0xAab2....fFb2</a>
                        </h2>
                        <h2 class="subtitle is-4">
                            SBTs Owned: {tokenowned.length}
                        </h2>
                        <h2 class="subtitle is-4">
                            Total Supply: {totalsupply}
                        </h2>
                        <select id="change_chart">
                            <option value="" disabled selected>Select Token Type</option>
                            <option value="1" >University Degree</option>
                            <option value="2">Award</option>
                            <option value="3">Property Right - Access</option>
                            <option value="4">Certificate of Attendence</option>
                            <option value="5">Property Right - Data Cooperatives</option>
                            <option value="6">Membership</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <div className={cards.div_container}>
            {tokenowned.map(token => {
                return (
                    <div className={cards.div_style}>
                        {[token].map(tokeninfo => {
                            return(
                                <div>
                                    <img src={tokeninfo.image} width="150"/>
                                    <p>{tokeninfo.type}</p>
                                    <p>{tokeninfo.issuer}</p>
                                    <p>{tokeninfo.title}</p>
                                    <p>{tokeninfo.description}</p>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>

        <section>
            <div className="container has-text-danger">
                <p>{error}</p>
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