import Head from "next/head";
import styles from "../styles/SBT.module.css";

import { useState, useEffect } from "react";
import sbtContract from "../sbt";

const Sbt = () => {
  function requestSBTHandler(uri) {
    sbtContract.methods
      .requestSBT(ethereum.selectedAddress, uri)
      .send({ from: ethereum.selectedAddress });
  }

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
  //window.ethereum

  function dropdownChangeHandler(e) {}
  return (
    <>
      <button onClick={connectwalletHandler} className="">
        Connect Wallet
      </button>
      <div>
        <h1>Request Token</h1>
        <select defaultValue={"DEFAULT"} onChange={dropdownChangeHandler}>
          <option value="DEFAULT" disabled>
            Select Token
          </option>
          <option value="1">University Degree</option>
          <option value="2">Certificate of Attendance</option>
          <option value="3">Membership</option>
          <option value="4">Access Right - Property</option>
          <option value="5">Access Right - Data Cooperatives</option>
          <option value="6">Certificate of Attendance</option>
        </select>
        <button onClick={requestSBTHandler()} className="button">
          Request SBT
        </button>
      </div>
    </>
  );
};

export default Sbt;
