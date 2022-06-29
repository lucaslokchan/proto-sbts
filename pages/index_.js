import Link from 'next/link'

export default function Home() {
  return (
  <>
  <div className='space-y-96'>
    <div>
      <h1 className="text-9xl">SOULBOUND</h1>
    </div>
    <div>
      <a className="text-8xl" href="https://metamask.io/download/" target="_blank">Install Metamask</a>
    </div>
    <div>
      <button className="text-left text-8xl">Add Network</button>
    </div>
    <div>
      <Link href="/"><a className="text-8xl" >Get Started</a></Link>
    </div>
    <div>
    </div>
  </div>
  </>
  )
}