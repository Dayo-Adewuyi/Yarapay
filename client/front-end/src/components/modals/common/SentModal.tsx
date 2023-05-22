import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { SuccessTick } from "../../../../public";
import Image from "next/image";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  amount: string;
  IDorWalletAddress: string;
}

const SentModal = ({
  isOpen,
  closeModal,
  amount,
  IDorWalletAddress,
}: Props) => {
  return (
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
          <div className="flex mt-20 items-center justify-center p-4 text-center gap-8">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full flex flex-col gap-2 min-h-[300px] max-w-lg transform overflow-hidden rounded-2xl bg-white px-6 py-6 lg:py-10 text-left align-middle shadow-xl transition-all">
                <div className="w-full flex items-start justify-between">
                  <div>
                    <Dialog.Title
                      as="h3"
                      className="text-lg lg:text-xl font-medium leading-6 text-yara-blue"
                    >
                      Sent
                    </Dialog.Title>
                  </div>

                  <button
                    type="button"
                    className="bg-white rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-yara-blue"
                    onClick={closeModal}
                  >
                    <XMarkIcon className="w-6 text-yara-blue" />
                  </button>
                </div>
                <p className="text-[#8E8F94] pt-1 text-sm font-light max-w-[300px]">
                  Transaction successful
                </p>

                {/* Hour glass loader */}
                <div className="flex justify-center items-center py-4 lg:py-8">
                  <Image
                    src={SuccessTick}
                    alt="Success Tick"
                    className="rounded-full h-32 w-32"
                  />
                </div>

                {/* Amount and To, Side by side */}
                <div className="flex flex-col lg:flex-row gap-4 py-4 items-center justify-center">
                  <div className="flex flex-col gap-1">
                    <p className="text-lg lg:text-2xl font-semibold">
                      {amount} USDC
                    </p>
                  </div>
                  <div>to</div>
                  <div className="flex flex-col gap-1">
                    <p className="text-base font-medium text-yara-blue">
                      {IDorWalletAddress}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-blue py-3 mt-auto"
                  //   onClick={handleNext}
                >
                  VIEW RECEIPT
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SentModal;
