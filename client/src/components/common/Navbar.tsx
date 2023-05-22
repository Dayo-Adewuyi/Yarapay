import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import { Logo } from "../../../public";
import Link from "next/link";

// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ')
// }

export default function Navbar() {
  return (
    <Popover className="relative bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between py-8 md:space-x-10">
          <div className="flex">
            <Link href="/">
              <span className="sr-only">Your Company</span>
              <Logo />
            </Link>
          </div>
          <Popover.Group
            as="nav"
            className="hidden space-x-10 md:flex items-center"
          >
            <Link
              href="/"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              ABOUT
            </Link>
            <Link
              href="/"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              LOGIN
            </Link>
            <Link href="/auth" className="btn-blue py-2 px-10">
              SIGN UP
            </Link>
          </Popover.Group>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-8 w-8 text-black" aria-hidden="true" />
            </Popover.Button>
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
        >
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 w-full">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <Link href="/">
                    <Logo />
                  </Link>
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6"></div>
            </div>
            <div className="space-y-6 py-6 px-5 w-full">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8 ">
                <Link
                  href="/"
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  ABOUT
                </Link>
                <Link
                  href="/"
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  LOGIN
                </Link>
              </div>
              <div className="w-full">
                <div className="flex items-center justify-center btn-blue py-2 px-10 w-full">
                  SIGN UP
                </div>
                <p className="mt-6 text-center text-base font-medium text-gray-500">
                  Existing customer?{" "}
                  <Link href="/" className="text-gray-700 hover:text-gray-800">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}


const Logo = () => (
  <svg
    className="h-8 w-auto"
    viewBox="0 0 556 109"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M29.7485 12.3311C25.0022 12.3311 20.4505 14.2165 17.0945 17.5726L0.900208 33.7667V41.1794C0.900208 46.4164 3.14975 51.128 6.73527 54.4006C3.14975 57.6732 0.900208 62.3847 0.900208 67.6218V75.0344L17.0945 91.2287C20.4505 94.5848 25.0022 96.4701 29.7485 96.4701C34.9855 96.4701 39.6971 94.2206 42.9697 90.6351C46.2423 94.2206 50.9539 96.4701 56.1909 96.4701C60.9372 96.4701 65.4889 94.5848 68.845 91.2287L85.0392 75.0344V67.6218C85.0392 62.3847 82.7897 57.6732 79.2041 54.4006C82.7897 51.128 85.0392 46.4164 85.0392 41.1794V33.7667L68.845 17.5726C65.4889 14.2165 60.9372 12.3311 56.1909 12.3311C50.9539 12.3311 46.2423 14.5806 42.9697 18.1661C39.6971 14.5806 34.9855 12.3311 29.7485 12.3311ZM55.0832 54.4006C54.8815 54.2165 54.6835 54.0274 54.4896 53.8335L42.9697 42.3136L31.4498 53.8335C31.2559 54.0274 31.0579 54.2165 30.8562 54.4006C31.0579 54.5846 31.2559 54.7737 31.4498 54.9677L42.9697 66.4876L54.4896 54.9677C54.6835 54.7737 54.8815 54.5846 55.0832 54.4006ZM47.644 75.0344V78.5746C47.644 83.2948 51.4707 87.1214 56.1909 87.1214C58.4576 87.1214 60.6315 86.2209 62.2344 84.6181L75.6905 71.1619V67.6218C75.6905 62.9016 71.8639 59.0749 67.1437 59.0749C64.877 59.0749 62.703 59.9754 61.1002 61.5783L47.644 75.0344ZM38.2954 75.0344L24.8392 61.5783C23.2364 59.9754 21.0625 59.0749 18.7958 59.0749C14.0755 59.0749 10.249 62.9016 10.249 67.6218V71.1619L23.705 84.6181C25.3079 86.2209 27.4818 87.1214 29.7485 87.1214C34.4687 87.1214 38.2954 83.2948 38.2954 78.5746V75.0344ZM38.2954 30.2266V33.7667L24.8392 47.2229C23.2364 48.8257 21.0625 49.7262 18.7958 49.7262C14.0755 49.7262 10.249 45.8996 10.249 41.1794V37.6392L23.705 24.1831C25.3079 22.5803 27.4818 21.6798 29.7485 21.6798C34.4687 21.6798 38.2954 25.5064 38.2954 30.2266ZM61.1002 47.2229L47.644 33.7667V30.2266C47.644 25.5064 51.4707 21.6798 56.1909 21.6798C58.4576 21.6798 60.6315 22.5803 62.2344 24.1831L75.6905 37.6392V41.1794C75.6905 45.8996 71.8639 49.7262 67.1437 49.7262C64.877 49.7262 62.703 48.8257 61.1002 47.2229Z"
      fill="#0B51FF"
    />
    <path
      d="M135.895 55.9739V85.55H127.724V55.9739L106.319 21.9569H115.911L131.632 47.8027H131.987L147.352 21.9569H156.944L135.895 55.9739ZM195.008 31.9933L184.616 60.6812H205.754L195.363 31.9933H195.008ZM175.645 85.55H166.586L190.567 21.9569H199.804L223.784 85.55H214.725L208.597 68.3195H181.863L175.645 85.55ZM253.624 29.7728V52.1548H266.769C270.085 52.1548 272.897 51.089 275.207 48.9574C277.516 46.7665 278.671 44.0724 278.671 40.875C278.671 37.9144 277.575 35.3387 275.384 33.1479C273.253 30.8979 270.559 29.7728 267.302 29.7728H253.624ZM253.624 85.55H245.453V21.9569H267.124C272.631 21.9569 277.309 23.7925 281.157 27.4636C285.065 31.0755 287.019 35.546 287.019 40.875C287.019 45.2566 285.569 49.1646 282.667 52.5989C279.825 55.9739 276.213 58.1351 271.832 59.0825L271.654 59.349L289.506 85.1948V85.55H279.825L262.683 59.7931H253.624V85.55ZM334.104 31.9933L323.712 60.6812H344.85L334.459 31.9933H334.104ZM314.741 85.55H305.682L329.663 21.9569H338.9L362.88 85.55H353.821L347.693 68.3195H320.959L314.741 85.55ZM392.72 59.7931V85.55H384.549V21.9569H406.22C411.727 21.9569 416.405 23.7925 420.253 27.4636C424.161 31.1347 426.115 35.6052 426.115 40.875C426.115 46.2632 424.161 50.7633 420.253 54.3752C416.464 57.9871 411.786 59.7931 406.22 59.7931H392.72ZM392.72 29.7728V51.9771H406.398C409.655 51.9771 412.349 50.8817 414.48 48.6909C416.671 46.5001 417.767 43.8948 417.767 40.875C417.767 37.9144 416.671 35.3387 414.48 33.1479C412.349 30.8979 409.655 29.7728 406.398 29.7728H392.72ZM465.74 31.9933L455.349 60.6812H476.487L466.096 31.9933H465.74ZM446.378 85.55H437.319L461.3 21.9569H470.536L494.517 85.55H485.458L479.329 68.3195H452.595L446.378 85.55ZM533.754 55.9739V85.55H525.583V55.9739L504.178 21.9569H513.77L529.491 47.8027H529.846L545.212 21.9569H554.804L533.754 55.9739Z"
      fill="black"
    />
  </svg>
);