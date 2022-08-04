import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import FooterComponent from "./footer/footer";

const addNetwork = async () => {
  window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: "0x13881",
        chainName: "Polygon Testnet",
        nativeCurrency: {
          name: "MATIC",
          symbol: "MATIC",
          decimals: 18,
        },
        rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
        blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
      },
    ],
  });
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Soulbound - Index</title>
        <meta name="description" content="Soulbound Token Wallet" />
      </Head>
      <div className="">
        <div className="max-w-screen-md mx-4 text-center md:mx-auto ">
          <div className="mb-7">
            <h0 className="mb-7">SOULBOUND</h0>
          </div>
          <div className=" mb-7">
            <Image src="/logo.png" width="128" height="128" />
          </div>
          <div className="mb-10 ">
            <h1>
              Enter the future of decentralized society with Soulbound Wallet
            </h1>
          </div>
          <div>
            <button className="bg-[#9F32B2] hover:bg-[#D40FF6] text-white px-4">
              <a href="#start">
                <h2 className="font-medium">Get Started</h2>
              </a>
            </button>
          </div>
        </div>

        <div className="max-w-screen-md mx-4 mt-16 md:mx-auto">
          <div className="text-center ">
            <div className=" mb-7">
              <h1 className="text-[#9F32B2]">Soulbound Token</h1>
            </div>

            <div className="mb-5 ">
              <h2>Identity for decentralized society</h2>
            </div>

            <div className=" mb-7">
              <p>
                A Soulbound Token (SBT) is similar to an NFT but
                non-transferable. It can represent the commitments, credentials
                and affilations of each individuals - Souls
              </p>
            </div>
          </div>

          <div className="">
            <div className="items-center space-x-2 sm:flex">
              <div className="px-5 sm:px-20">
                <svg
                  className=""
                  width="100"
                  height="130"
                  viewBox="0 0 123 161"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.7774 100.809L7 134.475L30.317 127.143L38.5708 152.654L61.1656 112.91L83.9667 151.419L90.9824 128.789L116.569 133.726L97.8438 100.809"
                    stroke="#9F32B2"
                    strokeWidth="6.5"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M75.6514 5.11612C98.5326 11.4325 115.331 32.3444 115.331 57.168C115.331 86.9939 91.0802 111.173 61.1656 111.173C31.2505 111.173 7 86.9939 7 57.168C7 31.5667 24.867 10.1269 48.8468 4.56641"
                    stroke="#9F32B2"
                    strokeWidth="6.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M105.014 56.5767C105.014 80.3239 85.7057 99.5747 61.8877 99.5747C38.0697 99.5747 18.7616 80.3239 18.7616 56.5767C18.7616 32.8294 38.0697 13.5786 61.8877 13.5786C85.7057 13.5786 105.014 32.8294 105.014 56.5767Z"
                    stroke="#9F32B2"
                    strokeWidth="6.5"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M36.1909 48.8614L53.5816 46.9353C53.7426 46.9176 53.8821 46.8172 53.9506 46.6712L61.2721 30.9968C61.4368 30.6446 61.937 30.6401 62.1086 30.989L69.8243 46.6802C69.8936 46.8209 70.0298 46.9172 70.1862 46.9357L86.551 48.8635C86.9171 48.9067 87.0888 49.3375 86.8519 49.6189L75.441 63.1976C75.3519 63.3034 75.3151 63.4433 75.3403 63.5791L78.4107 80.0319C78.4842 80.4261 78.0538 80.7207 77.7112 80.51L62.1293 70.9196C61.9811 70.8287 61.7942 70.8278 61.6456 70.918L45.7591 80.5322C45.4195 80.7376 44.9948 80.4499 45.0617 80.059L48.024 62.7685C48.0487 62.6257 48.0046 62.4796 47.9051 62.3743L35.9041 49.637C35.6428 49.3597 35.8112 48.9034 36.1909 48.8614Z"
                    stroke="#9F32B2"
                    strokeWidth="6.5"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M64.5703 2.88025C64.5703 4.47097 63.2769 5.7605 61.6814 5.7605C60.086 5.7605 58.7926 4.47097 58.7926 2.88025C58.7926 1.28953 60.086 0 61.6814 0C63.2769 0 64.5703 1.28953 64.5703 2.88025Z"
                    fill="#9F32B2"
                  />
                </svg>
              </div>
              <div className=" mb-7">
                <div className="mb-5 ">
                  <h2>Provenance</h2>
                </div>
                <div>
                  <p>
                    Build reputations and establish provenance for data
                    creators. For example, an artist could issue an NFT from
                    their soul for buyers to identify the artist, and thereby
                    confirm the NFT’s legitimacy.
                  </p>
                </div>
              </div>
            </div>

            <div className="items-center space-x-2 sm:flex">
              <div className="px-5 sm:px-20">
                <svg
                  width="100"
                  height="130"
                  viewBox="0 0 154 149"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M74.8591 112.497C76.6082 115.083 77.6033 118.21 77.6033 121.547V127.11C77.6033 128.162 76.7288 129.034 75.6733 129.034H71.8133C70.7578 129.034 69.9134 128.162 69.9134 127.11V121.547C69.9134 119.864 69.4007 118.21 68.4659 116.827C67.1088 114.843 64.6661 113.64 61.8917 113.64C58.8761 113.64 56.8556 115.324 50.6131 115.324C44.3405 115.324 42.3201 113.64 39.3345 113.64C36.5601 113.64 34.1174 114.812 32.7604 116.827C31.8255 118.21 31.3129 119.864 31.3129 121.547V127.11C31.3129 128.162 30.4383 129.034 29.3828 129.034H25.5529C24.4673 129.034 23.6229 128.162 23.6229 127.11V121.547C23.6229 118.21 24.6181 115.083 26.3672 112.497C29.2622 108.168 34.2079 105.913 39.3044 105.913C44.0088 105.913 45.1849 107.596 50.583 107.596C55.981 107.596 57.1571 105.913 61.8616 105.913C66.9279 105.913 71.9037 108.168 74.8591 112.497Z"
                    fill="#9F32B2"
                  />
                  <path
                    d="M66.1619 82.7006C66.1619 91.2788 59.1867 98.2333 50.583 98.2333C41.9793 98.2333 35.004 91.2788 35.004 82.7006C35.004 74.1225 41.9793 67.168 50.583 67.168C59.1867 67.168 66.1619 74.1225 66.1619 82.7006Z"
                    stroke="#9F32B2"
                    strokeWidth="6.5"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M116.083 103.988V107.837C116.083 108.889 115.239 109.761 114.153 109.761H87.1932C86.1377 109.761 85.2632 108.889 85.2632 107.837V103.988C85.2632 102.906 86.1377 102.064 87.1932 102.064H114.153C115.239 102.064 116.083 102.906 116.083 103.988Z"
                    fill="#9F32B2"
                  />
                  <path
                    d="M116.083 88.5635V92.412C116.083 93.4644 115.239 94.3363 114.153 94.3363H87.1932C86.1377 94.3363 85.2632 93.4644 85.2632 92.412V88.5635C85.2632 87.5111 86.1377 86.6392 87.1932 86.6392H114.153C115.239 86.6392 116.083 87.5111 116.083 88.5635Z"
                    fill="#9F32B2"
                  />
                  <path
                    d="M116.083 73.1391V76.9877C116.083 78.0401 115.239 78.912 114.153 78.912H87.1932C86.1377 78.912 85.2632 78.0401 85.2632 76.9877V73.1391C85.2632 72.0868 86.1377 71.2148 87.1932 71.2148H114.153C115.239 71.2148 116.083 72.0868 116.083 73.1391Z"
                    fill="#9F32B2"
                  />
                  <path
                    d="M123.131 145.577H16.5753C9.63025 145.577 4 139.963 4 133.039V55.6342C4 48.7097 9.63025 43.0962 16.5753 43.0962H123.131C130.076 43.0962 135.706 48.7097 135.706 55.6342V133.039C135.706 139.963 130.076 145.577 123.131 145.577Z"
                    stroke="#9F32B2"
                    strokeWidth="6.5"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M85.423 33.7408C85.423 15.1063 100.574 0 119.264 0C137.954 0 153.105 15.1063 153.105 33.7408C153.105 52.3752 137.954 67.4815 119.264 67.4815C100.574 67.4815 85.423 52.3752 85.423 33.7408Z"
                    fill="#9F32B2"
                  />
                  <path
                    d="M105.582 37.7499L113.05 45.1958L126.889 31.3975"
                    stroke="white"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M131.85 25.9819L135.036 22.8057"
                    stroke="white"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className=" mb-7">
                <div className="mb-5 ">
                  <h2>Sybil Resistance</h2>
                </div>
                <div>
                  <p>
                    Differenitate between unique souls and probable bots by
                    computing over a soul’s constellation of SBTs, denying
                    voting power to a Soul that appears to by a Sybil in a DAO
                  </p>
                </div>
              </div>
            </div>

            <div className="items-center space-x-2 sm:flex">
              <div className="px-5 sm:px-20">
                <svg
                  width="100"
                  height="130"
                  viewBox="0 0 163 168"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask id="path-1-inside-1_218_917" fill="white">
                    <path d="M84.9176 102.331L98.0573 89.2407C100.12 87.1857 103.181 86.3401 106.045 87.0337C120.692 90.5879 135.803 86.3675 146.466 75.7448C154.767 67.4753 159.19 56.5143 158.919 44.8807C158.649 33.2544 153.707 22.5489 145.005 14.7355C128.945 0.314243 103.798 0.470335 87.7567 15.0923C75.0353 26.6783 70.5802 44.5012 76.3616 60.5166C77.4585 63.5549 76.698 66.9807 74.4253 69.2448L9.63157 133.794C5.70475 137.706 4.0533 141.893 4.43349 146.968L4.76552 156.382C5.02957 158.033 5.27164 158.106 7.26382 158.709C7.80164 158.871 8.41365 159.056 9.10568 159.305L20.3856 163.374C21.8379 163.898 23.4844 163.532 24.5804 162.44L28.6806 158.356L28.5756 148.649L33.2079 144.045L43.7732 144.769L46.8227 141.686L46.9947 129.405L57.4311 128.913L57.4341 116.952L68.974 118.204L73.6171 113.507L72.9468 102.492L84.9176 102.331Z" />
                    <path d="M147.331 12.1939C129.964 -3.40048 102.773 -3.23092 85.4289 12.5787C71.7039 25.0871 66.8628 44.3691 73.1124 61.6835C73.7727 63.5129 73.3411 65.4869 71.9868 66.8361L7.19346 131.385C2.56708 135.994 0.539537 141.18 0.990697 147.171L1.32223 156.619L1.3417 156.818C1.93747 160.677 4.02821 161.31 6.24095 161.979C6.76413 162.136 7.30438 162.3 7.91197 162.519L19.1902 166.588C21.9022 167.566 24.9768 166.881 27.0215 164.844L32.1488 159.736L32.0433 150.032L34.5283 147.563L45.1111 148.288L50.255 143.086L50.4006 132.666L60.8818 132.172L60.8856 120.768L70.2525 121.786L77.155 114.801L76.611 105.861L86.3589 105.731L100.497 91.6455C101.709 90.4388 103.513 89.9446 105.208 90.3554C120.805 94.1398 137.549 89.4629 148.906 78.1493C157.88 69.2087 162.662 57.3595 162.37 44.7822C162.077 32.2117 156.736 20.6389 147.331 12.1939ZM158.919 44.8794C159.19 56.5128 154.767 67.4732 146.466 75.7426C135.803 86.3651 120.693 90.5855 106.045 87.0318C103.182 86.3377 100.121 87.1834 98.0577 89.2388L84.9186 102.328L72.948 102.49L73.6178 113.505L68.9753 118.203L57.4351 116.95L57.433 128.911L46.9958 129.401L46.8243 141.684L43.7748 144.766L33.2096 144.042L28.5774 148.646L28.6819 158.353L24.5818 162.437C23.4862 163.529 21.8393 163.895 20.387 163.372L9.10725 159.303C8.41474 159.054 7.80372 158.868 7.26493 158.705C6.80472 158.566 6.44602 158.456 6.15076 158.348L81.5683 83.2149L79.1281 80.8077L4.71682 154.938L4.4361 146.966C4.05495 141.89 5.70637 137.703 9.63314 133.791L74.4265 69.2427C76.6991 66.9786 77.4591 63.5534 76.3633 60.5151C70.5819 44.4999 75.0365 26.6778 87.7577 15.0909C103.799 0.469632 128.945 0.313059 145.006 14.7346C153.707 22.5479 158.648 33.2538 158.919 44.8794Z" />
                    <path d="M134.783 31.9654C137.865 38.4737 135.087 46.248 128.579 49.3298C122.071 52.4115 114.296 49.6338 111.215 43.1255C108.133 36.6172 110.911 28.843 117.419 25.7612C123.927 22.6794 131.701 25.4572 134.783 31.9654Z" />
                  </mask>
                  <path
                    d="M84.9176 102.331L84.9513 104.831L85.9643 104.817L86.682 104.102L84.9176 102.331ZM98.0573 89.2407L99.8217 91.0118L99.8217 91.0118L98.0573 89.2407ZM106.045 87.0337L106.634 84.6042L106.633 84.6039L106.045 87.0337ZM146.466 75.7448L148.23 77.5159L146.466 75.7448ZM158.919 44.8807L156.42 44.9388L156.42 44.9389L158.919 44.8807ZM145.005 14.7355L143.335 16.5956L143.335 16.5956L145.005 14.7355ZM87.7567 15.0923L89.4401 16.9406L89.4409 16.9399L87.7567 15.0923ZM76.3616 60.5166L78.7131 59.6678L78.7131 59.6678L76.3616 60.5166ZM74.4253 69.2448L72.6609 67.4737L74.4253 69.2448ZM9.63157 133.794L11.396 135.565L11.396 135.565L9.63157 133.794ZM4.43349 146.968L6.93193 146.88L6.93019 146.831L6.9265 146.782L4.43349 146.968ZM4.76552 156.382L2.26708 156.47L2.27252 156.624L2.29688 156.776L4.76552 156.382ZM7.26382 158.709L7.98775 156.316L7.98728 156.316L7.26382 158.709ZM9.10568 159.305L9.95409 156.953L9.95208 156.953L9.10568 159.305ZM20.3856 163.374L19.5371 165.726L19.5374 165.726L20.3856 163.374ZM24.5804 162.44L22.816 160.669L22.816 160.669L24.5804 162.44ZM28.6806 158.356L30.445 160.127L31.1918 159.383L31.1804 158.328L28.6806 158.356ZM28.5756 148.649L26.8132 146.876L26.0643 147.621L26.0757 148.676L28.5756 148.649ZM33.2079 144.045L33.3788 141.551L32.2488 141.474L31.4455 142.272L33.2079 144.045ZM43.7732 144.769L43.6023 147.263L44.7452 147.342L45.5507 146.527L43.7732 144.769ZM46.8227 141.686L48.6002 143.444L49.3084 142.728L49.3225 141.721L46.8227 141.686ZM46.9947 129.405L46.8771 126.908L44.5279 127.018L44.495 129.37L46.9947 129.405ZM57.4311 128.913L57.5487 131.411L59.9305 131.299L59.9311 128.914L57.4311 128.913ZM57.4341 116.952L57.7039 114.466L54.9348 114.166L54.9341 116.951L57.4341 116.952ZM68.974 118.204L68.7042 120.69L69.9038 120.82L70.752 119.962L68.974 118.204ZM73.6171 113.507L75.3951 115.265L76.1803 114.47L76.1125 113.356L73.6171 113.507ZM72.9468 102.492L72.9131 99.9926L70.2922 100.028L70.4514 102.644L72.9468 102.492ZM147.331 12.1939L145.661 14.0541L145.661 14.0541L147.331 12.1939ZM85.4289 12.5787L87.1129 14.4265L87.113 14.4263L85.4289 12.5787ZM73.1124 61.6835L75.4639 60.8347L75.4639 60.8347L73.1124 61.6835ZM71.9868 66.8361L73.7512 68.6072L71.9868 66.8361ZM7.19346 131.385L5.42904 129.614L5.42904 129.614L7.19346 131.385ZM0.990697 147.171L3.48916 147.083L3.4874 147.033L3.48364 146.983L0.990697 147.171ZM1.32223 156.619L-1.17623 156.707L-1.1735 156.785L-1.16592 156.862L1.32223 156.619ZM1.3417 156.818L-1.14645 157.062L-1.13967 157.131L-1.12902 157.2L1.3417 156.818ZM6.24095 161.979L5.51758 164.372L5.51848 164.372L6.24095 161.979ZM7.91197 162.519L8.7604 160.167L8.7595 160.167L7.91197 162.519ZM19.1902 166.588L18.3418 168.939L18.3419 168.939L19.1902 166.588ZM27.0215 164.844L25.2571 163.073L25.2571 163.073L27.0215 164.844ZM32.1488 159.736L33.9132 161.507L34.6601 160.763L34.6486 159.709L32.1488 159.736ZM32.0433 150.032L30.2813 148.259L29.532 149.003L29.5434 150.06L32.0433 150.032ZM34.5283 147.563L34.6992 145.069L33.5696 144.992L32.7663 145.79L34.5283 147.563ZM45.1111 148.288L44.9403 150.782L46.0832 150.861L46.8887 150.046L45.1111 148.288ZM50.255 143.086L52.0327 144.844L52.7407 144.128L52.7548 143.121L50.255 143.086ZM50.4006 132.666L50.2828 130.169L47.9337 130.28L47.9009 132.631L50.4006 132.666ZM60.8818 132.172L60.9996 134.669L63.3809 134.557L63.3818 132.173L60.8818 132.172ZM60.8856 120.768L61.1557 118.282L58.3866 117.981L58.3856 120.767L60.8856 120.768ZM70.2525 121.786L69.9824 124.271L71.1823 124.402L72.0307 123.543L70.2525 121.786ZM77.155 114.801L78.9332 116.558L79.7182 115.764L79.6504 114.649L77.155 114.801ZM76.611 105.861L76.5775 103.361L73.9564 103.397L74.1156 106.013L76.611 105.861ZM86.3589 105.731L86.3924 108.23L87.4056 108.217L88.1233 107.502L86.3589 105.731ZM100.497 91.6455L102.262 93.4166L102.262 93.4166L100.497 91.6455ZM105.208 90.3554L105.797 87.9259L105.796 87.9257L105.208 90.3554ZM148.906 78.1493L147.141 76.3782L147.141 76.3782L148.906 78.1493ZM162.37 44.7822L164.869 44.7241L164.869 44.7241L162.37 44.7822ZM158.919 44.8794L161.418 44.8212L161.418 44.8212L158.919 44.8794ZM146.466 75.7426L148.231 77.5137L146.466 75.7426ZM106.045 87.0318L106.635 84.6023L106.634 84.6021L106.045 87.0318ZM98.0577 89.2388L96.2932 87.4677L96.2932 87.4677L98.0577 89.2388ZM84.9186 102.328L84.9524 104.828L85.9654 104.814L86.6831 104.099L84.9186 102.328ZM72.948 102.49L72.9143 99.99L70.2935 100.025L70.4526 102.641L72.948 102.49ZM73.6178 113.505L75.3959 115.262L76.181 114.468L76.1132 113.353L73.6178 113.505ZM68.9753 118.203L68.7054 120.688L69.9051 120.818L70.7534 119.96L68.9753 118.203ZM57.4351 116.95L57.7049 114.464L54.9355 114.164L54.9351 116.949L57.4351 116.95ZM57.433 128.911L57.5503 131.408L59.9326 131.296L59.933 128.911L57.433 128.911ZM46.9958 129.401L46.8785 126.904L44.5289 127.015L44.496 129.367L46.9958 129.401ZM46.8243 141.684L48.6015 143.442L49.3099 142.726L49.324 141.718L46.8243 141.684ZM43.7748 144.766L43.6039 147.26L44.7466 147.338L45.5521 146.524L43.7748 144.766ZM33.2096 144.042L33.3805 141.548L32.2506 141.47L31.4472 142.269L33.2096 144.042ZM28.5774 148.646L26.815 146.873L26.0661 147.617L26.0775 148.673L28.5774 148.646ZM28.6819 158.353L30.4463 160.124L31.1931 159.38L31.1817 158.326L28.6819 158.353ZM24.5818 162.437L26.3462 164.208L26.3462 164.208L24.5818 162.437ZM20.387 163.372L19.5387 165.723L19.5389 165.723L20.387 163.372ZM9.10725 159.303L9.95549 156.951L9.95455 156.951L9.10725 159.303ZM7.26493 158.705L6.54023 161.098L6.54225 161.099L7.26493 158.705ZM6.15076 158.348L4.38634 156.577L1.60823 159.344L5.28976 160.695L6.15076 158.348ZM81.5683 83.2149L83.3327 84.986L85.1193 83.2061L83.324 81.4351L81.5683 83.2149ZM79.1281 80.8077L80.8838 79.028L79.1195 77.2875L77.3637 79.0366L79.1281 80.8077ZM4.71682 154.938L2.21837 155.026L2.42009 160.755L6.48124 156.709L4.71682 154.938ZM4.4361 146.966L6.93455 146.878L6.9328 146.828L6.92908 146.778L4.4361 146.966ZM9.63314 133.791L11.3976 135.563L11.3976 135.563L9.63314 133.791ZM74.4265 69.2427L72.662 67.4716L72.662 67.4716L74.4265 69.2427ZM76.3633 60.5151L78.715 59.6669L78.7148 59.6662L76.3633 60.5151ZM87.7577 15.0909L89.4412 16.9392L89.4419 16.9386L87.7577 15.0909ZM145.006 14.7346L143.336 16.5947L143.336 16.5947L145.006 14.7346ZM86.682 104.102L99.8217 91.0118L96.2929 87.4696L83.1532 100.56L86.682 104.102ZM99.8217 91.0118C101.259 89.5799 103.425 88.9716 105.456 89.4634L106.633 84.6039C102.937 83.7086 98.981 84.7916 96.2929 87.4696L99.8217 91.0118ZM105.455 89.4632C120.947 93.2223 136.95 88.7538 148.23 77.5159L144.702 73.9737C134.656 83.9811 120.437 87.9535 106.634 84.6042L105.455 89.4632ZM148.23 77.5159C157.013 68.7669 161.706 57.1463 161.419 44.8225L156.42 44.9389C156.675 55.8823 152.521 66.1836 144.702 73.9737L148.23 77.5159ZM161.419 44.8226C161.132 32.5025 155.887 21.1463 146.675 12.8753L143.335 16.5956C151.527 23.9515 156.166 34.0064 156.42 44.9388L161.419 44.8226ZM146.675 12.8753C129.651 -2.41127 103.054 -2.23478 86.0726 13.2447L89.4409 16.9399C104.541 3.17545 128.238 3.03975 143.335 16.5956L146.675 12.8753ZM86.0734 13.244C72.6122 25.5037 67.8815 44.3883 74.0102 61.3655L78.7131 59.6678C73.2788 44.614 77.4584 27.8529 89.4401 16.9406L86.0734 13.244ZM74.0102 61.3655C74.7801 63.4983 74.2399 65.9006 72.6609 67.4737L76.1897 71.0159C79.156 68.0608 80.1368 63.6116 78.7131 59.6678L74.0102 61.3655ZM72.6609 67.4737L7.86715 132.023L11.396 135.565L76.1897 71.0159L72.6609 67.4737ZM7.86715 132.023C3.4752 136.398 1.50054 141.282 1.94047 147.155L6.9265 146.782C6.60606 142.503 7.93431 139.014 11.396 135.565L7.86715 132.023ZM1.93504 147.056L2.26708 156.47L7.26397 156.293L6.93193 146.88L1.93504 147.056ZM2.29688 156.776C2.41669 157.526 2.61632 158.853 3.71939 159.819C4.21699 160.255 4.76163 160.499 5.17732 160.658C5.58708 160.815 6.07513 160.961 6.54037 161.102L7.98728 156.316C7.73358 156.239 7.53015 156.177 7.35262 156.121C7.17521 156.065 7.05242 156.022 6.96297 155.988C6.76472 155.912 6.8588 155.922 7.01386 156.058C7.10058 156.134 7.17955 156.225 7.24279 156.322C7.30264 156.414 7.32912 156.482 7.33484 156.498C7.33896 156.509 7.32813 156.482 7.3076 156.389C7.28713 156.297 7.26347 156.17 7.23417 155.987L2.29688 156.776ZM6.5399 161.102C7.08147 161.265 7.63578 161.433 8.25927 161.657L9.95208 156.953C9.19152 156.679 8.52181 156.477 7.98775 156.316L6.5399 161.102ZM8.25726 161.657L19.5371 165.726L21.234 161.023L9.95409 156.953L8.25726 161.657ZM19.5374 165.726C21.9009 166.578 24.5645 165.985 26.3448 164.211L22.816 160.669C22.4042 161.079 21.7749 161.218 21.2337 161.023L19.5374 165.726ZM26.3448 164.211L30.445 160.127L26.9161 156.584L22.816 160.669L26.3448 164.211ZM31.1804 158.328L31.0754 148.622L26.0757 148.676L26.1807 158.383L31.1804 158.328ZM30.3379 150.422L34.9702 145.818L31.4455 142.272L26.8132 146.876L30.3379 150.422ZM33.037 146.539L43.6023 147.263L43.9441 142.275L33.3788 141.551L33.037 146.539ZM45.5507 146.527L48.6002 143.444L45.0452 139.928L41.9957 143.011L45.5507 146.527ZM49.3225 141.721L49.4945 129.44L44.495 129.37L44.3229 141.651L49.3225 141.721ZM47.1123 131.902L57.5487 131.411L57.3135 126.416L46.8771 126.908L47.1123 131.902ZM59.9311 128.914L59.9341 116.953L54.9341 116.951L54.9311 128.913L59.9311 128.914ZM57.1644 119.437L68.7042 120.69L69.2438 115.719L57.7039 114.466L57.1644 119.437ZM70.752 119.962L75.3951 115.265L71.8391 111.75L67.1961 116.447L70.752 119.962ZM76.1125 113.356L75.4422 102.34L70.4514 102.644L71.1217 113.659L76.1125 113.356ZM72.9805 104.992L84.9513 104.831L84.8839 99.831L72.9131 99.9926L72.9805 104.992ZM149.001 10.3338C130.671 -6.12602 102.03 -5.93599 83.7448 10.7311L87.113 14.4263C103.517 -0.525841 129.258 -0.674937 145.661 14.0541L149.001 10.3338ZM83.7449 10.7309C69.2819 23.912 64.1637 44.2549 70.7609 62.5323L75.4639 60.8347C69.5619 44.4833 74.1259 26.2623 87.1129 14.4265L83.7449 10.7309ZM70.7609 62.5322C71.0987 63.4684 70.874 64.4158 70.2224 65.065L73.7512 68.6072C75.8082 66.5579 76.4466 63.5575 75.4639 60.8347L70.7609 62.5322ZM70.2224 65.065L5.42904 129.614L8.95788 133.156L73.7512 68.6072L70.2224 65.065ZM5.42904 129.614C0.332912 134.691 -2.01307 140.575 -1.50224 147.358L3.48364 146.983C3.09214 141.785 4.80125 137.297 8.95788 133.156L5.42904 129.614ZM-1.50777 147.258L-1.17623 156.707L3.82069 156.531L3.48916 147.083L-1.50777 147.258ZM-1.16592 156.862L-1.14645 157.062L3.82985 156.575L3.81038 156.376L-1.16592 156.862ZM-1.12902 157.2C-0.761784 159.578 0.137044 161.316 1.58973 162.52C2.9173 163.62 4.50036 164.064 5.51758 164.372L6.96433 159.586C5.7688 159.224 5.20012 159.018 4.7802 158.67C4.48538 158.425 4.04095 157.917 3.81242 156.437L-1.12902 157.2ZM5.51848 164.372C6.04484 164.531 6.52656 164.677 7.06444 164.871L8.7595 160.167C8.08219 159.923 7.48342 159.742 6.96343 159.585L5.51848 164.372ZM7.06355 164.87L18.3418 168.939L20.0387 164.236L8.7604 160.167L7.06355 164.87ZM18.3419 168.939C21.9655 170.247 26.0573 169.333 28.7859 166.615L25.2571 163.073C23.8963 164.428 21.8389 164.885 20.0386 164.236L18.3419 168.939ZM28.7859 166.615L33.9132 161.507L30.3844 157.965L25.2571 163.073L28.7859 166.615ZM34.6486 159.709L34.5431 150.005L29.5434 150.06L29.6489 159.763L34.6486 159.709ZM33.8053 151.806L36.2903 149.337L32.7663 145.79L30.2813 148.259L33.8053 151.806ZM34.3575 150.058L44.9403 150.782L45.2819 145.794L34.6992 145.069L34.3575 150.058ZM46.8887 150.046L52.0327 144.844L48.4774 141.329L43.3335 146.53L46.8887 150.046ZM52.7548 143.121L52.9004 132.701L47.9009 132.631L47.7553 143.051L52.7548 143.121ZM50.5184 135.164L60.9996 134.669L60.7639 129.675L50.2828 130.169L50.5184 135.164ZM63.3818 132.173L63.3856 120.769L58.3856 120.767L58.3818 132.171L63.3818 132.173ZM60.6155 123.253L69.9824 124.271L70.5226 119.3L61.1557 118.282L60.6155 123.253ZM72.0307 123.543L78.9332 116.558L75.3768 113.044L68.4743 120.029L72.0307 123.543ZM79.6504 114.649L79.1064 105.709L74.1156 106.013L74.6596 114.953L79.6504 114.649ZM76.6445 108.361L86.3924 108.23L86.3254 103.231L76.5775 103.361L76.6445 108.361ZM88.1233 107.502L102.262 93.4166L98.7329 89.8744L84.5945 103.959L88.1233 107.502ZM102.262 93.4166C102.842 92.8388 103.749 92.5742 104.619 92.785L105.796 87.9257C103.277 87.3151 100.575 88.0388 98.7329 89.8744L102.262 93.4166ZM104.618 92.7849C121.06 96.7742 138.696 91.8492 150.67 79.9204L147.141 76.3782C136.402 87.0766 120.551 91.5054 105.797 87.9259L104.618 92.7849ZM150.67 79.9204C160.126 70.5003 165.178 57.9915 164.869 44.7241L159.87 44.8404C160.147 56.7275 155.635 67.917 147.141 76.3782L150.67 79.9204ZM164.869 44.7241C164.56 31.46 158.916 19.2366 149.001 10.3338L145.661 14.0541C154.555 22.0413 159.594 32.9635 159.87 44.8404L164.869 44.7241ZM156.42 44.9376C156.674 55.8808 152.521 66.1816 144.702 73.9715L148.231 77.5137C157.013 68.7648 161.705 57.1447 161.418 44.8212L156.42 44.9376ZM144.702 73.9715C134.657 83.9787 120.438 87.9511 106.635 84.6023L105.456 89.4613C120.948 93.2198 136.95 88.7515 148.231 77.5137L144.702 73.9715ZM106.634 84.6021C102.937 83.7061 98.9817 84.7894 96.2932 87.4677L99.8221 91.0099C101.26 89.5774 103.426 88.9694 105.456 89.4614L106.634 84.6021ZM96.2932 87.4677L83.1542 100.557L86.6831 104.099L99.8221 91.0099L96.2932 87.4677ZM84.8849 99.8285L72.9143 99.99L72.9817 104.99L84.9524 104.828L84.8849 99.8285ZM70.4526 102.641L71.1224 113.657L76.1132 113.353L75.4434 102.338L70.4526 102.641ZM71.8396 111.748L67.1971 116.445L70.7534 119.96L75.3959 115.262L71.8396 111.748ZM69.2451 115.717L57.7049 114.464L57.1652 119.435L68.7054 120.688L69.2451 115.717ZM54.9351 116.949L54.933 128.911L59.933 128.911L59.9351 116.95L54.9351 116.949ZM57.3157 126.414L46.8785 126.904L47.1131 131.899L57.5503 131.408L57.3157 126.414ZM44.496 129.367L44.3245 141.649L49.324 141.718L49.4955 129.436L44.496 129.367ZM45.047 139.925L41.9976 143.008L45.5521 146.524L48.6015 143.442L45.047 139.925ZM43.9457 142.272L33.3805 141.548L33.0387 146.536L43.6039 147.26L43.9457 142.272ZM31.4472 142.269L26.815 146.873L30.3397 150.419L34.972 145.815L31.4472 142.269ZM26.0775 148.673L26.182 158.38L31.1817 158.326L31.0772 148.619L26.0775 148.673ZM26.9175 156.582L22.8174 160.666L26.3462 164.208L30.4463 160.124L26.9175 156.582ZM22.8174 160.666C22.4059 161.076 21.7761 161.215 21.2351 161.02L19.5389 165.723C21.9026 166.576 24.5666 165.981 26.3462 164.208L22.8174 160.666ZM21.2352 161.02L9.95549 156.951L8.25901 161.655L19.5387 165.723L21.2352 161.02ZM9.95455 156.951C9.19456 156.677 8.52819 156.475 7.98762 156.312L6.54225 161.099C7.07925 161.261 7.63492 161.43 8.25996 161.655L9.95455 156.951ZM7.98964 156.313C7.51258 156.168 7.22661 156.079 7.01176 156.001L5.28976 160.695C5.66542 160.833 6.09685 160.964 6.54023 161.098L7.98964 156.313ZM7.91518 160.119L83.3327 84.986L79.8039 81.4438L4.38634 156.577L7.91518 160.119ZM83.324 81.4351L80.8838 79.028L77.3724 82.5875L79.8126 84.9946L83.324 81.4351ZM77.3637 79.0366L2.9524 153.167L6.48124 156.709L80.8925 82.5788L77.3637 79.0366ZM7.21527 154.85L6.93455 146.878L1.93765 147.054L2.21837 155.026L7.21527 154.85ZM6.92908 146.778C6.60785 142.501 7.93592 139.011 11.3976 135.563L7.86872 132.02C3.47683 136.396 1.50205 141.279 1.94312 147.153L6.92908 146.778ZM11.3976 135.563L76.1909 71.0138L72.662 67.4716L7.86872 132.02L11.3976 135.563ZM76.1909 71.0138C79.1574 68.0586 80.1372 63.6101 78.715 59.6669L74.0116 61.3633C74.781 63.4967 74.2409 65.8987 72.662 67.4716L76.1909 71.0138ZM78.7148 59.6662C73.2805 44.6127 77.4596 27.8523 89.4412 16.9392L86.0743 13.2427C72.6134 25.5032 67.8832 44.387 74.0118 61.364L78.7148 59.6662ZM89.4419 16.9386C104.542 3.1747 128.239 3.0386 143.336 16.5947L146.676 12.8744C129.652 -2.41248 103.055 -2.23544 86.0736 13.2433L89.4419 16.9386ZM143.336 16.5947C151.527 23.9503 156.165 34.0056 156.42 44.9376L161.418 44.8212C161.131 32.502 155.888 21.1455 146.676 12.8744L143.336 16.5947ZM132.524 33.0353C135.015 38.2957 132.769 44.5794 127.509 47.0703L129.649 51.5892C137.405 47.9166 140.715 38.6517 137.043 30.8955L132.524 33.0353ZM127.509 47.0703C122.249 49.5611 115.965 47.316 113.474 42.0556L108.955 44.1954C112.628 51.9516 121.893 55.2619 129.649 51.5892L127.509 47.0703ZM113.474 42.0556C110.983 36.7952 113.228 30.5116 118.489 28.0207L116.349 23.5017C108.593 27.1744 105.283 36.4393 108.955 44.1954L113.474 42.0556ZM118.489 28.0207C123.749 25.5298 130.033 27.775 132.524 33.0353L137.043 30.8955C133.37 23.1394 124.105 19.8291 116.349 23.5017L118.489 28.0207Z"
                    fill="#9F32B2"
                    mask="url(#path-1-inside-1_218_917)"
                  />
                </svg>
              </div>
              <div className=" mb-7">
                <div className="mb-5 ">
                  <h2>Community Recovery</h2>
                </div>
                <div>
                  <p>
                    Regenerage keys through community recovery model which
                    requires a member from a qualified majority of a Soul’s
                    communities to reocver private keys.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-screen-md mx-4 mt-16 md:mx-auto">
          <div className=" mb-7">
            <div className="text-center mb-7">
              <h1 className="text-[#9F32B2]">User Story</h1>
            </div>
            <div className="text-center">
              <p>
                Lucas graduated from Lumbburgh University with an Electrical and
                Electronics Degree. He works as a data scientist and part time
                research assistant at Lumbburgh University electronic lab. He
                recently attended blockchain workshop. On the personal side, he
                is a gold member at {} club
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto ">
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-28 md:gap-y-16 gap-y-12">
              <div className="flex">
                <div className="min-w-[300px] max-h-[350px] w-[300px] h-[350px]  overflow-hidden border-black group rounded-2xl bg-white max-w-sm shadow-lg">
                  <div className="py-7 bg-[#9F32B2]"></div>
                  <div className="text-center mt-[5.5rem] mb-1">
                    <h2>Graduate Token</h2>
                  </div>
                  <div className="mx-[2rem] border-t-[0.18rem] border-black">
                    <div className="mt-2 max-h-[150px] overflow-y-scroll">
                      <p className="">
                        an award conferred by lumbburgh university signifying
                        that the recipent has satisfactorily completed a course
                        of study an award conferred by lumbburgh university
                        signifying that the recipent has satisfactorily
                        completed a course of study 33333333333333333
                      </p>
                    </div>
                  </div>
                </div>
                <div class="absloute">
                  <img
                    src="https://raw.githubusercontent.com/lucaslokchan/proto-sbts/main/sbt_metadata/image/property_right_data_cooperatives.png"
                    class="shadow-xl rounded-full align-middle border-none border-black absolute -m-[-1rem] -ml-[13.5rem] max-w-[130px]"
                  />
                </div>
              </div>

              <div className="flex">
                <div className="min-w-[300px] w-[300px] h-[350px] overflow-hidden  border-black group rounded-2xl bg-white max-w-sm shadow-lg">
                  <div className="py-7 bg-[#9F32B2]"></div>
                  <div className="text-center mt-[5.5rem] mb-1">
                    <h2>Graduate Token</h2>
                  </div>
                  <div className="mx-[2rem] border-t-[0.18rem] border-black">
                    <div className="mt-2">
                      <p className="break-words">
                        an award conferred by lumbburgh university signifying
                        that the recipent has satisfactorily completed a course
                        of study
                      </p>
                    </div>
                  </div>
                </div>
                <div class="absloute">
                  <img
                    src="https://raw.githubusercontent.com/lucaslokchan/proto-sbts/main/sbt_metadata/image/property_right_data_cooperatives.png"
                    class="shadow-xl rounded-full align-middle border-none border-black absolute -m-[-1rem] -ml-[13.5rem] max-w-[130px]"
                  />
                </div>
              </div>

              <div className="flex">
                <div className="min-w-[300px] w-[300px] h-[350px] overflow-hidden  border-black group rounded-2xl bg-white max-w-sm shadow-lg">
                  <div className="py-7 bg-[#9F32B2]"></div>
                  <div className="text-center mt-[5.5rem] mb-1">
                    <h2>Graduate Token</h2>
                  </div>
                  <div className="mx-[2rem] border-t-[0.18rem] border-black">
                    <div className="mt-2">
                      <p className="break-words">
                        an award conferred by lumbburgh university signifying
                        that the recipent has satisfactorily completed a course
                        of study
                      </p>
                    </div>
                  </div>
                </div>
                <div class="absloute">
                  <img
                    src="https://raw.githubusercontent.com/lucaslokchan/proto-sbts/main/sbt_metadata/image/property_right_data_cooperatives.png"
                    class="shadow-xl rounded-full align-middle border-none border-black absolute -m-[-1rem] -ml-[13.5rem] max-w-[130px]"
                  />
                </div>
              </div>

              <div className="flex">
                <div className="min-w-[300px] w-[300px] h-[350px] overflow-hidden  border-black group rounded-2xl bg-white max-w-sm shadow-lg">
                  <div className="py-7 bg-[#9F32B2]"></div>
                  <div className="text-center mt-[5.5rem] mb-1">
                    <h2>Graduate Token</h2>
                  </div>
                  <div className="mx-[2rem] border-t-[0.18rem] border-black">
                    <div className="mt-2">
                      <p className="break-words">
                        an award conferred by lumbburgh university signifying
                        that the recipent has satisfactorily completed a course
                        of study
                      </p>
                    </div>
                  </div>
                </div>
                <div class="absloute">
                  <img
                    src="https://raw.githubusercontent.com/lucaslokchan/proto-sbts/main/sbt_metadata/image/property_right_data_cooperatives.png"
                    class="shadow-xl rounded-full align-middle border-none border-black absolute -m-[-1rem] -ml-[13.5rem] max-w-[130px]"
                  />
                </div>
              </div>

              <div className="flex">
                <div className="min-w-[300px] w-[300px] h-[350px] overflow-hidden  border-black group rounded-2xl bg-white max-w-sm shadow-lg">
                  <div className="py-7 bg-[#9F32B2]"></div>
                  <div className="text-center mt-[5.5rem] mb-1">
                    <h2>Graduate Token</h2>
                  </div>
                  <div className="mx-[2rem] border-t-[0.18rem] border-black">
                    <div className="mt-2">
                      <p className="break-words">
                        an award conferred by lumbburgh university signifying
                        that the recipent has satisfactorily completed a course
                        of study
                      </p>
                    </div>
                  </div>
                </div>
                <div class="absloute">
                  <img
                    src="https://raw.githubusercontent.com/lucaslokchan/proto-sbts/main/sbt_metadata/image/property_right_data_cooperatives.png"
                    class="shadow-xl rounded-full align-middle border-none border-black absolute -m-[-1rem] -ml-[13.5rem] max-w-[130px]"
                  />
                </div>
              </div>

              <div className="flex">
                <div className="min-w-[300px] w-[300px] h-[350px] overflow-hidden  border-black group rounded-2xl bg-white max-w-sm shadow-lg">
                  <div className="py-7 bg-[#9F32B2]"></div>
                  <div className="text-center mt-[5.5rem] mb-1">
                    <h2>Graduate Token</h2>
                  </div>
                  <div className="mx-[2rem] border-t-[0.18rem] border-black">
                    <div className="mt-2">
                      <p className="break-words">
                        an award conferred by lumbburgh university signifying
                        that the recipent has satisfactorily completed a course
                        of study
                      </p>
                    </div>
                  </div>
                </div>
                <div class="absloute">
                  <img
                    src="https://raw.githubusercontent.com/lucaslokchan/proto-sbts/main/sbt_metadata/image/property_right_data_cooperatives.png"
                    class="shadow-xl rounded-full align-middle border-none border-black absolute -m-[-1rem] -ml-[13.5rem] max-w-[130px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="start"
          className="bg-[#313896] md:py-24 md:px-24 py-10 px-10  mx-auto mt-16"
        >
          <div className="max-w-screen-xl p-10 mx-auto bg-white ">
            <div className=" mb-7">
              <h1 className="text-[#9F32B2]">Claim Your Own SBTs</h1>
            </div>
            <div className=" mb-7">
              <a target="_blank" href="https://metamask.io/download/">
                <h2>Install Metamask</h2>
              </a>
            </div>
            <div className=" mb-7">
              <button onClick={addNetwork}>
                <h2>Switch to Goerli</h2>
              </button>
            </div>
            <div className=" mb-7">
              <a target="_blank" href="https://faucet.egorfine.com/">
                <h2>Get Testnet Ether</h2>
              </a>
            </div>
            <div className=" mb-7">
              <h2 className="text-[#9F32B2]">
                <Link href="wallet">
                  <a>Get Started</a>
                </Link>
              </h2>
            </div>
          </div>
        </div>

        <FooterComponent></FooterComponent>
      </div>
    </>
  );
}
