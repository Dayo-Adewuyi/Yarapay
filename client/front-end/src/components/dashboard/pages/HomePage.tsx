import React, { useState } from "react";
import {
  EyeIcon,
  ClockIcon,
  ArrowTopRightOnSquareIcon,
  ArrowDownTrayIcon,
  PhoneIcon,
  WifiIcon,
  BoltIcon,
  TvIcon,
  CalculatorIcon,
  AcademicCapIcon,
  BanknotesIcon,
  CircleStackIcon,
} from "@heroicons/react/24/outline";
import SendFunds from "@/components/modals/dashboard/SendFunds";
import SendToPhoneNumber from "@/components/modals/dashboard/SendToPhoneNumber";
import SendToWallet from "@/components/modals/dashboard/SendToWallet";
import SendToYaraID from "@/components/modals/dashboard/SendToYaraID";
import ScanToPay from "@/components/modals/dashboard/ScanToPay";
import { useGetBalanceQuery, useGetTransactionHistoryQuery } from "@/controller/api";
import { arch } from "os";

const DashboardHomePage = () => {
  type SendMethodTypes =
    | "yara-id"
    | "phone-number"
    | "scan-to-pay"
    | "wallet-address"
    | null;

  const [SendMethod, setSendMethod] = useState<SendMethodTypes>(null);
  const [showSendFundsModal, setShowSendFundsModal] = useState(false);
  const [showSendToPhoneNumberModal, setShowSendToPhoneNumberModal] =
    useState(false);
  const [showSendToWalletModal, setShowSendToWalletModal] = useState(false);
  const [showSendToYaraIDModal, setShowSendToYaraIDModal] = useState(false);
  const [showScanToPayModal, setShowScanToPayModal] = useState(false);

  const closeSendFundsModal = () => setShowSendFundsModal(false);
  const openSendFundsModal = () => setShowSendFundsModal(true);

  const closeSendToPhoneNumberModal = () =>
    setShowSendToPhoneNumberModal(false);
  const openSendToPhoneNumberModal = () => setShowSendToPhoneNumberModal(true);

  const closeSendToWalletModal = () => setShowSendToWalletModal(false);
  const openSendToWalletModal = () => setShowSendToWalletModal(true);

  const closeSendToYaraIDModal = () => setShowSendToYaraIDModal(false);
  const openSendToYaraIDModal = () => setShowSendToYaraIDModal(true);

  const closeScanToPayModal = () => setShowScanToPayModal(false);
  const openScanToPayModal = () => setShowScanToPayModal(true);

  const { data, isLoading, isError } = useGetBalanceQuery({});

  const handleSetSendMethod = (type: string | SendMethodTypes) => {
    closeSendFundsModal();
    setTimeout(() => {
      setSendMethod(type as SendMethodTypes);
      switch (type) {
        case "yara-id":
          setShowSendToYaraIDModal(true);
          break;
        case "phone-number":
          setShowSendToPhoneNumberModal(true);
          break;
        case "scan-to-pay":
          setShowScanToPayModal(true);
          break;
        case "wallet-address":
          setShowSendToWalletModal(true);
          break;
        default:
          break;
      }
    }, 500);
  };

  return (
    <>
      <SendFunds
        isOpen={showSendFundsModal}
        closeModal={closeSendFundsModal}
        setSendType={handleSetSendMethod}
      />
      {SendMethod === "yara-id" && (
        <SendToYaraID
          isOpen={showSendToYaraIDModal}
          closeModal={closeSendToYaraIDModal}
          stepProp={1}
        />
      )}
      {SendMethod === "phone-number" && <SendToPhoneNumber />}
      {SendMethod === "scan-to-pay" && <ScanToPay />}
      {SendMethod === "wallet-address" && (
        <SendToWallet
          isOpen={showSendToWalletModal}
          closeModal={closeSendToWalletModal}
          stepProp={1}
        />
      )}

      <div className="h-full flex flex-col lg:flex-row w-full">
        <div className="w-full lg:w-[70%] min-h-[500px] h-full pt-8 px-6 lg:px-16 border-r">
          <div className="w-full">
            <h1 className="text-xl lg:text-2xl pb-4">My Dashboard</h1>

            {/* Card  */}
            <section className="bg-blue-50 py-4 px-4 lg:px-8 border rounded-sm text-[#8E8F94]">
              <div className="flex flex-col lg:flex-row gap-4 justify-between pb-20">
                <div className="flex items-center gap-1">
                  <div className="bg-[#c5d5fd] p-1 rounded text-yara-blue cursor-pointer">
                    <EyeIcon className="w-4 h-4" />
                  </div>
                  <p>Estimated Balance</p>
                </div>

                <div className="flex items-center gap-1">
                  <div className="bg-[#c5d5fd] p-1 rounded text-yara-blue cursor-pointer">
                    <ClockIcon className="w-4 h-4" />
                  </div>
                  <p>Transaction history</p>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row justify-between gap-2 my-3">
                <div className="flex flex-col justify-center">
                  <div className="flex items-end gap-2 text-black">
                    <p className="relative">
                      <strong className="text-xl lg:text-4xl">
                        ${isError ? "0.00" : data?.balance}
                      </strong>
                      <small className="absolute p-1 -top-4 text-xs text-[#67870E] font-medium rounded bg-[#E1F9A4]">
                        +0.03%
                      </small>
                    </p>
                    <span className="">USDC</span>
                  </div>

                  {/* Tap the icon notifier */}
                  <div className="bg-[#ecf2fa] text-[#5c8bfd] rounded mt-2 px-4 py-1">
                    <small>Tap the eye icon to hide your assets.</small>
                  </div>
                </div>
                {/* Send and receive icons */}
                <div className="flex my-8 lg:my-0 gap-12 lg:justify-between ">
                  <div
                    onClick={openSendFundsModal}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <div className="bg-[#c5d5fd] p-1 rounded text-yara-blue">
                      <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                    </div>
                    <p>Send</p>
                  </div>

                  <div className="flex items-center gap-2 cursor-pointer">
                    <div className="bg-[#c5d5fd] p-1 rounded text-yara-blue">
                      <ArrowDownTrayIcon className="w-4 h-4" />
                    </div>
                    <p>Receive</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Services */}
            <div className="w-full mt-10 lg:mt-20">
              <h1 className="text-xl lg:text-2xl pb-4">Services</h1>
              <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-12 py-4 w-full">
                {serives.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center w-full gap-4 border border-transparent hover:border-slate-300 rounded-lg cursor-pointer py-4 px-2 bg-[#F3F6FB]"
                  >
                    <div className="bg-[#c5d5fd] p-2 rounded text-yara-blue">
                      {item.icon}
                    </div>
                    <p className="text-sm text-[#8E8F94]">{item.name}</p>
                  </div>
                ))}
              </section>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[30%] min-h-[500px] h-full px-4">
          <RightSidebar />
        </div>
      </div>
    </>
  );
};

