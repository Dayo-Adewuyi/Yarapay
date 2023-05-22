import React from "react";
import { Logo } from "../../../public";
import Image from "next/image";

const Footer = () => {
  return (
    <>
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-20 px-6 min-h-[10vh] mb-12 lg:mb-20">
        <div className="flex flex-col items-center lg:items-start w-full lg:w-1/2 lg:h-full">
          <div className="w-[70%] mx-auto">
            <Image src={Logo} alt="Logo" />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-start w-full lg:w-1/2 lg:h-full gap-8 lg:gap-0">
          <div className="flex flex-col items-start w-full lg:w-1/2 lg:h-full">
            <h1 className="lg:text-lg font-medium text-center lg:text-left">
              Docs
            </h1>
            <ul className="flex flex-col gap-3 items-start mt-6 text-[#8E8F94] font-normal">
              <li className="text-center lg:text-left hover:underline cursor-pointer">
                Intro to Yarapay
              </li>
              <li className="text-center lg:text-left hover:underline cursor-pointer">
                FAQs
              </li>
              <li className="text-center lg:text-left hover:underline cursor-pointer">
                Blog
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-start w-full lg:w-1/2 lg:h-full">
            <h1 className="lg:text-lg font-medium text-center lg:text-left hover:underline cursor-pointer">
              Community
            </h1>
            <ul className="flex flex-col gap-3 items-start mt-6 text-[#8E8F94] font-normal">
              <li className="text-center lg:text-left hover:underline cursor-pointer">
                Discord
              </li>
              <li className="text-center lg:text-left hover:underline cursor-pointer">
                Twitter
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full max-w-7xl mx-auto">
        <hr />
        <div className="my-12 w-full flex items-center justify-center text-[#8E8F94] font-light">
          Copyright © 2023 Yarapay, Inc.
        </div>
      </div>
    </>
  );
};

export default Footer;
