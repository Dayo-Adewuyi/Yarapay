import React from 'react'
import { RandoHex, Wallet, QrFunny } from '../../../public';
import Image from 'next/image';

const WhyUs = () => {
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row gap-4 px-2 py-6 lg:h-[40vh] my-20 lg:my-24">
      {/* Grid of three cards */}
      <div className="h-full px-4  w-full flex flex-col lg:flex-row gap-24 lg:gap-12 mt-20">
        <div className="relative flex flex-col items-center justify-center px-4 text-lg text-[#8E8F94] font-light w-full lg:w-1/3 h-[300px] lg:h-full rounded-xl shadow-lg border-[1px] border-[#E1E8F0]">
          <div className="w-24 h-24 absolute top-0 -mt-12">
            <Image
              src={Wallet}
              alt="Wallet"
              className="w-full h-full transform scale-[200%] object-center object-cover"
            />
          </div>
          <p>
            Buying, selling and storing your favorite coins quickly and securely
            has never been easier.
          </p>
        </div>
        <div className="relative flex flex-col items-center justify-center px-4 text-lg text-[#8E8F94] font-light w-full lg:w-1/3 h-[300px] lg:h-full rounded-xl shadow-lg border-[1px] border-[#E1E8F0]">
          <div className="w-24 h-24 absolute top-0 -mt-12">
            <Image
              src={QrFunny}
              alt="QrFunny"
              className="w-full h-full object-center object-cover"
                      />
                      
          </div>
          <p>
            Introducing the fastest but secure way to pay with crypto; Scan to
            pay. Yes, as simple as it sounds!{" "}
          </p>
        </div>
        <div className="relative flex flex-col items-center justify-center px-4 text-lg text-[#8E8F94] font-light w-full lg:w-1/3 h-[300px] lg:h-full rounded-xl shadow-lg border-[1px] border-[#E1E8F0]">
          <div className="w-24 h-24 absolute top-0 -mt-12">
            <Image
              src={RandoHex}
              alt="RandoHex"
              className="w-full h-full object-center object-cover"
            />
          </div>
          <p>
            Yarapay is a multi-chain web3 solution, increasing the accessibility
            would foster mass adoption of crypto.
          </p>
        </div>
      </div>
    </div>
  );
}

export default WhyUs
