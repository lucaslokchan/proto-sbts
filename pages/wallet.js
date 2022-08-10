import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { toHex } from "./../utils/utils";
import Head from "next/head";
import FooterComponent from "./footer/footer";
import sbtContract from "../sbt";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

if (typeof window !== "undefined") {
  const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    network: "ropsten",
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
  const [chainId, setChainId] = useState();
  const [network, setNetwork] = useState();
  const [tokenoption, setTokenOption] = useState("");
  const [totalsupply, setTotalSupply] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenowned, setTokenOwned] = useState([]);

  //Persist wallet connection upon refreshing the browser ->
  //hook to connect to the cached provider automatically
  useEffect(() => {
    getTotalSupplyHandler().then((response) => setTotalSupply(response));

    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);

  //Fetch tokens after state "account" is updated and when account is not undefined
  useEffect(() => {
    if (typeof account !== "undefined") {
      getTokenOwnedHandler().then((response) => setTokenOwned(response));
    }
  }, [account]);

  //Effect hook to handle changes in account or network data
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        setAccount(accounts[0]);
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

  function truncateAddress(address) {
    try {
      let first = address.substr(0, 5);
      let last = address.substr(address.length - 4);
      let truncated = first + "..." + last;
      return truncated;
    } catch (error) {
      console.log(error);
    }
  }

  //Fetch total SBT supply from contract
  const getTotalSupplyHandler = async () => {
    try {
      const supply = await sbtContract.methods.totalSupply().call();
      return supply;
    } catch (error) {
      toast.info("Please switch to Ropsten Testnet");
    }
  };

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

  //Request SBT
  const requestSBTHandler = async (uri) => {
    if (uri !== "") {
      sbtContract.methods.requestSBT(account, uri).send({ from: account });
    } else {
      console.log("333");
    }
  };

  //Fetch token owned by address with subsequent URI and metadata
  const getTokenOwnedHandler = async () => {
    var tokenid = new Array();
    var urilist = new Array();
    var responselist = new Array();
    setLoading(true);
    const balance = await sbtContract.methods
      .balanceOf(account)
      .call((err, result) => {
        return result;
      });
    for (let i = 0; i < balance; i++) {
      let id = await sbtContract.methods.tokenOfOwnerByIndex(account, i).call();
      tokenid[i] = id;
    }
    for (let i = 0; i < tokenid.length; i++) {
      let uri = await sbtContract.methods.tokenURI(tokenid[i]).call();
      urilist[i] = uri;
    }
    for (let i = 0; i < urilist.length; i++) {
      let response = await fetch("https://ipfs.io/ipfs/" + urilist[i]).then(
        (data) => data.json()
      );
      responselist.push(response);
    }
    setLoading(false);
    return responselist;
  };

  //Test function

  return (
    <>
      <Head>
        <title>Soulbound - Wallet</title>
        <meta name="description" content="Soulbound Token Wallet" />
      </Head>
      <ToastContainer
        progressClassName="toastProgress"
        toastify-icon-color-info="toas"
      />
      <div className="">
        <div className="max-w-screen-xl mx-auto mt-2 md:mt-36 ">
          <div className="grid grid-cols-1 md+:grid-cols-2">
            <div className="mx-auto">
              <div className="max-w-[450px] max-h-[280px] w-[340px] h-[220px] sm:w-[450px] sm:h-[280px]  overflow-hidden border-black group rounded-2xl bg-white shadow-lg">
                <div className="py-2 bg-[#9F32B2] text-center text-white">
                  <h2 className="tracking-[0.3rem] md:tracking-[0.5rem]">
                    SOULBOUND
                  </h2>
                </div>
                {account ? (
                  <div className="grid grid-cols-2 mt-4 md:mt-10 ">
                    <div className="mx-auto ">
                      <div className="absolute ml-[0.3rem] mt-[0.3rem]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100"
                          height="100"
                          x="0"
                          y="0"
                          version="1.1"
                          viewBox="0 0 259 259"
                          xmlSpace="preserve"
                        >
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375V100h100V34.375z"
                            transform="translate(14 14) translate(63) scale(.07)"
                          ></path>
                          <path
                            d="M65.625 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0z"
                            transform="translate(14 14) translate(70) scale(.07)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) translate(84) scale(.07)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0h-31.25C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 .521.065 1.303.195 2.344H0V100h100V67.969h-.195c.132-1.041.195-1.822.195-2.344v-31.25z"
                            transform="translate(14 14) translate(98) scale(.07)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375V100h100V34.375z"
                            transform="translate(14 14) translate(126) scale(.07)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) translate(133) scale(.07)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) translate(140) scale(.07)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0H0v100h100V34.375z"
                            transform="translate(14 14) translate(147) scale(.07)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) translate(161) scale(.07)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 63 7)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0h-31.25C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 .521.065 1.303.195 2.344H0V100h100V67.969h-.195c.132-1.041.195-1.822.195-2.344v-31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 77 7)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 98 7)"
                          ></path>
                          <path
                            d="M65.625 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 105 7)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 119 7)"
                          ></path>
                          <path
                            d="M100 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 126 7)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 147 7)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 168 7)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375V100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 56 14)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 63 14)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 77 14)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0H0v100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 84 14)"
                          ></path>
                          <path
                            d="M99.805 32.031H100V0H0v32.031h.195C.065 33.073 0 33.854 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100h31.25c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-.521-.063-1.302-.195-2.344z"
                            transform="translate(14 14) matrix(.07 0 0 .07 98 14)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0h-31.25C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 .521.065 1.303.195 2.344H0V100h100V67.969h-.195c.132-1.041.195-1.822.195-2.344v-31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 112 14)"
                          ></path>
                          <path
                            d="M100 0H0v65.625c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 147 14)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 154 14)"
                          ></path>
                          <path
                            d="M65.625 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 161 14)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 56 21)"
                          ></path>
                          <path
                            d="M100 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 63 21)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 77 21)"
                          ></path>
                          <path
                            d="M100 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 84 21)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 105 21)"
                          ></path>
                          <path
                            d="M100 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 112 21)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 133 21)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 168 21)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 56 28)"
                          ></path>
                          <path
                            d="M99.805 32.031H100V0H0v32.031h.195C.065 33.073 0 33.854 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100h31.25c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-.521-.063-1.302-.195-2.344z"
                            transform="translate(14 14) matrix(.07 0 0 .07 77 28)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 91 28)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 126 28)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 140 28)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 147 28)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0H0v100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 154 28)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 56 35)"
                          ></path>
                          <path
                            d="M65.625 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 63 35)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 105 35)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0H0v100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 112 35)"
                          ></path>
                          <path
                            d="M100 0H0v65.625c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 147 35)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 154 35)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 56 42)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 70 42)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 84 42)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0h-31.25C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 .521.065 1.303.195 2.344H0V100h100V67.969h-.195c.132-1.041.195-1.822.195-2.344v-31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 98 42)"
                          ></path>
                          <path
                            d="M99.805 32.031H100V0H0v32.031h.195C.065 33.073 0 33.854 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100h31.25c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-.521-.063-1.302-.195-2.344z"
                            transform="translate(14 14) matrix(.07 0 0 .07 112 42)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 126 42)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 140 42)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 154 42)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0h-31.25C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 .521.065 1.303.195 2.344H0V100h100V67.969h-.195c.132-1.041.195-1.822.195-2.344v-31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 168 42)"
                          ></path>
                          <path
                            d="M99.805 32.031H100V0H0v32.031h.195C.065 33.073 0 33.854 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100h31.25c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-.521-.063-1.302-.195-2.344z"
                            transform="translate(14 14) matrix(.07 0 0 .07 56 49)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 77 49)"
                          ></path>
                          <path
                            d="M100 0H0v65.625c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 98 49)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0H0v100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 105 49)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 133 49)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 147 49)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 154 49)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 168 49)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0h-31.25C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 .521.065 1.303.195 2.344H0V100h100V67.969h-.195c.132-1.041.195-1.822.195-2.344v-31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 0 56)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 14 56)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 21 56)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 28 56)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 35 56)"
                          ></path>
                          <path
                            d="M65.625 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 42 56)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 70 56)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375V100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 84 56)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0H0v100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 91 56)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 105 56)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 119 56)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0h-31.25C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 .521.065 1.303.195 2.344H0V100h100V67.969h-.195c.132-1.041.195-1.822.195-2.344v-31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 140 56)"
                          ></path>
                          <path
                            d="M100 0H0v65.625c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 154 56)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 161 56)"
                          ></path>
                          <path
                            d="M100 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 168 56)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375V100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 182 56)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 189 56)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 196 56)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 203 56)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0H0v100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 210 56)"
                          ></path>
                          <path
                            d="M99.805 32.031H100V0H0v32.031h.195C.065 33.073 0 33.854 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100h31.25c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-.521-.063-1.302-.195-2.344z"
                            transform="translate(14 14) matrix(.07 0 0 .07 0 63)"
                          ></path>
                          <path
                            d="M100 0H0v65.625c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 28 63)"
                          ></path>
                          <path
                            d="M100 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 35 63)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375V100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 77 63)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 84 63)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 91 63)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 98 63)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 105 63)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0H0v100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 112 63)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375V100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 126 63)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 133 63)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 140 63)"
                          ></path>
                          <path
                            d="M65.625 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 147 63)"
                          ></path>
                          <path
                            d="M99.805 32.031H100V0H0v32.031h.195C.065 33.073 0 33.854 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100h31.25c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-.521-.063-1.302-.195-2.344z"
                            transform="translate(14 14) matrix(.07 0 0 .07 161 63)"
                          ></path>
                          <path
                            d="M99.805 32.031H100V0H0v32.031h.195C.065 33.073 0 33.854 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100h31.25c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-.521-.063-1.302-.195-2.344z"
                            transform="translate(14 14) matrix(.07 0 0 .07 182 63)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 203 63)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 210 63)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 217 63)"
                          ></path>
                          <path
                            d="M65.625 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 224 63)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0h-31.25C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 .521.065 1.303.195 2.344H0V100h100V67.969h-.195c.132-1.041.195-1.822.195-2.344v-31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 14 70)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 42 70)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 56 70)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 77 70)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 91 70)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 98 70)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 105 70)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 112 70)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 119 70)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 126 70)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0h-31.25C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 .521.065 1.303.195 2.344H0V100h100V67.969h-.195c.132-1.041.195-1.822.195-2.344v-31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 154 70)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 168 70)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0h-31.25C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 .521.065 1.303.195 2.344H0V100h100V67.969h-.195c.132-1.041.195-1.822.195-2.344v-31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 189 70)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 203 70)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 210 70)"
                          ></path>
                          <path
                            d="M99.805 32.031H100V0H0v32.031h.195C.065 33.073 0 33.854 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100h31.25c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-.521-.063-1.302-.195-2.344z"
                            transform="translate(14 14) matrix(.07 0 0 .07 14 77)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0h-31.25C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 .521.065 1.303.195 2.344H0V100h100V67.969h-.195c.132-1.041.195-1.822.195-2.344v-31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 49 77)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 63 77)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 70 77)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 77 77)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 84 77)"
                          ></path>
                          <path
                            d="M100 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 91 77)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 105 77)"
                          ></path>
                          <path
                            d="M99.805 32.031H100V0H0v32.031h.195C.065 33.073 0 33.854 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100h31.25c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-.521-.063-1.302-.195-2.344z"
                            transform="translate(14 14) matrix(.07 0 0 .07 126 77)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 147 77)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 154 77)"
                          ></path>
                          <path
                            d="M65.625 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 161 77)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 175 77)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 189 77)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 203 77)"
                          ></path>
                          <path
                            d="M100 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 210 77)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 224 77)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 28 84)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 35 84)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 42 84)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 49 84)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0H0v100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 56 84)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 70 84)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 77 84)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 98 84)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 105 84)"
                          ></path>
                          <path
                            d="M65.625 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 112 84)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 140 84)"
                          ></path>
                          <path
                            d="M99.805 32.031H100V0H0v32.031h.195C.065 33.073 0 33.854 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100h31.25c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-.521-.063-1.302-.195-2.344z"
                            transform="translate(14 14) matrix(.07 0 0 .07 189 84)"
                          ></path>
                          <path
                            d="M99.805 32.031H100V0H0v32.031h.195C.065 33.073 0 33.854 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100h31.25c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-.521-.063-1.302-.195-2.344z"
                            transform="translate(14 14) matrix(.07 0 0 .07 203 84)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0h-31.25C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 .521.065 1.303.195 2.344H0V100h100V67.969h-.195c.132-1.041.195-1.822.195-2.344v-31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 217 84)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 14 91)"
                          ></path>
                          <path
                            d="M100 0H0v65.625c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 56 91)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 63 91)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 70 91)"
                          ></path>
                          <path
                            d="M100 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 77 91)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 126 91)"
                          ></path>
                          <path
                            d="M65.625 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 133 91)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375V100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 147 91)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 154 91)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 161 91)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 168 91)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 175 91)"
                          ></path>
                          <path
                            d="M65.625 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 182 91)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 217 91)"
                          ></path>
                          <path
                            d="M65.625 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 224 91)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 7 98)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375V100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 21 98)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 28 98)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 35 98)"
                          ></path>
                          <path
                            d="M65.625 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 42 98)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0h-31.25C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 .521.065 1.303.195 2.344H0V100h100V67.969h-.195c.132-1.041.195-1.822.195-2.344v-31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 91 98)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 105 98)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 147 98)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 154 98)"
                          ></path>
                          <path
                            d="M99.805 32.031H100V0H0v32.031h.195C.065 33.073 0 33.854 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100h31.25c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-.521-.063-1.302-.195-2.344z"
                            transform="translate(14 14) matrix(.07 0 0 .07 168 98)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 196 98)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375V100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 210 98)"
                          ></path>
                          <path
                            d="M100 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 217 98)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0h-31.25C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 .521.065 1.303.195 2.344H0V100h100V67.969h-.195c.132-1.041.195-1.822.195-2.344v-31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 0 105)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375V100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 14 105)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 21 105)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375V100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 56 105)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 63 105)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0H0v100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 70 105)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375V100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 84 105)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 91 105)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 112 105)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 133 105)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 140 105)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 147 105)"
                          ></path>
                          <path
                            d="M100 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 154 105)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 175 105)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0h-31.25C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 .521.065 1.303.195 2.344H0V100h100V67.969h-.195c.132-1.041.195-1.822.195-2.344v-31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 189 105)"
                          ></path>
                          <path
                            d="M99.805 32.031H100V0H0v32.031h.195C.065 33.073 0 33.854 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100h31.25c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-.521-.063-1.302-.195-2.344z"
                            transform="translate(14 14) matrix(.07 0 0 .07 210 105)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 224 105)"
                          ></path>
                          <path
                            d="M100 0H0v65.625c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 0 112)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 7 112)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 14 112)"
                          ></path>
                          <path
                            d="M100 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 21 112)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 42 112)"
                          ></path>
                          <path
                            d="M99.805 32.031H100V0H0v32.031h.195C.065 33.073 0 33.854 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100h31.25c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-.521-.063-1.302-.195-2.344z"
                            transform="translate(14 14) matrix(.07 0 0 .07 56 112)"
                          ></path>
                          <path
                            d="M99.805 32.031H100V0H0v32.031h.195C.065 33.073 0 33.854 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100h31.25c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-.521-.063-1.302-.195-2.344z"
                            transform="translate(14 14) matrix(.07 0 0 .07 70 112)"
                          ></path>
                          <path
                            d="M100 0H0v65.625c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 84 112)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 91 112)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 98 112)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0H0v100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 105 112)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 119 112)"
                          ></path>
                          <path
                            d="M65.625 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 126 112)"
                          ></path>
                          <path
                            d="M99.805 32.031H100V0H0v32.031h.195C.065 33.073 0 33.854 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100h31.25c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-.521-.063-1.302-.195-2.344z"
                            transform="translate(14 14) matrix(.07 0 0 .07 140 112)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 168 112)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 189 112)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 196 112)"
                          ></path>
                          <path
                            d="M65.625 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 203 112)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 28 119)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0H0v100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 35 119)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0h-31.25C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 .521.065 1.303.195 2.344H0V100h100V67.969h-.195c.132-1.041.195-1.822.195-2.344v-31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 63 119)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 77 119)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 98 119)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 105 119)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0H0v100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 112 119)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 133 119)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 147 119)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 161 119)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 182 119)"
                          ></path>
                          <path
                            d="M100 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 189 119)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 217 119)"
                          ></path>
                          <path
                            d="M65.625 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 224 119)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0h-31.25C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 .521.065 1.303.195 2.344H0V100h100V67.969h-.195c.132-1.041.195-1.822.195-2.344v-31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 0 126)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 35 126)"
                          ></path>
                          <path
                            d="M65.625 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 42 126)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 56 126)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 63 126)"
                          ></path>
                          <path
                            d="M65.625 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 70 126)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375V100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 91 126)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 98 126)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 105 126)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 112 126)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 154 126)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 175 126)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 203 126)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0H0v100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 210 126)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 0 133)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 7 133)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 14 133)"
                          ></path>
                          <path
                            d="M65.625 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 21 133)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 35 133)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0h-31.25C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 .521.065 1.303.195 2.344H0V100h100V67.969h-.195c.132-1.041.195-1.822.195-2.344v-31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 49 133)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 84 133)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 91 133)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 105 133)"
                          ></path>
                          <path
                            d="M100 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 112 133)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 147 133)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0h-31.25C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 .521.065 1.303.195 2.344H0V100h100V67.969h-.195c.132-1.041.195-1.822.195-2.344v-31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 161 133)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 182 133)"
                          ></path>
                          <path
                            d="M99.805 32.031H100V0H0v32.031h.195C.065 33.073 0 33.854 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100h31.25c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-.521-.063-1.302-.195-2.344z"
                            transform="translate(14 14) matrix(.07 0 0 .07 210 133)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 0 140)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 14 140)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 28 140)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 35 140)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 42 140)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 49 140)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 56 140)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 63 140)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 70 140)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0H0v100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 77 140)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 91 140)"
                          ></path>
                          <path
                            d="M99.805 32.031H100V0H0v32.031h.195C.065 33.073 0 33.854 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100h31.25c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-.521-.063-1.302-.195-2.344z"
                            transform="translate(14 14) matrix(.07 0 0 .07 105 140)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 140 140)"
                          ></path>
                          <path
                            d="M100 0H0v65.625c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 161 140)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 168 140)"
                          ></path>
                          <path
                            d="M65.625 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 175 140)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 196 140)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 217 140)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 0 147)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 7 147)"
                          ></path>
                          <path
                            d="M100 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 14 147)"
                          ></path>
                          <path
                            d="M99.805 32.031H100V0H0v32.031h.195C.065 33.073 0 33.854 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100h31.25c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-.521-.063-1.302-.195-2.344z"
                            transform="translate(14 14) matrix(.07 0 0 .07 35 147)"
                          ></path>
                          <path
                            d="M99.805 32.031H100V0H0v32.031h.195C.065 33.073 0 33.854 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100h31.25c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-.521-.063-1.302-.195-2.344z"
                            transform="translate(14 14) matrix(.07 0 0 .07 49 147)"
                          ></path>
                          <path
                            d="M100 0H0v65.625c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 70 147)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 77 147)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 84 147)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 91 147)"
                          ></path>
                          <path
                            d="M65.625 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 98 147)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 112 147)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 119 147)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 126 147)"
                          ></path>
                          <path
                            d="M65.625 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 133 147)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375V100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 147 147)"
                          ></path>
                          <path
                            d="M65.625 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 154 147)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 182 147)"
                          ></path>
                          <path
                            d="M65.625 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 189 147)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 0 154)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 42 154)"
                          ></path>
                          <path
                            d="M100 0H0v65.625c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 84 154)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 91 154)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 105 154)"
                          ></path>
                          <path
                            d="M99.805 32.031H100V0H0v32.031h.195C.065 33.073 0 33.854 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100h31.25c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-.521-.063-1.302-.195-2.344z"
                            transform="translate(14 14) matrix(.07 0 0 .07 126 154)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 147 154)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375V100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 210 154)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0H0v100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 217 154)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 0 161)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 28 161)"
                          ></path>
                          <path
                            d="M65.625 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 35 161)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0h-31.25C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 .521.065 1.303.195 2.344H0V100h100V67.969h-.195c.132-1.041.195-1.822.195-2.344v-31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 63 161)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0h-31.25C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 .521.065 1.303.195 2.344H0V100h100V67.969h-.195c.132-1.041.195-1.822.195-2.344v-31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 77 161)"
                          ></path>
                          <path
                            d="M100 0H0v65.625c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 91 161)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0H0v100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 98 161)"
                          ></path>
                          <path
                            d="M99.805 32.031H100V0H0v32.031h.195C.065 33.073 0 33.854 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100h31.25c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-.521-.063-1.302-.195-2.344z"
                            transform="translate(14 14) matrix(.07 0 0 .07 147 161)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0h-31.25C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 .521.065 1.303.195 2.344H0V100h100V67.969h-.195c.132-1.041.195-1.822.195-2.344v-31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 168 161)"
                          ></path>
                          <path
                            d="M100 0H0v65.625c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 210 161)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 217 161)"
                          ></path>
                          <path
                            d="M99.805 32.031H100V0H0v32.031h.195C.065 33.073 0 33.854 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100h31.25c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-.521-.063-1.302-.195-2.344z"
                            transform="translate(14 14) matrix(.07 0 0 .07 0 168)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 14 168)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 42 168)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375V100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 56 168)"
                          ></path>
                          <path
                            d="M100 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 63 168)"
                          ></path>
                          <path
                            d="M100 0H0v65.625c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 77 168)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0H0v100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 84 168)"
                          ></path>
                          <path
                            d="M100 0H0v65.625c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 98 168)"
                          ></path>
                          <path
                            d="M65.625 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 105 168)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 119 168)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0h-31.25C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 .521.065 1.303.195 2.344H0V100h100V67.969h-.195c.132-1.041.195-1.822.195-2.344v-31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 133 168)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 168 168)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 175 168)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 182 168)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 189 168)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 196 168)"
                          ></path>
                          <path
                            d="M65.625 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 203 168)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 217 168)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0H0v100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 224 168)"
                          ></path>
                          <path
                            d="M99.805 32.031H100V0H0v32.031h.195C.065 33.073 0 33.854 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100h31.25c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-.521-.063-1.302-.195-2.344z"
                            transform="translate(14 14) matrix(.07 0 0 .07 56 175)"
                          ></path>
                          <path
                            d="M100 0H0v65.625c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 84 175)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0H0v100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 91 175)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 112 175)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 126 175)"
                          ></path>
                          <path
                            d="M100 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 133 175)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 147 175)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0H0v100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 154 175)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 168 175)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 196 175)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375V100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 210 175)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 217 175)"
                          ></path>
                          <path
                            d="M100 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 224 175)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0h-31.25C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 .521.065 1.303.195 2.344H0V100h100V67.969h-.195c.132-1.041.195-1.822.195-2.344v-31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 63 182)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0h-31.25C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 .521.065 1.303.195 2.344H0V100h100V67.969h-.195c.132-1.041.195-1.822.195-2.344v-31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 77 182)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 91 182)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 98 182)"
                          ></path>
                          <path
                            d="M65.625 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 105 182)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 119 182)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 140 182)"
                          ></path>
                          <path
                            d="M100 0H0v65.625c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 154 182)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 161 182)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 168 182)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 182 182)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 196 182)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 210 182)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375V100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 56 189)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 63 189)"
                          ></path>
                          <path
                            d="M99.805 32.031H100V0H0v32.031h.195C.065 33.073 0 33.854 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100h31.25c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-.521-.063-1.302-.195-2.344z"
                            transform="translate(14 14) matrix(.07 0 0 .07 77 189)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 91 189)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 126 189)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 147 189)"
                          ></path>
                          <path
                            d="M100 0H0v65.625c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 161 189)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 168 189)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 196 189)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 203 189)"
                          ></path>
                          <path
                            d="M100 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 210 189)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 56 196)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 63 196)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 91 196)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 98 196)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 105 196)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 112 196)"
                          ></path>
                          <path
                            d="M65.625 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 119 196)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375V100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 133 196)"
                          ></path>
                          <path
                            d="M65.625 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 140 196)"
                          ></path>
                          <path
                            d="M100 0H0v65.625c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 168 196)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 175 196)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 182 196)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 189 196)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 196 196)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0h-31.25C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 .521.065 1.303.195 2.344H0V100h100V67.969h-.195c.132-1.041.195-1.822.195-2.344v-31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 217 196)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 56 203)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 63 203)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 70 203)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0H0v100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 77 203)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 91 203)"
                          ></path>
                          <path
                            d="M100 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 98 203)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 126 203)"
                          ></path>
                          <path
                            d="M100 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 133 203)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 154 203)"
                          ></path>
                          <path
                            d="M65.625 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 161 203)"
                          ></path>
                          <path
                            d="M99.805 32.031H100V0H0v32.031h.195C.065 33.073 0 33.854 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100h31.25c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-.521-.063-1.302-.195-2.344z"
                            transform="translate(14 14) matrix(.07 0 0 .07 175 203)"
                          ></path>
                          <path
                            d="M100 0H0v65.625c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 189 203)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 196 203)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 203 203)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 210 203)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 217 203)"
                          ></path>
                          <path
                            d="M65.625 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 224 203)"
                          ></path>
                          <path
                            d="M100 0H0v65.625c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 56 210)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 63 210)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 70 210)"
                          ></path>
                          <path
                            d="M100 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 77 210)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 91 210)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 105 210)"
                          ></path>
                          <path
                            d="M65.625 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 112 210)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0h-31.25C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 .521.065 1.303.195 2.344H0V100h100V67.969h-.195c.132-1.041.195-1.822.195-2.344v-31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 140 210)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 168 210)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 182 210)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375V100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 84 217)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 91 217)"
                          ></path>
                          <path
                            d="M100 34.375c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0H0v100h100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 98 217)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 133 217)"
                          ></path>
                          <path
                            d="M0 0H100V100H0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 140 217)"
                          ></path>
                          <path
                            d="M65.625 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 147 217)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 161 217)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 175 217)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 210 217)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 56 224)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 70 224)"
                          ></path>
                          <path
                            d="M99.805 32.031H100V0H0v32.031h.195C.065 33.073 0 33.854 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100h31.25c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-.521-.063-1.302-.195-2.344z"
                            transform="translate(14 14) matrix(.07 0 0 .07 84 224)"
                          ></path>
                          <path
                            d="M100 0H0v65.625c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 98 224)"
                          ></path>
                          <path
                            d="M65.625 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 105 224)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 168 224)"
                          ></path>
                          <path
                            d="M100 34.375V0H34.375C24.87 0 16.764 3.353 10.059 10.059S0 24.87 0 34.375v31.25c0 9.505 3.353 17.611 10.059 24.316C16.765 96.646 24.87 100 34.375 100H100V34.375z"
                            transform="translate(14 14) matrix(.07 0 0 .07 196 224)"
                          ></path>
                          <path
                            d="M65.625 0H0v100h65.625c9.505 0 17.611-3.354 24.316-10.059C96.646 83.236 100 75.13 100 65.625v-31.25c0-9.505-3.354-17.611-10.059-24.316C83.236 3.354 75.13 0 65.625 0z"
                            transform="translate(14 14) matrix(.07 0 0 .07 203 224)"
                          ></path>
                          <path
                            d="M100 65.625c0 9.507-3.355 17.611-10.059 24.316C83.236 96.645 75.132 100 65.625 100h-31.25c-9.504 0-17.61-3.355-24.315-10.059C3.354 83.236 0 75.132 0 65.625v-31.25c0-9.504 3.353-17.61 10.059-24.315C16.766 3.354 24.871 0 34.375 0h31.25c9.508 0 17.613 3.353 24.316 10.059C96.646 16.766 100 24.871 100 34.375v31.25z"
                            transform="translate(14 14) matrix(.07 0 0 .07 217 224)"
                          ></path>
                          <path
                            fill="none"
                            d="M33.78 85H85V15H15.004l.016 50.855C15.02 76.414 23.436 85 33.78 85z"
                            transform="translate(14 14) scale(.49) matrix(1 0 0 -1 0 100)"
                          ></path>
                          <path
                            d="M100 100V34.141 0H0l.02 65.859C.02 84.68 15.16 100 33.78 100H100zM85 85H33.78c-10.344 0-18.76-8.586-18.76-19.145L15.004 15H85v70z"
                            transform="translate(14 14) scale(.49) matrix(1 0 0 -1 0 100)"
                          ></path>
                          <path
                            fill="none"
                            d="M33.78 85H85V15H15.004l.016 50.855C15.02 76.414 23.436 85 33.78 85z"
                            transform="translate(14 14) translate(182) scale(.49) rotate(180 50 50)"
                          ></path>
                          <path
                            d="M100 100V34.141 0H0l.02 65.859C.02 84.68 15.16 100 33.78 100H100zM85 85H33.78c-10.344 0-18.76-8.586-18.76-19.145L15.004 15H85v70z"
                            transform="translate(14 14) translate(182) scale(.49) rotate(180 50 50)"
                          ></path>
                          <path
                            fill="none"
                            d="M33.78 85H85V15H15.004l.016 50.855C15.02 76.414 23.436 85 33.78 85z"
                            transform="translate(14 14) matrix(.49 0 0 .49 0 182)"
                          ></path>
                          <path
                            d="M100 100V34.141 0H0l.02 65.859C.02 84.68 15.16 100 33.78 100H100zM85 85H33.78c-10.344 0-18.76-8.586-18.76-19.145L15.004 15H85v70z"
                            transform="translate(14 14) matrix(.49 0 0 .49 0 182)"
                          ></path>
                          <g>
                            <path
                              d="M100.061 99.984V0h-100l.028 72.369C.088 87.602 12.27 100 27.226 100h45.528c4.682 0 11.508 0 17.171-.016h10.136z"
                              transform="translate(14 14) matrix(.21 0 0 .21 14 14) matrix(1 0 0 -1 0 100)"
                            ></path>
                          </g>
                          <g>
                            <path
                              d="M100.061 99.984V0h-100l.028 72.369C.088 87.602 12.27 100 27.226 100h45.528c4.682 0 11.508 0 17.171-.016h10.136z"
                              transform="translate(14 14) matrix(.21 0 0 .21 196 14) rotate(180 50 50)"
                            ></path>
                          </g>
                          <g>
                            <path
                              d="M100.061 99.984V0h-100l.028 72.369C.088 87.602 12.27 100 27.226 100h45.528c4.682 0 11.508 0 17.171-.016h10.136z"
                              transform="translate(14 14) matrix(.21 0 0 .21 14 196)"
                            ></path>
                          </g>
                        </svg>
                      </div>
                      <svg
                        width="110"
                        height="110"
                        viewBox="0 0 110 110"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M104.658 73.105V104.67H71.571V110H110V73.105H104.658Z"
                          fill="#9F32B2"
                        />
                        <path
                          d="M38.0822 104.67H5.34216V73.105H0V110H38.0822V104.67Z"
                          fill="#9F32B2"
                        />
                        <path
                          d="M5.34231 39.4352V5.32968H38.0824V0H0V39.4352H5.34231Z"
                          fill="#9F32B2"
                        />
                        <path
                          d="M71.571 5.32968H104.658V39.4352H110V0H71.571V5.32968Z"
                          fill="#9F32B2"
                        />
                      </svg>
                    </div>
                    <div className="">
                      <div className="pt-2">
                        <p>Address: {truncateAddress(account)}</p>
                      </div>
                      <div className="pt-2">
                        <p>SBTs Owned: {tokenowned.length}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="my-16 text-center md:my-20">
                    <button onClick={connectWallet} className="">
                      <h2>Connect Wallet</h2>
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="mx-4">
              <div className="pt-6 ">
                <div>
                  <h2 className="text-[#9F32B2]">Request SBTs</h2>
                </div>
                <div className="pt-4">
                  <div>
                    <div className="flex gap-x-5">
                      <div>
                        <select
                          onChange={(e) => {
                            setTokenOption(e.target.value);
                          }}
                          className=" border-black border-2 rounded h-[30px] max-w-[150px] text-[#9F32B2]"
                        >
                          <option value="">Select Token</option>
                          <option value="QmSMiUtwmxMAzHdute17u5CPrB2eUwBYUR4JP5KLpAHTsH">
                            University Degree Token
                          </option>
                          <option value="QmZQEo7zCbRJ3Mv56HsnbudHJq7PvUoPm6g7mKrxz9ABU2">
                            Award Token
                          </option>
                          <option value="QmT6DYFT32Y87gCt9pFfDxrwrav8qDyBmZpyrhwEe64waF">
                            Certificate of Attendance Token
                          </option>
                          <option value="QmTsyBd5b1963UvAoBH1vR15Q5Kdkq43g9VR4wWc2W2bvU">
                            Property Right - Access Token
                          </option>
                          <option value="QmUKYnrC1SRdijKpP1hEx4Q3Eon8qF1GQVZ3cktydTM7rW">
                            Property Right - Data Cooperatives Token
                          </option>
                          <option value="Qmb83Yba9YvGtouAbBSgD7RQyXyuyp1Vv62Rd3dqKyoaHz">
                            Membership Token
                          </option>
                        </select>
                      </div>

                      <div>
                        <button
                          onClick={requestSBTHandler.bind(this, tokenoption)}
                          className="border-2 w-[80px] h-[30px] border-black rounded text-[#9F32B2]"
                        >
                          Request
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4 ">
                <div>
                  <h2 className="text-[#9F32B2]">Contract Stats</h2>
                </div>
                <div className="pt-4">
                  <p>SBTs Issued: {totalsupply}</p>
                </div>
                <div className="pt-4">
                  <a href="https://ropsten.etherscan.io/address/0xAab2d8b6F6D3eE17510c87111e1563a4611FfFb2">
                    <p>View on Block Explorer</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="max-w-screen-xl mx-auto mt-8 mb-10 md:mt-32 md:mb-32">
            <div className="">
              <div className="text-center text-[#9F32B2]"></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ margin: "auto" }}
                width="80"
                height="80"
                display="block"
                preserveAspectRatio="xMidYMid"
                viewBox="0 0 100 100"
              >
                <circle cx="84" cy="50" r="10" fill="#9f32b2">
                  <animate
                    attributeName="r"
                    begin="0s"
                    calcMode="spline"
                    dur="0.43859649122807015s"
                    keySplines="0 0.5 0.5 1"
                    keyTimes="0;1"
                    repeatCount="indefinite"
                    values="10;0"
                  ></animate>
                  <animate
                    attributeName="fill"
                    begin="0s"
                    calcMode="discrete"
                    dur="1.7543859649122806s"
                    keyTimes="0;0.25;0.5;0.75;1"
                    repeatCount="indefinite"
                    values="#9f32b2;#9f32b2;#9f32b2;#9f32b2;#9f32b2"
                  ></animate>
                </circle>
                <circle cx="16" cy="50" r="10" fill="#9f32b2">
                  <animate
                    attributeName="r"
                    begin="0s"
                    calcMode="spline"
                    dur="1.7543859649122806s"
                    keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                    keyTimes="0;0.25;0.5;0.75;1"
                    repeatCount="indefinite"
                    values="0;0;10;10;10"
                  ></animate>
                  <animate
                    attributeName="cx"
                    begin="0s"
                    calcMode="spline"
                    dur="1.7543859649122806s"
                    keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                    keyTimes="0;0.25;0.5;0.75;1"
                    repeatCount="indefinite"
                    values="16;16;16;50;84"
                  ></animate>
                </circle>
                <circle cx="50" cy="50" r="10" fill="#9f32b2">
                  <animate
                    attributeName="r"
                    begin="-0.43859649122807015s"
                    calcMode="spline"
                    dur="1.7543859649122806s"
                    keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                    keyTimes="0;0.25;0.5;0.75;1"
                    repeatCount="indefinite"
                    values="0;0;10;10;10"
                  ></animate>
                  <animate
                    attributeName="cx"
                    begin="-0.43859649122807015s"
                    calcMode="spline"
                    dur="1.7543859649122806s"
                    keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                    keyTimes="0;0.25;0.5;0.75;1"
                    repeatCount="indefinite"
                    values="16;16;16;50;84"
                  ></animate>
                </circle>
                <circle cx="84" cy="50" r="10" fill="#9f32b2">
                  <animate
                    attributeName="r"
                    begin="-0.8771929824561403s"
                    calcMode="spline"
                    dur="1.7543859649122806s"
                    keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                    keyTimes="0;0.25;0.5;0.75;1"
                    repeatCount="indefinite"
                    values="0;0;10;10;10"
                  ></animate>
                  <animate
                    attributeName="cx"
                    begin="-0.8771929824561403s"
                    calcMode="spline"
                    dur="1.7543859649122806s"
                    keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                    keyTimes="0;0.25;0.5;0.75;1"
                    repeatCount="indefinite"
                    values="16;16;16;50;84"
                  ></animate>
                </circle>
                <circle cx="16" cy="50" r="10" fill="#9f32b2">
                  <animate
                    attributeName="r"
                    begin="-1.3157894736842104s"
                    calcMode="spline"
                    dur="1.7543859649122806s"
                    keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                    keyTimes="0;0.25;0.5;0.75;1"
                    repeatCount="indefinite"
                    values="0;0;10;10;10"
                  ></animate>
                  <animate
                    attributeName="cx"
                    begin="-1.3157894736842104s"
                    calcMode="spline"
                    dur="1.7543859649122806s"
                    keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                    keyTimes="0;0.25;0.5;0.75;1"
                    repeatCount="indefinite"
                    values="16;16;16;50;84"
                  ></animate>
                </circle>
              </svg>
            </div>
          </div>
        ) : (
          <div className="max-w-screen-xl mx-auto mt-8 mb-10 md:mt-32 md:mb-32">
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-28 gap-y-12">
                {tokenowned.map((token) => {
                  return (
                    <div>
                      {[token].map((tokeninfo) => {
                        return (
                          <>
                            <div className="flex">
                              <div className="min-w-[300px] w-[300px] h-[350px] overflow-hidden  border-black group rounded-2xl bg-white max-w-sm shadow-lg">
                                <div className="py-7 bg-[#9F32B2]"></div>
                                <div className="text-center mt-[5.5rem] mb-1 mx-[1.3rem]">
                                  <p>{tokeninfo.title}</p>
                                </div>
                                <div className="mx-[2rem] border-t-[0.18rem] border-black">
                                  <div className="mt-2">
                                    <span className="break-words">
                                      {tokeninfo.description}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="absloute">
                                <img
                                  src={tokeninfo.image}
                                  className="shadow-xl rounded-full align-middle border-none border-black absolute -m-[-1rem] -ml-[13.5rem] max-w-[125px]"
                                />
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        <FooterComponent></FooterComponent>
      </div>
    </>
  );
}
