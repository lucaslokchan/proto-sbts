function FooterComponent() {
  return (
    <div className="max-w-screen-xl mx-4 my-6 md:mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="space-y-2 md:space-y-3 ">
          <div className="text-[#9F32B2] font-bold">
            <p>Learn More</p>
          </div>
          <div>
            <a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4105763">
              <p>Whitepaper</p>
            </a>
          </div>
          <div>
            <a href="https://vitalik.ca/general/2022/01/26/soulbound.html">
              <p>What is Soulbound?</p>
            </a>
          </div>
        </div>
        <div className="space-y-2 sm:space-y-3 ">
          <div className="text-[#9F32B2] font-bold mt-4 md:mt-0">
            <p>Ethereum Improvement Proposals</p>
          </div>
          <div>
            <a href="https://eips.ethereum.org/EIPS/eip-5114">
              <p>EIP-5114: Soulbound Token</p>
            </a>
          </div>
          <div>
            <a href="https://eips.ethereum.org/EIPS/eip-4973">
              <p>EIP-4973: Account-bound Tokens</p>
            </a>
          </div>
        </div>
        <div>
          <div className="text-[#9F32B2] font-bold mt-4 md:mt-0 flex md:place-items-end flex-col">
            <div>
              <p>Buy me a coffee :)</p>
            </div>
            <div>
              <img
                className="w-[80px] mr-[4.2rem] pt-4 sm:pt-1"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6AQMAAACyIsh+AAAABlBMVEX///8AAABVwtN+AAAACXBIWXMAAA7EAAAOxAGVKw4bAAACIUlEQVRogeWZQW7FMAhEkbLwMkfIUe2j5ghZ/oUlygzgVu0Fgmspcr7zusDgAVyRLcahGLccz6XHY78/0qdIz/UigC3KeXebuz74cMuUaxgo0jYCLp2nvQj3odODTQ2w9WqAmXgNgo1u1D0B8yAC+O6TgHm3GOAxOU8d9kZgwrO/g/bdgIZZ7iyYN8y8PwpTHMiBH7YyMAOQ3+PVAMwxTzIuISCIQ3iSpn52AoZr5OXCYZ7VALQMwHwFU4UpmTJItaeY3FUAM1GZdc3UMBMQCg06axPg9ByFooKCYXugJiKaal8HMBOpFZgbvUhP6jKzPiBeWDCpMYCzGox9KQEgV2WJBLWHN7N0l1YI0DQPYo7TxPeMyV0APp1CEvuAggN+9nRQARBmXVP3x7tEiAfg6eAuAIKWXgy1R6Ci6MWRXFH9fiDyFI8g7bY/UCq+rqK3PhDN8Hen0rjYsQep9jUAHDUeO0EVyDqKMXmkme8H8nLCGxCPyebVOWNyF4AxKev5ZAepuhTm9YCfKkjghdqWDcmMmIw2aguA130mGIB4m3RH4Pq+lAEwfjQgOlan2AoB3e/EIOYuIvaRgsLucQ8gRverv9gDCAlScxlg3YkpGxCJFMALzCNT8waAp2R+QKci7fZbjPz3QBEg7sxD7ZVdoo8I2kIAZ/S/NJEVusp+AI+fz0vt+RQBGJOp9sOvWNT73Y2AEBDlTYanaf/I9SLA/xhfuio944KmFLAAAAAASUVORK5CYII="
              ></img>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-3 md:place-items-end">
          <div className="flex flex-row mt-4 mb-auto space-x-3 md:mt-0">
            <div>
              <svg
                width="31"
                height="30"
                viewBox="0 0 31 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>LinkedIn</title>
                <a xlinkHref="https://www.linkedin.com/in/lucaslokchan/">
                  <path
                    d="M30.2455 30H24.0275V20.2566C24.0275 17.9332 23.9803 14.9431 20.7873 14.9431C17.5453 14.9431 17.0502 17.4713 17.0502 20.0851V30H10.8322V9.96384H16.8052V12.6949H16.8857C17.7203 11.1203 19.7498 9.45822 22.7818 9.45822C29.082 9.45822 30.2472 13.6047 30.2472 19.0022V30H30.2455ZM3.80937 7.22226C1.80786 7.22226 0.199997 5.60215 0.199997 3.60938C0.199997 1.61836 1.80961 0 3.80937 0C5.80389 0 7.4205 1.61836 7.4205 3.60938C7.4205 5.60215 5.80214 7.22226 3.80937 7.22226ZM6.92712 30H0.691628V9.96384H6.92712V30Z"
                    fill="#9F32B2"
                  />
                </a>
              </svg>
            </div>
            <div>
              <svg
                width="28"
                height="30"
                viewBox="0 0 28 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>GitHub</title>
                <a xlinkHref="https://www.github.com/lucaslokchan">
                  <path
                    d="M9.79821 26.5731C9.8066 28.253 9.80709 28.3202 9.82338 30L14.0155 29.9849H19.747C19.747 29.3297 19.7722 27.1627 19.7722 24.4649C19.7722 22.5767 19.1178 21.3404 18.413 20.7356C22.8932 20.24 27.6 18.535 27.6 10.7909C27.6 8.59026 26.8197 6.79281 25.5361 5.38174C25.7374 4.87274 26.417 2.82332 25.3347 0.0465195C25.3347 0.0465195 23.6483 -0.494394 19.8225 2.11274C18.2116 1.66422 16.5001 1.44248 14.7886 1.4324C13.077 1.44248 11.3655 1.66422 9.75458 2.11274C5.9036 -0.494394 4.21722 0.0465195 4.21722 0.0465195C3.13491 2.82332 3.8145 4.87274 4.04103 5.38174C2.74898 6.79281 1.96871 8.59026 1.96871 10.7909C1.96871 18.5148 6.66876 20.2484 11.1406 20.7524C10.5651 21.2564 10.0466 22.145 9.86533 23.4486C8.71423 23.9643 5.7962 24.8546 4.00076 21.7721C4.00076 21.7721 2.93859 19.8369 0.916611 19.6958C0.916611 19.6958 -1.04832 19.6706 0.77566 20.9204C0.77566 20.9204 2.09959 21.5419 3.01578 23.8685C3.01578 23.8685 4.19708 27.7893 9.79821 26.5731Z"
                    fill="#9F32B2"
                  />
                </a>
              </svg>
            </div>
            <div>
              <svg
                width="36"
                height="30"
                viewBox="0 0 36 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Twitter</title>
                <a xlinkHref="https://twitter.com/lucaslokchan">
                  <path
                    d="M35.7315 3.57343C34.4211 4.18185 33.033 4.58346 31.6117 4.76534C33.1081 3.81681 34.2285 2.3293 34.766 0.577507C33.3792 1.43107 31.8421 2.0524 30.2058 2.39844C29.1263 1.18104 27.6959 0.373608 26.1366 0.101515C24.5773 -0.170579 22.9764 0.107896 21.5826 0.893695C20.1888 1.67949 19.08 2.92865 18.4284 4.44717C17.7768 5.9657 17.6189 7.66863 17.9792 9.29152C12.0146 8.9947 6.73104 5.97263 3.19167 1.408C2.54824 2.56117 2.21264 3.87645 2.22042 5.21442C2.22042 7.84431 3.48917 10.1558 5.41125 11.5139C4.27209 11.4756 3.15809 11.1508 2.16209 10.5665V10.6588C2.16144 12.4065 2.73414 14.1006 3.78303 15.4537C4.83192 16.8068 6.2924 17.7356 7.91667 18.0824C6.86419 18.3798 5.76186 18.4245 4.69084 18.2132C5.15185 19.7173 6.04659 21.0321 7.25023 21.9742C8.45387 22.9163 9.90635 23.4386 11.405 23.4683C8.86681 25.5691 5.73278 26.7093 2.50625 26.7057C1.9375 26.7057 1.37021 26.6703 0.800003 26.6027C4.08958 28.824 7.9145 30.0031 11.8206 30C25.0229 30 32.2344 18.4715 32.2344 8.49179C32.2344 8.16882 32.2344 7.84585 32.2125 7.52288C33.6212 6.4538 34.8364 5.12648 35.8 3.60419L35.7315 3.57343Z"
                    fill="#9F32B2"
                  />
                </a>
              </svg>
            </div>
          </div>
          <div className="">2022 Lucas Chan</div>
        </div>
      </div>
    </div>
  );
}
export default FooterComponent;
