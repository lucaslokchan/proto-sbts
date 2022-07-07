import Link from 'next/link'

const addNetwork = async () => {
  window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [{
      chainId: '0x13881',
      chainName: 'Polygon Testnet',
      nativeCurrency: {
          name: 'MATIC',
          symbol: 'MATIC',
          decimals: 18
      },
      rpcUrls: ['https://matic-mumbai.chainstacklabs.com'],
      blockExplorerUrls: ['https://mumbai.polygonscan.com/']
  }]
  })
}

export default function Home() {
  return (
  <>
  <div>
    <div className="text-center border-2 mx-80">
      <div className="mb-7">
        <h1 className="font-bold text-9xl mb-7">SOULBOUND</h1>
      </div>
      <div className="border-2 mx-96">
      <h2 className="text-5xl font-bold">Build the future of decentralized society with Soulbound Wallet</h2>
      </div>
    </div>
    
    <div className="mt-24">
      <div className="text-center border-2 mx-80">
        
        <div className="mb-7">
          <h1 className="text-5xl font-bold">Soulbound Token</h1>
        </div>

        <div className="mb-5">
          <h1 className="text-3xl font-bold">Identity for decentralized society</h1>
        </div>

        <div className="mb-7">
          <p>A Soulbound Token (SBT) is similar to an NFT but non-transferable. It can represent the commitments, credentials and affilations of each individuals</p>
        </div>
      </div>

      <div className="border-2 mx-80">

        <div className="mb-7">
          <div className="mb-5">
            <h2 className="text-3xl font-bold">Provenance</h2>
          </div>
          <div>
            <p>A Soulbound Token (SBT) is similar to an NFT but non-transferable. It can represent the commitments, credentials and affilations of each individuals</p>
          </div>
        </div>

        <div className="mb-7">
          <div className="mb-5">
            <h2 className="text-3xl font-bold">Reputation</h2>
          </div>
          <div>
            <p>A Soulbound Token (SBT) is similar to an NFT but non-transferable. It can represent the commitments, credentials and affilations of each individuals</p>
          </div>
        </div>

        <div className="mb-7">
          <div className="mb-5">
            <h2 className="text-3xl font-bold">Sybil Resistance</h2>
          </div>
          <div>
            <p>A Soulbound Token (SBT) is similar to an NFT but non-transferable. It can represent the commitments, credentials and affilations of each individuals</p>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-24 border-2">
      <div className="text-center border-2 mb-7 mx-80">
        <div className="mb-7">
          <h2 className="text-5xl font-bold">Lucas</h2>
        </div>
          <p>Lucas graduated from Lumbburgh University with an Electrical and Electronics Degree. He works as a data scientist and part time research assistant at Lumbburgh University electronic lab. He recently attended blockchain workshop. On the personal side, he is a gold member at {} club</p>
        <div>
        </div>
      </div>

      <div>
        
      </div>


    </div>

    <div className="bg-[#313896] pt-24 pb-72">
      <div className="mx-auto bg-white border-2">
      <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </div>

  </div>  
  </>
  )
}