import Head from 'next/head'
import styles from '../styles/SBT.module.css'
import Web3 from 'web3'
import { useState, useEffect } from 'react'
import sbtContract from '../sbt'
import cards from '../styles/CARDS.module.css'

const Sbt = () => {
    //state hook for storing error message in error variable
    const [error, setError] = useState('')
    const [address, setAddress] = useState('')
    const [uri, setURI] = useState('')
    const [desc, setDesc] = useState('')
    const [image, setImage] = useState('')
    const [tokenowned, setTokenOwned] = useState([])
    const [buttontext, setButtonText] = useState('Connect Wallet')
    const [totalsupply, setTotalSupply] = useState('')
    const [loading, setLoading] = useState(false)

    let url = 'https://ipfs.io/ipfs/' + uri

    //const fetchURI = async () => {
    //    const response = await fetch(url);
    //    return response.json();
    //}

    let web3

    useEffect(() => {
        getSBTHandler()
        //fetchURI().then(response => setDesc(response['description']))
        //connectwalletHandler()
        //fetchURI().then(response => setDesc(JSON.stringify(response)))
        //fetchURI().then(response => setImage(response['image']))
        if (typeof window.ethereum !== 'undefined') {
            setButtonText(ethereum.selectedAddress)
        }  
        getTotalSupplyHandler().then(response => setTotalSupply(response))
    })

    useEffect(() => {
        if (typeof window.ethereum !== 'undefined') {
            if (ethereum.selectedAddress != null) {
                getTokenOwnedHandler().then(response => setTokenOwned(response)) 
            }   
        }
    }, [])

    //refresh page when wallet address changes
    useEffect(() => {
        if (typeof window.ethereum !== 'undefined') {
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
        setLoading(true);
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
        sbtContract.methods.requestSBT(ethereum.selectedAddress, "QmUKYnrC1SRdijKpP1hEx4Q3Eon8qF1GQVZ3cktydTM7rW").send({ from: ethereum.selectedAddress })
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

    function dropdownChangeHandler(e) {
        
    }
    return (
        <><div className={styles.main}>
            <Head>
                <title>Soulbound Token</title>
                <meta name="description" content="Claim you Soulbound Token" />
            </Head>

            <navbar className="flex justify-end border-2">
                <button onClick={connectwalletHandler} className="">{buttontext}</button>
            </navbar>

            <div className="border-1">
                <div className='grid grid-cols-1 md:grid-cols-2'>
                    <div>
                        <h1>
                            Request Token
                        </h1>
                        <select defaultValue={"DEFAULT"} onChange={dropdownChangeHandler}>
                            <option value="DEFAULT" disabled>Select Token</option>
                            <option value="1">University Degree</option>
                            <option value="2">Certificate of Attendance</option>
                            <option value="3">Membership</option>
                            <option value="4">Access Right - Property</option>
                            <option value="5">Access Right - Data Cooperatives</option>
                            <option value="6">Certificate of Attendance</option>
                        </select>
                        <button onClick={requestSBTHandler} className="button">Request SBT</button>
                        <h1>
                            Burn Token
                        </h1>
                        <select defaultValue={"DEFAULT"} onChange={dropdownChangeHandler}>
                            <option value="DEFAULT" disabled>Select Token</option>
                            <option value="1">University Degree</option>
                            <option value="2">Certificate of Attendance</option>
                            <option value="3">Membership</option>
                            <option value="4">Access Right - Property</option>
                            <option value="5">Access Right - Data Cooperatives</option>
                            <option value="6">Certificate of Attendance</option>
                        </select>
                        <button onClick={requestSBTHandler} className="button">Burn SBT</button>
                    </div>

                    <div className="h-fit">
                        <h1 className="title is-2">
                            Stats
                        </h1>
                        <h2 className="subtitle is-4">
                            Contract Address: <a href="https://ropsten.etherscan.io/address/0xAab2d8b6F6D3eE17510c87111e1563a4611FfFb2">0xAab2....fFb2</a>
                        </h2>
                        <h2 className="subtitle is-4">
                            SBTs Owned: {tokenowned.length}
                        </h2>
                        <h2 className="subtitle is-4">
                            Total Supply: {totalsupply}
                        </h2>
                    </div>
                </div>
            </div>

            <section>
                <div className="container has-text-danger">
                    <p>{error}</p>
                </div>
            </section>

            <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-28 ">
                {tokenowned.map(token => {
                    return (
                        <div>
                            {[token].map(tokeninfo => {
                                return (
                                    <>
                                    <div className="w-[500px] h-[550px] max-w-xl overflow-hidden align-top border-2 rounded shadow-lg hover:bg-red-400">
                                        <div className="grid place-items-center">
                                            <img className="object-center w-2/5" src={tokeninfo.image} />
                                        </div>
                                        &nbsp;
                                        <div>
                                            <div className="grid place-items-center">
                                                <p className="mb-2 text-xl font-bold place-content-center">{tokeninfo.title}</p>
                                            </div>
                                            <p>{tokeninfo.type}</p>
                                            <p>{tokeninfo.issuer}</p>
                                            <p>{tokeninfo.description}</p>
                                        </div>
                                    </div>
                                    </>
                                )
                            })}
                        </div>
                    )
                })}
                </div>
            </div>



            <footer className="">
                <div className="">
                    <p><strong>© 2022 Lucas Chan</strong> </p>
                    <p><a href="https://github.com/lucaslokchan/proto-sbts">Github</a> |
                        <a href="https://www.linkedin.com/in/lucaslokchan/"> Linkedln</a>
                    </p>
                </div>
            </footer>
        </div>
            </>
        )
}

export default Sbt
