interface ISignUp {
  email: string;
  password: string;
  username: string;
}

interface ISignin {
  email: string;
  password: string;
}

interface ICreatePin {
  pin: string;
  confirmPin: string;
}

interface IReceiveMoneyFromWallet {
    chain: string;
    amount: string;
}

interface IReceiveMoneyFromCard {
    keyId: string;
    amount: string;
    encryptedData: string;
    email?: string;
    phoneNumber?: string;
    sessionId?: string;
    ipAddress?: string;
}

interface IReceiveMoneyFromBank {
    transactionId: string;
    amount: string;
}

interface ISendToYaraWallet {
    beneficiary: string;
    transactionAmount: string;
    pin: string;
}

interface ISendToBankAccount {
    beneficiary: string;
    transactionAmount: string;
    name: string;
    bankCode: string;
}

 interface ISendToWalletAddress {
    beneficiary: string;
    transactionAmount: string;
    pin: string;
    chain: string;
}

export type {
    ISignUp,
    ISignin,
    ICreatePin,
    IReceiveMoneyFromWallet,
    IReceiveMoneyFromCard,
    IReceiveMoneyFromBank,
    ISendToYaraWallet,
    ISendToBankAccount,
    ISendToWalletAddress
}