import React from "react";
import { HeroImg } from "../../../public";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="w-full h-[87vh] max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 px-6">
      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 lg:h-full mt-16 lg:-mt-6">
        <h1 className="text-4xl lg:text-6xl font-bold text-center lg:text-left text-slate-800">
          The future of your everyday finances
        </h1>
        <p className="text-center text-[#8E8F94] lg:text-left lg:text-lg mt-4">
          Web 3 just as you know it! Make Your Transactions Faster, Cheaper, and
          More Secure with Our App!"
        </p>

        {/* Sign up button */}
        <Button />
      </div>
      <div className="flex flex-col items-center lg:items-start w-full lg:w-1/2 lg:h-full">
        <Image src={HeroImg} alt="hero" />
      </div>
    </div>
  );
};

export default Hero;
export function Button({text = "SIGN UP"}) {
  return (
    <button className="lg:mr-auto btn-blue-big w-full lg:w-fit px-10 lg:px-20 my-4 lg:my-8">
      <Link href="/auth">{text}</Link>
    </button>
  );
}
