import QRCode from "qrcode";

export const generateQR = async (address: string, amount: string) => {
  const data = {
    address: address,
    amount: amount,
  };

  const stringifiedData = JSON.stringify(data);

  const qrCode = await QRCode.toDataURL(stringifiedData);

  return qrCode;
};
