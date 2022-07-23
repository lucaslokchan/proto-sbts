import { useState, useEffect } from "react";
import sbtContract from "../sbt";

function RequestToken() {
  const [tokenoption, setTokenOption] = useState("");

  const connectwalletHandler = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        //Instantiate web3 instance for calling smart contract methods
        web3 = new Web3(window.ethereum);
      } catch (err) {}
    } else {
      //metamask not installed
    }
  };

  const requestSBTHandler = async (uri) => {
    if (uri !== "") {
      sbtContract.methods
        .requestSBT(ethereum.selectedAddress, uri)
        .send({ from: ethereum.selectedAddress });
    } else {
      console.log("333");
    }
  };

  return (
    <>
      <button onClick={connectwalletHandler} className="">
        <h2>Connect Wallet</h2>
      </button>

      <div>
        <div className="border-2 flex gap-x-5">
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
      </div>
    </>
  );
}
export default RequestToken;
