import { useState, useEffect } from "react";
import FooterComponent from "./footer/footer";
import sbtContract from "../sbt";

export default function Wallet() {
  const [isconnected, setIsConnected] = useState(false);
  const [totalsupply, setTotalSupply] = useState("");
  const [tokenowned, setTokenOwned] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    isConnectedHandler();
    addressChangeHandler();
    getTotalSupplyHandler().then((response) => setTotalSupply(response));
  });

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      if (ethereum.selectedAddress != null) {
        getTokenOwnedHandler().then((response) => setTokenOwned(response));
      }
    }
  }, []);

  function isConnectedHandler() {
    if (ethereum.selectedAddress == null) {
      setIsConnected(false);
    } else {
      setIsConnected(true);
    }
  }

  //Reloads when Metamask chain or account is changed
  function addressChangeHandler() {
    if (typeof window.ethereum !== "undefined") {
      if (window.ethereum) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });
        window.ethereum.on("accountsChanged", () => {
          //window.location.reload();
          getTokenOwnedHandler().then((response) => setTokenOwned(response));
        });
      }
    }
  }

  const connectwalletHandler = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        //Instantiate web3 instance for calling smart contract methods
        web3 = new Web3(window.ethereum);
      } catch (err) {}
    } //else {
    //metamask not installed
    //setError("Please install MetaMask");
    //}
  };

  const getTotalSupplyHandler = async () => {
    const supply = await sbtContract.methods.totalSupply().call();
    return supply;
  };

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
        <div className="max-w-screen-xl mx-auto border-2">
          <div className="grid grid-cols-1 border-2 md:grid-cols-2">
            <div className="mx-auto border-2">
              <div className="min-w-[450px] max-h-[280px] w-[450px] h-[280px] border-2 overflow-hidden border-black group rounded-2xl bg-white max-w-sm shadow-lg">
                <div className="pt-7 bg-[#9F32B2] text-center">
                  <h2 className="">Wallet Stats</h2>
                </div>
                {isconnected ? (
                  <div className="grid grid-cols-2 border-2">
                    <div>
                      <span>QR Code Here</span>
                    </div>
                    <div className="">
                      <p>Address: {ethereum.selectedAddress}</p>
                      <p>SBTs Owned: {tokenowned.length}</p>
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
                <h2 className="text-[#9F32B2]">Request SBTs</h2>
                <div>Request Token here</div>
              </div>
              <div className="border-2">
                <h2 className="text-[#9F32B2]">Contract Stats</h2>
                <p>SBTs Issued: {totalsupply}</p>
                <p>View on Block Explorer</p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-screen-xl mx-auto border-2">
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-28 gap-y-12">
              <div className="flex"></div>
            </div>
          </div>
        </div>
        {JSON.stringify(tokenowned)}
        <FooterComponent></FooterComponent>
      </div>
    </>
  );
}
