import { ethers, providers } from "ethers";
import React, { useState, useEffect, useRef } from "react";
import Web3modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

export default function Modal() {
  //Check for state if we are connected or not
  const [isConnected, setConnected] = useState(false);
  const [address, setAddress] = useState("");

  //Get ref to web3modal
  const web3modal = useRef();

  //Get it connected on render

  useEffect(() => {
    if (!isConnected) {
      web3modal.current = new Web3modal({
        network: "rinkeby",
        providerOptions: {
          walletconnect: {
            package: WalletConnectProvider, // required
            options: {
              infuraId: "INFURA_ID", // required
            },
          },
        },
        disableInjectedProvider: false,
      });
    }
  }, []);

  //Connect

  //Function to get provider and signer
  async function getProviderOrSigner(needSigner = false) {
    //Get Provider
    const provider = await web3modal.current.connect();
    const web3provider = new providers.Web3Provider(provider);

    //get access to signer to display the address
    const signer = web3provider.getSigner();
    signer.getAddress().then((response) => setAddress(response));

    //Get chainID
    //const { chainId } = await web3provider.getNetwork();
    //if (chainId !== 4) {
    //  window.alert("Switch to the Correct Chain");
    //}

    if (needSigner) {
      const signer = web3provider.getSigner();
      return signer;
    }
    return web3provider;
  }

  //Connect function
  async function Connect() {
    try {
      await getProviderOrSigner();
      setConnected(true);
    } catch (e) {
      console.error(e);
    }
  }

  //Disconnect function
  async function Disconnect() {
    try {
      await web3modal.clearCachedProvider();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <button onClick={Connect}>Connect Wallet</button>
      <button onClick={Disconnect}>Disconnect</button>
      <div>{address}</div>
    </>
  );
}
