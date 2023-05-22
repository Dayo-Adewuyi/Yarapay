import Link from "next/link";
import React from "react";
import { Logo } from "../../public";
import Image from "next/image";
import {
  ChartBarIcon,
  HomeIcon,
  MegaphoneIcon,
  PhoneIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

interface Props {}

function DashboardPage(props: Props) {
  const {} = props;

  return (
    <div className="flex">
      <LeftSidebar />
      <RightSidebar />
      <div className="flex ml-48  w-3/5 flex-col gap-3">
        <div className="w-screen border-b-2 my-9">-</div>
        <div className="w-full">
          <h1>My Dashboard</h1>
          <section className="bg-blue-50 p-4 border rounded-sm">
            <div className="flex justify-between">
              <p>Estimated Balance</p>
              <p>Transaction History</p>
            </div>
            <div className="flex justify-between gap-2 my-3">
              <div className="flex flex-col justify-center">
                <p>
                  <strong className="text-xl">$2,450.60 </strong>
                  <small className="p-1 rounded bg-blue-200">+0.03</small>
                </p>

                <small>Tap the eye icon to hide your assets.</small>
              </div>
              <div className="flex gap-2 justify-between ">
                <button>Send</button>
                <button>Receive</button>
              </div>
            </div>
          </section>
        </div>
        <div className="w-full">
          <h1>Services</h1>
          <section className="flex flex-wrap gap-4">
            {
                [1,2,3,4,5,6, 7,8].map((item, index) => <p key={index} className="p-6 flex flex-col items-center justify-center  border-blue-200 border w-48 h-32 bg-blue-100 rounded text-center">
                <PhoneIcon className="w-8" />
                Airtime
              </p>)
            }
          </section>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;

const RightSidebar = () => {
  return (
    <div className="fixed flex bg-white flex-col gap-2 right-0 h-full border-l-2 p-2">
      <div className="flex items-center justify-between gap-2 bg-gray-50 w-full p-2 rounded-t-lg border-b-2">
        <div className="flex">
            <div className="flex overflow-hidden rounded-full border">

          <Image
            className="object-fit center rounded-full "
            src={"./vercel.svg"}
            width={40}
            height={40}
            alt="avatar"
          />
            </div>
          <div className="ml-2">
            <p>Jude</p>
            <small>Wallet Addres</small>
          </div>
        </div>

        <small className="p-1 rounded-lg bg-blue-100">Tags</small>
      </div>
      <div className="my-2">
        <h1 className="text-lg font-bold">History</h1>
        <table
          align="left"
          className="border rounded overflow-hidden  w-fit bg-gray-100 p-2"
        >
          <thead className="border">
            <th className="border p-2">Amount</th>
            <th className="border p-2">Token</th>
            <th className="border p-2">Time</th>
          </thead>
          <tbody>
            {[1, 2, 3, 4].map((item, index) => (
              <Row key={index} />
            ))}
          </tbody>
        </table>
      </div>
      <hr className="my-4" />
      <div className="my-2">
        <h1 className="text-lg font-bold">Market</h1>
        <table
          align="left"
          className="border rounded overflow-hidden  w-fit bg-gray-100 p-2"
        >
          <thead className="">
            <th className="border p-2">Amount</th>
            <th className="border">Token</th>
            <th className="border">Time</th>
          </thead>
          <tbody>
            {[1, 2, 3, 4].map((item, index) => (
              <Row key={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const LeftSidebar = () => {
  return (
    <div className="fixed w-1/8 bg-white h-full left-0 flex flex-col p-2 border-r-2">
      <Image
        src={"./yarapay-logo.svg"}
        alt="Yara pay logo"
        width={150}
        height={100}
        className="border-b-2 p-2"
      />
      <div className="flex flex-col w-full mt-4 gap-3">
        <p className="bg-blue-100 border rounded border-blue-200 flex gap-2 p-2 uppercase">
          <HomeIcon className="w-4" />
          Home
        </p>
        <p className="  flex gap-2 p-2 uppercase">
          <ChartBarIcon className="w-4" />
          Portfolio
        </p>
        <p className="  flex gap-2 p-2 uppercase">
          <UserIcon className="w-4" />
          Account
        </p>
      </div>
    </div>
  );
};
function Row() {
  return (
    <tr className="">
      <td className=" p-2">
        <div className="flex  items-center gap-2">
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.0002 13.0001C26.0002 20.18 20.1801 26.0001 13.0002 26.0001C5.8206 26.0001 0.000244141 20.18 0.000244141 13.0001C0.000244141 5.82032 5.8206 9.15527e-05 13.0002 9.15527e-05C20.1801 9.15527e-05 26.0002 5.82032 26.0002 13.0001Z"
              fill="#1BA27A"
            />
            <path
              d="M19.1014 6.55547H6.79169V9.52727H11.4606V13.8953H14.4324V9.52727H19.1014V6.55547Z"
              fill="white"
            />
            <path
              d="M12.9752 14.3606C9.11286 14.3606 5.98155 13.7494 5.98155 12.9952C5.98155 12.2412 9.11273 11.6299 12.9752 11.6299C16.8375 11.6299 19.9686 12.2412 19.9686 12.9952C19.9686 13.7494 16.8375 14.3606 12.9752 14.3606ZM20.8278 13.2229C20.8278 12.2505 17.3121 11.4623 12.9752 11.4623C8.63836 11.4623 5.12238 12.2505 5.12238 13.2229C5.12238 14.0792 7.8486 14.7926 11.4612 14.9507V21.2211H14.4327V14.9532C18.0731 14.8 20.8278 14.0836 20.8278 13.2229Z"
              fill="white"
            />
          </svg>
          <small className="bg-green-200 text-xs p-1 rounded whitespace-nowrap font-semibold">
            +200 USDT
          </small>
        </div>
      </td>
      <td className="p-2">
        <small className="whitespace-nowrap">Frank Edward</small>
      </td>
      <td className="p-2">
        <small className="whitespace-nowrap">12:00</small>
      </td>
    </tr>
  );
}
