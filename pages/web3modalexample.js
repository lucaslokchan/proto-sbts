import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { toHex } from "./../utils/utils";

if (typeof window !== "undefined") {
  const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions: {
      // required
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: "INFURA_ID", // required
        },
      },
    },
    theme: {
      background: "rgb(255, 255, 255)",
      main: "rgb(159, 50, 178)",
      secondary: "rgb(0, 0, 0)",
      border: "rgba(0, 0, 0, 0.14)",
      hover: "rgb(0, 0, 0, 0.1)",
    },
  });
}
export default function Modal() {
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [account, setAccount] = useState();
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");
  const [chainId, setChainId] = useState();
  const [network, setNetwork] = useState();
  const [message, setMessage] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [verified, setVerified] = useState();

  //Persist wallet connection upon refreshing the browser ->
  //hook to connect to the cached provider automatically
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);

  //Effect hook to handle changes in account or network data
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        setAccount(accounts);
      };

      const handleChainChanged = (chainId) => {
        setChainId(chainId);
      };

      const handleDisconnect = () => {
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);

  //Function for establishing a connection to wallet ->
  //call the connect function from the Web3Modal instance
  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);
      setNetwork(network);
      setChainId(network.chainId);
    } catch (error) {
      console.log(error);
    }
  };

  //Function for disconnecting from dapp by clearing cached provider and refreshing states
  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    refreshState();
  };

  //Function for refreshing states
  const refreshState = () => {
    setAccount();
    setChainId();
    setNetwork("");
    setMessage("");
    setSignature("");
    setVerified(undefined);
  };

  //Function for switching and adding custom networks
  const switchNetwork = async () => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(137) }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: toHex(137),
                chainName: "Polygon",
                rpcUrls: ["https://polygon-rpc.com/"],
                blockExplorerUrls: ["https://polygonscan.com/"],
              },
            ],
          });
        } catch (addError) {
          throw addError;
        }
      }
    }
  };

  return (
    <>
      <div>
        {!account ? (
          <button onClick={connectWallet}>Connect Wallet</button>
        ) : (
          <button onClick={disconnect}>Disconnect</button>
        )}

        <div>
          Connection Status:
          {account ? <span> Connected</span> : <span> Disconnected</span>}
        </div>
        <div>Wallet Address: {account}</div>
        <div>Chain ID: {chainId}</div>
        <button onClick={switchNetwork}>Switch Netowrk</button>
      </div>
    </>
  );
}
