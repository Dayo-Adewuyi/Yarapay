import React from "react";
import { Web3Asset } from "../../../public";
import Image from "next/image";

const JustAsYouKnowIt = () => {
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 px-6 min-h-[50vh] lg:h-[50vh] my-12 lg:my-20">
      <div className="flex flex-col items-center justify-center lg:items-start w-full lg:w-[60%] lg:h-full">
        <h1 className="text-2xl lg:text-4xl font-bold text-center lg:text-left text-[#0B51FF]">
          WEB3 JUST AS YOU KNOW IT
        </h1>
        <p className="lg:text-xl pt-4 text-left text-[#8E8F94] font-light">
          Web 3 just as you know it! Make Your Transactions Faster, Cheaper, and
          More Secure with Our App! Yarapay is a web3 solution, increasing the
          accessibility of crypto funds for the average user which would foster
          mass adoption of crypto.
        </p>
      </div>
          <div className="flex flex-col items-center lg:items-start w-full lg:w-[40%] lg:h-full">
              <Image src={Web3Asset} alt="Web3Asset" className="w-full h-full object-center object-cover" />
      </div>
    </div>
  );
};

export default JustAsYouKnowIt;
