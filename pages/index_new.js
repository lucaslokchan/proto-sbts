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
        <h1 className="text-9xl mb-7">SOULBOUND</h1>
      </div>
      <div className="border-2 mx-52">
      <h1>Enter the future of decentralized society with Soulbound Wallet</h1>
      </div>
    </div>
    
    <div className="mt-24">
      <div className="text-center border-2 mx-80">
        
        <div className="mb-7 border-2">
          <h1 className="text-[#9F32B2]">Soulbound Token</h1>
        </div>

        <div className="mb-5 border-2">
          <h2>Identity for decentralized society</h2>
        </div>

        <div className="mb-7 border-2">
          <p>A Soulbound Token (SBT) is similar to an NFT but non-transferable. It can represent the commitments, credentials and affilations of each individuals</p>
        </div>
      </div>

      <div className="border-2 mx-80">

        <div className="mb-7 border-2">
          <div className="mb-5 border-2">
            <h2 className="text-3xl font-bold">Provenance</h2>
          </div>
          <div>
            <p>A Soulbound Token (SBT) is similar to an NFT but non-transferable. It can represent the commitments, credentials and affilations of each individuals</p>
          </div>
        </div>

        <div className="mb-7 border-2">
          <div className="mb-5 border-2">
            <h2 className="text-3xl font-bold">Reputation</h2>
          </div>
          <div>
            <p>A Soulbound Token (SBT) is similar to an NFT but non-transferable. It can represent the commitments, credentials and affilations of each individuals</p>
          </div>
        </div>

        <div className="mb-7 border-2">
          <div className="mb-5 border-2">
            <h2 className="text-3xl font-bold">Sybil Resistance</h2>
          </div>
          <div>
            <p>A Soulbound Token (SBT) is similar to an NFT but non-transferable. It can represent the commitments, credentials and affilations of each individuals</p>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-24 border-2 mx-80">
      <div className="border-2 mb-7 mx-80">
        <div className="mb-7 border-2 text-center ">
          <h1 className="text-[#9F32B2]">Demo</h1>
          </div>
            <p>Lucas graduated from Lumbburgh University with an Electrical and Electronics Degree. He works as a data scientist and part time research assistant at Lumbburgh University electronic lab. He recently attended blockchain workshop. On the personal side, he is a gold member at {} club</p>
          <div>
        </div>

      </div>
      <div>
      </div>
    </div>

    <div className="bg-[#313896] pt-24 pb-24 px-24 border-2">
      <div className="mx-80 bg-white border-2 p-10">
        <div className="mb-7 border-2">
          <h1 className="text-[#9F32B2]">Claim Your Own SBTs</h1>
        </div>
        <div className="mb-7 border-2">
          <h2>Install Metamask</h2>
        </div>
        <div className="mb-7 border-2">
          <h2>Add Network</h2>
        </div>
        <div className="mb-7 border-2">
          <h2>Install Metamask</h2>
        </div>
        <div className="mb-7 border-2">
          <h2 className="text-[#9F32B2]"><Link href="wallet"><a>Get Started</a></Link></h2>
        </div>
      </div>
    </div>

  </div>  
  </>
  )
}