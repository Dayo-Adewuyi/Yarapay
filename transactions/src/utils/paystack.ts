import axios from "axios";

export const verifyAccount = async (
  accountNumber: string,
  bankCode: string
) => {
  const { data } = await axios.get(
    `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,

    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_TEST_API_KEY}`,
      },
    }
  );

  return data;
};

export const getBanks = async () => {
  const { data } = await axios.get(
    "https://api.paystack.co/bank?currency=NGN",
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_TEST_API_KEY}`,
      },
    }
  );

  return data;
};

export const createTransfer = async (
  name: string,
  accountNumber: string,
  bankCode: string
) => {
  const createRecipient = await axios.post(
    "https://api.paystack.co/transferrecipient",

    {
      type: "nuban",
      name: name,
      account_number: accountNumber,
      bank_code: bankCode,
      currency: "NGN",
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_TEST_API_KEY}`,
      },
    }
  );

  const { data } = createRecipient;

  return data.recipient_code;
};

export const initiateTransfer = async (
  reference: string,
  amount: string,
  recipient: string
) => {
  const transfer = await axios.post(
    "https://api.paystack.co/transfer",
    {
      source: "balance",
      amount: amount,
      recipient: recipient,
      reference: reference,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_TEST_API_KEY}`,
      },
    }
  );

  const { data } = transfer;

  
  return data.status;
};