export default DashboardHomePage;

const serives = [
  {
    name: "Mobile Topup",
    icon: <PhoneIcon className="w-6 h-6" />,
  },
  {
    name: "Internet",
    icon: <WifiIcon className="w-6 h-6" />,
  },
  {
    name: "Electricity",
    icon: <BoltIcon className="w-6 h-6" />,
  },
  {
    name: "Cable",
    icon: <TvIcon className="w-6 h-6" />,
  },
  {
    name: "Convert",
    icon: <CalculatorIcon className="w-6 h-6" />,
  },
  {
    name: "Education",
    icon: <AcademicCapIcon className="w-6 h-6" />,
  },
  {
    name: "Loan",
    icon: <BanknotesIcon className="w-6 h-6" />,
  },
  {
    name: "Staking",
    icon: <CircleStackIcon className="w-6 h-6" />,
  },
];

const RightSidebar = () => {
  const {data } = useGetTransactionHistoryQuery({});
    return (
    <div className="flex bg-white flex-col gap-2 right-0 h-full w-full">
      <div className="my-2 lg:pt-6">
        <h1 className="text-lg pb-2">History</h1>
        <table
          align="left"
          className="border rounded overflow-hidden  w-full bg-gray-100 p-2"
        >
          <thead className="border">
            <th className="border p-2">Amount</th>
            <th className="border p-2">Token</th>
            <th className="border p-2">Time</th>
          </thead>
          <tbody>
            {
              data ? data.map((_item: any, index: React.Key | null | undefined) => (
                <Row key={index} />
              )) : [1, 2, 3, 4].map((item, index) => (
                <Row key={index} />
              ))
            }
          </tbody>
        </table>
      </div>
      <hr className="my-4" />
      <div className="my-2">
        <h1 className="text-lg pb-2">Market</h1>
        <table
          align="left"
          className="border rounded overflow-hidden  w-full bg-gray-100 p-2"
        >
          <thead className="">
            <th className="border p-2">Token</th>
            <th className="border">Chart</th>
            <th className="border">Price</th>
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
