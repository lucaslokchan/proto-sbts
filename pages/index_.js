import Link from 'next/link'

export default function Home() {
  return (
   <><div className="text-center align-middle">
      <h1 className="text-9xl">SOULBOUND</h1>
    </div>
    <div>
        <a className="text-5xl" href="https://metamask.io/download/" target="_blank">Install Metamask</a>
        <h1 className="text-5xl">Add Network</h1>
        <Link href="/"><a className="text-5xl" >Get Started</a></Link>
    </div>
      
      
      </>
   
  )
}