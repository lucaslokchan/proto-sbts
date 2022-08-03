import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { toHex } from "./../utils/utils";
import Head from "next/head";
import FooterComponent from "./footer/footer";
import sbtContract from "../sbt";

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
    const supply = await sbtContract.methods.totalSupply().call();
    return supply;
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
      getTokenOwnedHandler().then((response) => setTokenOwned(response));
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

  return (
    <>
      <Head>
        <title>Soulbound - Wallet</title>
        <meta name="description" content="Soulbound Token Wallet" />
      </Head>
      <div className="">
        <div className="max-w-screen-xl mx-auto mt-2 md:mt-36 ">
          <div className="grid grid-cols-1 md+:grid-cols-2">
            <div className="mx-auto">
              <div className="max-w-[450px] max-h-[280px] w-[340px] h-[220px] sm:w-[450px] sm:h-[280px]  overflow-hidden border-black group rounded-2xl bg-white shadow-lg">
                <div className="py-2 bg-[#9F32B2] text-center text-white">
                  <h2 className="">Wallet Stats</h2>
                </div>
                {account ? (
                  <div className="grid grid-cols-2 mt-4 md:mt-10 ">
                    <div className="mx-auto ">
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
                                  className="shadow-xl rounded-full align-middle border-none border-black absolute -m-[-1rem] -ml-[13.5rem] max-w-[130px]"
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
