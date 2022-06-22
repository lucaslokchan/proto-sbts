import Head from 'next/head'
import 'bulma/css/bulma.css'
import styles from '../styles/SBT.module.css'
import Web3 from 'web3'
import { useState, useEffect } from 'react'
import sbtContract from '../sbt'

const sbt = () => {
    //state hook for storing error message in error variable
    const [tokenowned, setTokenOwned] = useState([])

    const address = "0xBCc6A4C1E64cbC1FE21A9c3D9633f7d86Dd05F2C"
    let url = 'https://ipfs.io/ipfs/'

    useEffect(() => {
        getTokenOwnedHandler().then(response => setTokenOwned(response))
    }, [])

    const getTokenOwnedHandler = async () => {
        var tokenid = new Array();
        var urilist = new Array();
        var responselist = new Array();
        const balance = await sbtContract.methods.balanceOf(address).call((err, result) => { return result });
        for (let i = 0; i < balance; i++) {
            let id = await sbtContract.methods.tokenOfOwnerByIndex(address, i).call()
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
        //setTokenOwned(responselist[0])
        //console.log(responselist[0].type)
        //console.log(responselist[0]['attributes'][0])
        return responselist
        //console.log(responselist.length)
        //console.log(urilist)
        //console.log(responselist[1])
        //console.log(typeof(responselist))
    }

    //How to navigate through the array to get e.g. description, title?
    //let aaa = tokenowned
    //console.log(tokenowned[0])
    console.log(tokenowned[0]?.type)
    console.log(tokenowned[0]?.issuer)
    console.log(tokenowned[0]?.title)
    console.log(tokenowned[0]?.description)
    console.log(tokenowned[0]?.image)
    console.log(tokenowned[0])
    console.log(tokenowned[0]?.attributes[0])
    //console.log(aaa)

    return (
        <><div className="container" style={{ backgroundColor: "black" }}>
            {[tokenowned][0].map(token => {
                return (
                    <div>
                        <p>{token?.type}</p>
                        <p>{token?.issuer}</p>
                        <p>{token?.title}</p>
                        <p>{token?.description}</p>
                        <p>{token?.image}</p>
                    </div>
                )
            })}
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
        </div></>

        )
}

export default sbt