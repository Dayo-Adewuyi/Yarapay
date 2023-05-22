import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  InformationCircleIcon,
  QrCodeIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import { XMarkIcon, PhoneIcon } from "@heroicons/react/24/solid";


interface Props {
  isOpen: boolean;
  closeModal: () => void;
  setSendType: (type: string) => void;
}

const SendFunds = ({ isOpen, closeModal, setSendType }: Props) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[#E5E7EF] bg-opacity-30 backdrop-blur" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto sat-norm">
            <div className="flex min-h-full items-center justify-center p-4 text-center gap-8">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full flex flex-col gap-2 min-h-[600px]  max-w-lg transform overflow-hidden rounded-2xl bg-white px-6 py-6 lg:py-10 text-left align-middle shadow-xl transition-all">
                  <div className="w-full flex items-center justify-between">
                    <Dialog.Title
                      as="h3"
                      className="text-lg lg:text-2xl font-medium leading-6 text-yara-blue"
                    >
                      Send Funds
                    </Dialog.Title>
                    <button
                      type="button"
                      className="bg-white rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-yara-blue"
                      onClick={closeModal}
                    >
                      <XMarkIcon className="w-6 text-yara-blue" />
                    </button>
                  </div>
                  <div className="">
                    <p className="text-[#8E8F94] text-sm font-light">
                      Choose one of the four ways to send money on Yarapay
                    </p>
                  </div>
                  {/* CARDS */}
                  <div className="grid grid-cols-2 gap-4 mt-4 lg:mt-8">
                    {sendOptions.map((option, index) => (
                      <div
                        key={index}
                        onClick={() => setSendType(option.type)}
                        className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg border bg-[#F3F6FB] cursor-pointer hover:border-yara-blue"
                      >
                        <div className="w-16 h-16 flex items-center justify-center">
                          {option.icon}
                        </div>
                        <p className="text-sm font-medium text-[#8E8F94]">
                          {option.name}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto flex gap-2 items-center justify-center mx-auto">
                    <InformationCircleIcon className="w-6 text-yara-blue" />
                    <p className="text-[#8E8F94] text-sm font-light">
                      Which option should I use?
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SendFunds;

interface YaraProps {
  className?: string;
}
const YaraLogo = ({ className }: YaraProps) => (
  <svg
    width="71"
    height="70"
    viewBox="0 0 71 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M27.6452 8.74902C24.6186 8.74902 21.716 9.95133 19.5759 12.0915L9.24902 22.4183V27.1452C9.24902 30.4848 10.6835 33.4893 12.97 35.5762C10.6835 37.6631 9.24902 40.6676 9.24902 44.0071V48.7341L19.5759 59.0609C21.716 61.2011 24.6186 62.4033 27.6452 62.4033C30.9848 62.4033 33.9893 60.9689 36.0762 58.6824C38.1631 60.9689 41.1676 62.4033 44.5072 62.4033C47.5338 62.4033 50.4364 61.2011 52.5765 59.0609L62.9033 48.7341V44.0071C62.9033 40.6676 61.4689 37.6631 59.1824 35.5762C61.4689 33.4893 62.9033 30.4848 62.9033 27.1452V22.4183L52.5765 12.0915C50.4364 9.95133 47.5338 8.74902 44.5072 8.74902C41.1676 8.74902 38.1631 10.1835 36.0762 12.47C33.9893 10.1835 30.9848 8.74902 27.6452 8.74902ZM43.8008 35.5762C43.6722 35.4588 43.5459 35.3382 43.4223 35.2145L36.0762 27.8685L28.7301 35.2145C28.6064 35.3382 28.4802 35.4588 28.3516 35.5762C28.4802 35.6935 28.6064 35.8141 28.7301 35.9378L36.0762 43.2839L43.4223 35.9378C43.5459 35.8141 43.6722 35.6935 43.8008 35.5762ZM39.0569 48.7341V50.9916C39.0569 54.0016 41.4971 56.4418 44.5072 56.4418C45.9526 56.4418 47.3389 55.8676 48.361 54.8454L56.9418 46.2646V44.0071C56.9418 40.9971 54.5016 38.5569 51.4916 38.5569C50.0462 38.5569 48.6599 39.1312 47.6378 40.1533L39.0569 48.7341ZM33.0954 48.7341L24.5146 40.1533C23.4925 39.1312 22.1063 38.5569 20.6608 38.5569C17.6507 38.5569 15.2106 40.9971 15.2106 44.0071V46.2646L23.7914 54.8454C24.8135 55.8676 26.1998 56.4418 27.6452 56.4418C30.6552 56.4418 33.0954 54.0016 33.0954 50.9916V48.7341ZM33.0954 20.1608V22.4183L24.5146 30.9991C23.4925 32.0212 22.1063 32.5954 20.6608 32.5954C17.6507 32.5954 15.2106 30.1552 15.2106 27.1452V24.8877L23.7914 16.3069C24.8135 15.2848 26.1998 14.7106 27.6452 14.7106C30.6552 14.7106 33.0954 17.1507 33.0954 20.1608ZM47.6378 30.9991L39.0569 22.4183V20.1608C39.0569 17.1507 41.4971 14.7106 44.5072 14.7106C45.9526 14.7106 47.3389 15.2848 48.361 16.3069L56.9418 24.8877V27.1452C56.9418 30.1552 54.5016 32.5954 51.4916 32.5954C50.0462 32.5954 48.6599 32.0212 47.6378 30.9991Z"
      fill="#0B51FF"
    />
  </svg>
);

const sendOptions = [
  {
    name: "Send to YaraID",
    icon: <YaraLogo className="w-12 h-12 text-yara-blue bg-green-200" />,
    type: "yara-id",
  },
  {
    name: "Scan to Pay",
    icon: <QrCodeIcon className="w-12 h-12 text-yara-blue" />,
    type: "scan-to-pay",
  },
  {
    name: "Send to Address",
    icon: <WalletIcon className="w-12 h-12 text-yara-blue" />,
    type: "wallet-address",
  },
  {
    name: "Send to Phone",
    icon: <PhoneIcon className="w-12 h-12 text-yara-blue" />,
    type: "phone-number",
  },
];

{
  /* <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 20 20"
  fill="currentColor"
  className="w-5 h-5"
>
  <path
    fillRule="evenodd"
    d="M10 4.5c1.215 0 2.417.055 3.604.162a.68.68 0 01.615.597c.124 1.038.208 2.088.25 3.15l-1.689-1.69a.75.75 0 00-1.06 1.061l2.999 3a.75.75 0 001.06 0l3.001-3a.75.75 0 10-1.06-1.06l-1.748 1.747a41.31 41.31 0 00-.264-3.386 2.18 2.18 0 00-1.97-1.913 41.512 41.512 0 00-7.477 0 2.18 2.18 0 00-1.969 1.913 41.16 41.16 0 00-.16 1.61.75.75 0 101.495.12c.041-.52.093-1.038.154-1.552a.68.68 0 01.615-.597A40.012 40.012 0 0110 4.5zM5.281 9.22a.75.75 0 00-1.06 0l-3.001 3a.75.75 0 101.06 1.06l1.748-1.747c.042 1.141.13 2.27.264 3.386a2.18 2.18 0 001.97 1.913 41.533 41.533 0 007.477 0 2.18 2.18 0 001.969-1.913c.064-.534.117-1.071.16-1.61a.75.75 0 10-1.495-.12c-.041.52-.093 1.037-.154 1.552a.68.68 0 01-.615.597 40.013 40.013 0 01-7.208 0 .68.68 0 01-.615-.597 39.785 39.785 0 01-.25-3.15l1.689 1.69a.75.75 0 001.06-1.061l-2.999-3z"
    clipRule="evenodd"
  />
</svg>; */
}
