import Link from 'next/link'


export default function Home() {
  return (
  <>
  <div className="border-1">
                <div className='grid grid-cols-1 md:grid-cols-2'>
                    <div>
                        <h1>
                            Lucas
                        </h1>
                        <p>
                        Lucas graduated from Lumbburgh University with an Electrical and Electronics Degree. He works as a data scientist and part time research assistant at Lumbburgh University electronic lab. He recently attended blockchain workshop. On the personal side, he is a gold member at ??? club
                        </p>
                    </div>

                    <div className="h-fit">
                        <h1 className="title is-2">
                            Stats
                        </h1>
                        <h2 className="subtitle is-4">
                            SBTs Owned: 
                        </h2>
                        <h2 className="subtitle is-4">
                            Total Supply:
                        </h2>
                    </div>
                </div>
            </div>


            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-28 ">
                
                <div className="w-[500px] h-[550px] max-w-xl overflow-hidden align-top border-2 rounded shadow-lg hover:bg-red-400">
                  <div className="grid place-items-center">
                      <img className="object-center w-2/5"/>
                  </div>
                  &nbsp;
                  <div>
                      <div className="grid place-items-center">
                          <p className="mb-2 text-xl font-bold place-content-center"></p>
                      </div>
                      <p>123</p>
                      <p>123</p>
                      <p>123</p>
                  </div>
                </div>     

                <div className="w-[500px] h-[550px] overflow-hidden align-top border-2 rounded shadow-lg hover:bg-red-400">
                  <div className="grid place-items-center">
                      <img className="object-center w-2/5"/>
                  </div>
                  &nbsp;
                  <div>
                      <div className="grid place-items-center">
                          <p className="mb-2 text-xl font-bold place-content-center"></p>
                      </div>
                      <p>123</p>
                      <p>123</p>
                      <p>123</p>
                  </div>
                </div> 

                <div className="w-[500px] h-[550px] overflow-hidden align-top border-2 rounded shadow-lg hover:bg-red-400">
                  <div className="grid place-items-center">
                      <img className="object-center w-2/5"/>
                  </div>
                  &nbsp;
                  <div>
                      <div className="grid place-items-center">
                          <p className="mb-2 text-xl font-bold place-content-center"></p>
                      </div>
                      <p>123</p>
                      <p>123</p>
                      <p>123</p>
                  </div>
                </div> 

                <div className="w-[500px] h-[550px] overflow-hidden align-top border-2 rounded shadow-lg hover:bg-red-400">
                  <div className="grid place-items-center">
                      <img className="object-center w-2/5"/>
                  </div>
                  &nbsp;
                  <div>
                      <div className="grid place-items-center">
                          <p className="mb-2 text-xl font-bold place-content-center"></p>
                      </div>
                      <p>123</p>
                      <p>123</p>
                      <p>123</p>
                  </div>
                </div> 

                <div className="w-[500px] h-[550px] overflow-hidden align-top border-2 rounded shadow-lg hover:bg-red-400">
                  <div className="grid place-items-center">
                      <img className="object-center w-2/5"/>
                  </div>
                  &nbsp;
                  <div>
                      <div className="grid place-items-center">
                          <p className="mb-2 text-xl font-bold place-content-center"></p>
                      </div>
                      <p>123</p>
                      <p>123</p>
                      <p>123</p>
                  </div>
                </div> 
              </div>
            </div>
      </>
  )
}