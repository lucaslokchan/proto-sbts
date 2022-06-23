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
    const [tokenowned, setTokenOwned] = useState([])
    const [buttontext, setButtonText] = useState('Connect Wallet')

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
        setAddress(ethereum.selectedAddress)
        setButtonText(ethereum.selectedAddress)
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
        
        <div class="hero-body">
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
                    </div>

                    <div class="column is-6 is-offset-1">
                        <h1 class="title is-2">
                            Stats
                        </h1>
                        <h2 class="subtitle is-4">
                            Wallet Address: {address}
                        </h2>
                        <h2 class="subtitle is-4">
                            SBTs Owned: {tokenowned.length}
                        </h2>
                    </div>
                </div>
            </div>
        </div>

        <div className="container">
            {tokenowned.map(token => {
                return (
                    <div>
                        {[token].map(tokeninfo => {
                            return(
                                <div>
                                    <p>--------------------------------------------</p>
                                    <img src={tokeninfo.image} width="150"/>
                                    <p>{tokeninfo.type}</p>
                                    <p>{tokeninfo.issuer}</p>
                                    <p>{tokeninfo.title}</p>
                                    <p>{tokeninfo.description}</p>
                                    <p>{JSON.stringify(tokeninfo)}</p>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>








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
                <p>Token Owned: {tokenowned.length}</p>
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