import { useState, useEffect } from "react";
import FooterComponent from "./footer/footer";

export default function Wallet() {
  const [isconnected, setIsConnected] = useState(false);

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
                <div className="grid grid-cols-2 border-2">
                  <div>
                    <span>QR Code Here</span>
                  </div>
                  <div className="">
                    <p>Address: </p>
                    <p>SBTs Owned: </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-2">
              <div className="border-2">
                <h2 className="text-[#9F32B2]">Request SBTs</h2>
                <div>Request Token here</div>
              </div>
              <div className="border-2">
                <h2 className="text-[#9F32B2]">Contract Stats</h2>
                <p>SBTs Issued</p>
                <p>View on Block Explorer</p>
              </div>
            </div>
          </div>
        </div>
        <FooterComponent></FooterComponent>
      </div>
    </>
  );
}
