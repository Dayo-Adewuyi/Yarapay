import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Input from "@/components/common/Input";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  amount: string;
  IDorWalletAddress: string;
  password: string;
  setPasswordValue: (password: string) => void;
  handleNext: () => void;
}

const PasswordModal = ({
  isOpen,
  closeModal,
  amount,
  IDorWalletAddress,
  password,
  setPasswordValue,
  handleNext,
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
              yara      >
                      Send {amount} USDC.
                    </Dialog.Title>
                    <p className="text-[#8E8F94] pt-1 text-sm font-light">
                      To: {IDorWalletAddress}
                    </p>
                  </div>

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
                    Enter your password to proceed.
                  </p>
                </div>

                <div className="flex flex-col gap-4 my-10">
                  <Input
                    label="Password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPasswordValue(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="btn-blue py-3"
                  onClick={handleNext}
                >
                  Next
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PasswordModal;
