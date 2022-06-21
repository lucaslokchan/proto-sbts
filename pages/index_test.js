import Head from 'next/head'
import 'bulma/css/bulma.css'
import styles from '../styles/SBT.module.css'
import Web3 from 'web3'
import { useState, useEffect } from 'react'
import sbtContract from '../sbt'

const sbt = () => {
    //state hook for storing error message in error variable
    const [tokenowned, setTokenOwned] = useState('')


    let url = 'https://ipfs.io/ipfs/'

    useEffect(() => {
        getTokenOwnedHandler() 
    }, [])

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
        setTokenOwned(responselist)
        //console.log(urilist)
        //console.log(responselist)
    }

    //How to navigate through the array to get e.g. description, title?
    let aaa = JSON.stringify(tokenowned)
    console.log(aaa)

    return (
        <div>
            {aaa}
        </div>
        )
}

export default sbt