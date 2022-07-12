import Link from "next/link";

export default function Home() {
  return (
    <>
      <div class="shadow-lg group container  rounded-md bg-white  max-w-sm flex justify-center items-center  mx-auto content-div">
        <div class="">
          <div class="py-8 px-4 bg-white  rounded-b-md fd-cl group-hover:opacity-0">
            <span class="block text-lg text-gray-800 font-bold tracking-wide border-2">
              Book a flight
            </span>
            <span class="block text-gray-600 text-sm border-2">
              Vivamus ac ligula sit amet erat luctus laoreet ac quis ligula.
              Donec bibendum faucibus purus eget cursus. Proin enim ante,
              scelerisque vel sem sit amet, ultrices mollis risus. Praesent
              justo felis, ullamcorper a cursus sed, condimentum at dui.
            </span>
          </div>
        </div>

        <div class="absolute opacity-0 fd-sh group-hover:opacity-100">
          <span class="text-3xl font-bold text-black tracking-wider leading-relaxed font-sans">
            Paris city of light
          </span>
          <div class="pt-8 text-center">
            <button class="text-center rounded-lg p-4 bg-white  text-gray-700 font-bold text-lg">
              Learn more
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="w-[300px] h-[350px] border-2 border-black group rounded-2xl bg-white max-w-sm shadow-lg">
          <div className="rounded-t-2xl bg-[#9F32B2]">123</div>
        </div>
      </div>

      <div class="flex justify-center">
        <div class="rounded-2xl shadow-lg bg-white max-w-sm border-2">
          <div className="border-2 rounded-t-2xl bg-[#9F32B2]">123</div>
          <div class="p-6">
            <h5 class="text-gray-900 text-xl font-medium mb-2">Card title</h5>
            <p class="text-gray-700 text-base mb-4">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <button
              type="button"
              class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Button
            </button>
          </div>
        </div>
      </div>

      <div className="w-[300px] h-[350px] relative  mx-auto   min-w-0 break-words bg-white mb-6 shadow-lg rounded-xl mt-16 border-2 border-black">
        <div class="px-6">
          <div class="flex flex-wrap justify-center">
            <div class="w-full flex justify-center">
              <div class="relative">
                <img
                  src="https://raw.githubusercontent.com/lucaslokchan/proto-sbts/main/sbt_metadata/image/property_right_data_cooperatives.png"
                  class="shadow-xl rounded-full align-middle border-none border-black absolute -m-16 -ml-16 max-w-[130px]"
                />
              </div>
            </div>
            <div class="w-full text-center mt-20"></div>
          </div>
          <div class="text-center mt-2">
            <h2 className="mb-1">Graduate Token</h2>
            <div class="text-xs mt-0 mb-2 text-slate-400 font-bold capitalize">
              <p class=""></p>
              Loughborough University
            </div>
          </div>
          <div class="mt-6 py-6 border-t-2 border-black text-center">
            <div class="flex flex-wrap justify-center">
              <div class="w-full px-4">
                <p class="mb-4">
                  An artist of considerable range, Mike is the name taken
                  by333333333333333333333333333333333333333333333333333
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
