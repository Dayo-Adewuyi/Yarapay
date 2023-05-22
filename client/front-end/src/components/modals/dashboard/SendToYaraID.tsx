import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Input from "@/components/common/Input";
import PasswordModal from "../common/PasswordModal";
import SendingModal from "../common/SendingModal";
import SentModal from "../common/SentModal";
import { useSendToYaraWalletMutation } from "@/controller/api";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  stepProp: number;
}

const SendToYaraID = ({ isOpen, closeModal, stepProp }: Props) => {
  const [step, setStep] = useState(stepProp);
  const [ID, setID] = useState("");
  const [value, setValue] = useState("");
  const [password, setPassword] = useState("");
  const [showSendingModal, setShowSendingModal] = useState(false);
  const [showSentModal, setShowSentModal] = useState(false);

  const setYaraID = (yaraID: string) => setID(yaraID);
  const setAmount = (amount: string) => setValue(amount);
  const setPasswordValue = (password: string) => setPassword(password);

  const [sendToYaraWallet] = useSendToYaraWalletMutation();

  const handleSendToYaraWallet = async () => {
    try {
      const response = await sendToYaraWallet({
        transactionAmount: value,
        beneficiary: ID,
        pin: password,
      }).unwrap();
      console.log("fulfilled", response);
    } catch (error) {
      console.log("rejected", error);
    }
  };

  const handleStep1Next = () => setStep(step + 1);

  return (
    <>
      {step === 1 && (
        <Step1
          isOpen={isOpen}
          closeModal={closeModal}
          yaraID={ID}
          setYaraID={setYaraID}
          amount={value}
          setAmount={setAmount}
          handleNext={handleStep1Next}
        />
      )}
      {step === 2 && (
        <PasswordModal
          isOpen={isOpen && step === 2}
          closeModal={() => {
            setStep(1);
            closeModal();
          }}
          amount={value}
          IDorWalletAddress={ID}
          password={password}
          setPasswordValue={setPasswordValue}
          handleNext={() => {
            setShowSendingModal(true);
            setTimeout(() => {
              setShowSendingModal(false);
              setShowSentModal(true);
            }, 5000);
          }}
        />
      )}
      {showSendingModal && (
        <SendingModal
          isOpen={showSendingModal}
          closeModal={() => {
            setShowSendingModal(false);
          }}
          amount={value}
          IDorWalletAddress={ID}
        />
      )}
      {showSentModal && (
        <SentModal
          isOpen={showSentModal}
          closeModal={() => {
            setShowSentModal(false);
            setStep(stepProp);
            closeModal();
          }}
          amount={value}
          IDorWalletAddress={ID}
        />
      )}
    </>
  );
};

export default SendToYaraID;

interface Step1Props {
  isOpen: boolean;
  closeModal: () => void;
  yaraID: string;
  setYaraID: (yaraID: string) => void;
  amount: string;
  setAmount: (amount: string) => void;
  handleNext: () => void;
}

const Step1 = ({
  isOpen,
  closeModal,
  yaraID,
  setYaraID,
  amount,
  setAmount,
  handleNext,
}: Step1Props) => (
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
                  Send to a Yarapay ID
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
                  Enter the unique 8-digit number of the recipient.
                </p>
              </div>

              <div className="flex flex-col gap-6 mt-8 w-full">
                <Input
                  label="Yarapay ID"
                  type="text"
                  placeholder="Enter Yarapay ID"
                  value={yaraID}
                  onChange={(e) => setYaraID(e.target.value)}
                />
                <div className="flex flex-col gap-2 w-full">
                  <label className="font-medium" htmlFor="currency">
                    Currency
                  </label>
                  <select className="w-full bg-[#F5F8FE] border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-0">
                    <option value="usd">USDC</option>
                  </select>
                </div>

                <div>
                  <div className="relative w-full">
                    <Input
                      label="Amount"
                      type="text"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    {/* Max */}
                    <div className="absolute top-1/2 right-4">
                      <button className="pt-1 focus:outline-none focus:ring-2 focus:ring-yara-blue text-yara-blue font-medium">
                        Max
                      </button>
                    </div>
                  </div>
                  <p className="text-[#8E8F94] text-xs pt-2 font-light">
                    Balance: 233 USDC
                  </p>
                </div>

                {/* Send button with amount if amount > 0 */}
                <button onClick={handleNext} className="btn-blue py-3">
                  Send {Number(amount) > 0 ? `${amount} USDC` : ""}
                </button>
              </div>

              <div className="mt-auto flex gap-2 items-center justify-center mx-auto">
                <InformationCircleIcon className="w-6 text-yara-blue" />
                <p className="text-[#8E8F94] text-sm font-light">
                  What is a Yarapay ID?
                </p>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
);
