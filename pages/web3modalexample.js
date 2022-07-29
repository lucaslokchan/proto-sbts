import { ethers, providers } from "ethers";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
let web3Modal;
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true,
    providerOptions: {}, // required
  });
}
export default function Modal() {
  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
    } catch (error) {
      console.log(error);
    }
  };

  // const disconnect = useCallback(
  //   async function () {
  //     await web3Modal.clearCachedProvider();
  //     if (provider?.disconnect && typeof provider.disconnect === "function") {
  //       await provider.disconnect();
  //     }
  //     dispatch({
  //       type: "RESET_WEB3_PROVIDER",
  //     });
  //   },
  //   [provider]
  // );
  return (
    <>
      <button onClick={connectWallet}>Connect Wallet</button>
      <button onClick={disconnect}>Disconnect</button>
      <div></div>
    </>
  );
}
