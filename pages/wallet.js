import { useState, useEffect } from "react";
import FooterComponent from "./footer/footer";
import sbtContract from "../sbt";

export default function Wallet() {
  const [isconnected, setIsConnected] = useState(false);
  const [totalsupply, setTotalSupply] = useState("");
  const [tokenowned, setTokenOwned] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tokenoption, setTokenOption] = useState("");

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      isConnectedHandler();
      addressChangeHandler();
    }
    getTotalSupplyHandler().then((response) => setTotalSupply(response));
  });

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      onLoadHandler();
    }
  }, []);

  //useEffect(() => {
  //  if (typeof window.ethereum !== "undefined") {
  //    if (ethereum.selectedAddress != null) {
  //      //getTokenOwnedHandler().then((response) => setTokenOwned(response));
  //    }
  //  }
  //}, []);

  function truncateAddress(address) {
    let first = address.substr(0, 5);
    let last = address.substr(address.length - 4);
    let truncated = first + "..." + last;
    return truncated;
  }

  //Request SBT
  const requestSBTHandler = async (uri) => {
    if (uri !== "") {
      sbtContract.methods
        .requestSBT(ethereum.selectedAddress, uri)
        .send({ from: ethereum.selectedAddress });
    } else {
      console.log("333");
    }
  };

  //Determins if metamask is connected
  function isConnectedHandler() {
    if (ethereum.selectedAddress == null) {
      setIsConnected(false);
    } else {
      setIsConnected(true);
    }
  }

  //Reloads window when Metamask chain is changed and SBT metadata when accound is changed
  function addressChangeHandler() {
    if (typeof window.ethereum !== "undefined") {
      if (window.ethereum) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });
        window.ethereum.on("accountsChanged", () => {
          //window.location.reload();
          if (ethereum.selectedAddress !== "undefined") {
            getTokenOwnedHandler().then((response) => setTokenOwned(response));
          }
        });
      }
    }
  }

  //Fetch token URI on IPFS when window is on load
  function onLoadHandler() {
    if (ethereum.selectedAddress !== "undefined")
      window.onload = getTokenOwnedHandler().then((response) =>
        setTokenOwned(response)
      );
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
      getTokenOwnedHandler().then((response) => setTokenOwned(response));
    }
  }

  //Connect to metamask wallet
  const connectwalletHandler = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        //Instantiate web3 instance for calling smart contract methods
        web3 = new Web3(window.ethereum);
      } catch (err) {}
    } else {
      //metamask not installed
      console.log("Please install MetaMask");
    }
  };

  //Fetch total SBT supply from contract
  const getTotalSupplyHandler = async () => {
    const supply = await sbtContract.methods.totalSupply().call();
    return supply;
  };

  //Fetch token owned by address with subsequent URI and metadata
  const getTokenOwnedHandler = async () => {
    var tokenid = new Array();
    var urilist = new Array();
    var responselist = new Array();
    const balance = await sbtContract.methods
      .balanceOf(ethereum.selectedAddress)
      .call((err, result) => {
        return result;
      })
      .then(setLoading(true));
    for (let i = 0; i < balance; i++) {
      let id = await sbtContract.methods
        .tokenOfOwnerByIndex(ethereum.selectedAddress, i)
        .call();
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
      <div className="border-8 border-red-800">
        <div className="max-w-screen-xl mx-auto mt-24 border-2">
          <div className="grid grid-cols-1 border-2 md:grid-cols-2">
            <div className="mx-auto border-2">
              <div className="min-w-[450px] max-h-[280px] w-[450px] h-[280px] border-2 overflow-hidden border-black group rounded-2xl bg-white max-w-sm shadow-lg">
                <div className="py-2 bg-[#9F32B2] text-center text-white">
                  <h2 className="">Wallet Stats</h2>
                </div>
                {isconnected ? (
                  <div className="">
                    <div className="grid content-center grid-cols-2 border-2 place-items-center">
                      <div className="border-2">
                        <span>QR Code Here</span>
                      </div>
                      <div className="border-2">
                        <p>
                          Address: {truncateAddress(ethereum.selectedAddress)}
                        </p>
                        <p>SBTs Owned: {tokenowned.length}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button onClick={connectwalletHandler} className="">
                    <h2>Connect Wallet</h2>
                  </button>
                )}
              </div>
            </div>
            <div className="border-2">
              <div className="border-2">
                <div>
                  <h2 className="text-[#9F32B2]">Request SBTs</h2>
                </div>
                <div class="pt-4">
                  <div>
                    <div className="flex border-2 gap-x-5">
                      <div>
                        <select
                          onChange={(e) => {
                            setTokenOption(e.target.value);
                          }}
                          className="border-2 border-black rounded h-[30px] max-w-[150px] text-[#9F32B2]"
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
                    <div>{tokenoption}</div>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-2">
                <div>
                  <h2 className="text-[#9F32B2]">Contract Stats</h2>
                </div>
                <div className="pt-4">
                  <p>SBTs Issued: {totalsupply}</p>
                </div>
                <div className="pt-4">
                  <p>View on Block Explorer</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="max-w-screen-xl mx-auto mt-24 border-2">
            <div className="text-center text-[#9F32B2]">
              <h2>Loading...</h2>
            </div>
          </div>
        ) : (
          <div className="max-w-screen-xl mx-auto mt-24 border-2">
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-28 gap-y-12">
                {tokenowned.map((token) => {
                  return (
                    <div>
                      {[token].map((tokeninfo) => {
                        return (
                          <>
                            <div className="flex">
                              <div className="min-w-[300px] w-[300px] h-[350px] overflow-hidden border-2 border-black group rounded-2xl bg-white max-w-sm shadow-lg">
                                <div className="py-7 bg-[#9F32B2]"></div>
                                <div className="text-center mt-[5.5rem] mb-1">
                                  <p>{tokeninfo.title}</p>
                                </div>
                                <div className="mx-[2rem] border-t-[0.18rem] border-black">
                                  <div className="mt-2">
                                    <span className="break-words">
                                      {tokeninfo.description}
                                      {tokeninfo.type}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div class="absloute">
                                <img
                                  src={tokeninfo.image}
                                  class="shadow-xl rounded-full align-middle border-none border-black absolute -m-[-1rem] -ml-[13.5rem] max-w-[130px]"
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
