import CryptoJS from 'crypto-js';

export const shortAddress = (address: string) => {
  if(!address) return "";

  if (address.length <= 11) {
      return address;
    } else {
      var prefix = address.substring(0, 4);
      var sufix = address.substring(address.length - 4);
      return prefix +"..."+ sufix;
    }
}

export const shortBalance = (balance: number) => {
  const str = balance.toString();
  if(str.length < 8) {
    return str;
  } else {
    var prefix = str.substring(0, 3);
    var sufix = str.substring(str.length - 2);
    return prefix +"..."+ sufix;
  }
}

export const timestampToDate = ( timestamp ) => {
  const date = new Date(timestamp * 1000); // Multiply by 1000 to convert from seconds to milliseconds
  const month = date.toLocaleString('default', { month: 'short' }); // Get the abbreviated month name
  const day = date.getDate(); // Get the day of the month
  const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Get the time in 12-hour format

  return`${month}-${day}-${time}`
}

export const encryptString = (message, secretKey) => {
  const key = CryptoJS.enc.Hex.parse(secretKey);
  const encrypted = CryptoJS.AES.encrypt(message, key, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
};

export const decryptString = (encryptedMessage, secretKey) => {
  const key = CryptoJS.enc.Hex.parse(secretKey);
  const decrypted = CryptoJS.AES.decrypt(encryptedMessage, key, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  const decryptedMessage = decrypted.toString(CryptoJS.enc.Utf8);
  return decryptedMessage;
};