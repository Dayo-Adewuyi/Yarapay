import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Logo } from "../../../public";
import Image from "next/image";
import { ChartBarIcon, HomeIcon, UserIcon } from "@heroicons/react/24/outline";

const Sidebar = () => {
  return (
    <div className="bg-white h-full flex flex-col p-2 border-r-2">
      <div className="w-full h-20 px-6">
        <Image src={Logo} alt="Yara pay logo" className="w-full h-full object-contain" />
      </div>
      <div className="flex flex-col w-full mt-4 gap-8">
        {children.map((item, index) => (
          <div key={index}>
            <Navlink href={item.href}>{item.child}</Navlink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

interface Props {
  href: string;
  children: React.ReactNode;
}

const children = [
  {
    href: "/dashboard",
    child: (
      <div className="flex items-center gap-2 p-2 uppercase">
        <HomeIcon className="w-4 h-4" />
        <p>Home</p>
      </div>
    ),
  },
  {
    href: "/dashboard/portfolio",
    child: (
      <div className="flex items-center gap-2 p-2 uppercase">
        <ChartBarIcon className="w-4 h-4" />
        <p>Portfolio</p>
      </div>
    ),
  },
  {
    href: "/dashboard/account",
    child: (
      <div className="flex items-center gap-2 p-2 uppercase">
        <UserIcon className="w-4 h-4" />
        <p>Account</p>
      </div>
    ),
  },
];

const Navlink = ({ href, children }: Props) => {
  const router = useRouter();
  const [hyperlink, setHyperLink] = React.useState(href);
  const isActive = router.pathname === hyperlink;
  useEffect(() => {
    setHyperLink(href);
  }, [href]);

  return (
    <Link
      href={href}
      className={`flex gap-2 uppercase border ${
        isActive ? "bg-blue-100 rounded border-blue-200" : "border-transparent"
      }`}
    >
      {children}
    </Link>
  );
};
