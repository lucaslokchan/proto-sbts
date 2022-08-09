import Link from "next/link";

function HeaderComponent() {
  return (
    <div className="text-center max-w-screen-xl md:mx-auto pt-4 grid place-items-center pb-2 sm:pb-0">
      <div className="grid grid-cols-3 max-w-screen-sm place-items-center">
        <div className="text-[0.8rem] sm:text-[1.2rem] space-x-auto mx-5 sm:mx-10 md:mx-12">
          <a href="">
            <h3>Launch</h3>
          </a>
        </div>
        <div className="text-[0.8rem] sm:text-[1.2rem]">
          <a href="">
            <h3 className="text-[#9F32B2]">Desktop</h3>
          </a>
        </div>
        <div className="text-[0.8rem] sm:text-[1.2rem]">
          <a href="">
            <h3 className="text-[#9F32B2]">Mobile</h3>
          </a>
        </div>
      </div>
    </div>
  );
}
export default HeaderComponent;
