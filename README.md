[![Netlify Status](https://api.netlify.com/api/v1/badges/4a5cd70d-5adc-43ec-8d08-9f1f5992a089/deploy-status)](https://soulbound-token.netlify.app)

### This is a minimum viable product (MVP) of Soulbound Token Wallet

# What is a Soulbound Token?

The concept of Soulbound Token is proposed in this paper

Decentralized Society: Finding Web3's Soul

https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4105763

# Setup

npx create-next-app soulbound-token

git clone https://github.com/lucaslokchan/proto-sbts

cd soulbound-token

npm install

npm run dev

http://localhost:3000

# How it works

Institutions deploy smart contracts to issue SBTs to each individuals (Souls).

The underlying mechanism is similar to NFTs which token metadata is stored on IPFS.

The diagram below illustrates the workflows of issuing an SBT.

![Diagram](image/diagram.png)

# Tech Stack

### Smart Contract Development / Deployment

Solidity

Remix IDE

Hardhat

### Frontend + Backend

web3.js

ethers.js

next.js

MetaMask

### UX/UI Design

Figma
