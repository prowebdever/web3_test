import { Keyring } from '@polkadot/keyring';
import { mnemonicGenerate ,mnemonicValidate } from '@polkadot/util-crypto';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { setValue } from './LocalStorage';

export const generateWalletFromMnemonic = (mnemonic: string) => {
    const keyring = new Keyring();
    const pair = keyring.addFromMnemonic(mnemonic);

    const address = pair.address;
    const publicKey = pair.publicKey;

    return address;
};

export const generateMnemonic = () => {
    const mnemonic = mnemonicGenerate();

    return mnemonic.split(" ");
};

export const validateSeed = (seedPhrase: string) => {
  try {
    // Validate the seed phrase using the Polkadot utility function
    const isValid = mnemonicValidate(seedPhrase);

    return isValid;
  } catch (error) {
    console.error('Error checking seed validity:', error);
    return false;
  }
};

export const validAddress = (address: string) => {
  if(!address || address.length !== 48 || !address.startsWith('5')) {
    return false;
  }

  return true;
}

export const checkPasswordStrength = (password: string) => {
  // Define the regular expressions for different password criteria
  const regex = {
      lowercase: /[a-z]/,
      uppercase: /[A-Z]/,
      number: /[0-9]/,
      specialChar: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/
    };
  
    // Define the criteria and their corresponding weights
    const criteria = [
      { name: 'lowercase', weight: 1 },
      { name: 'uppercase', weight: 1 },
      { name: 'number', weight: 1 },
      { name: 'specialChar', weight: 1 },
      { name: 'length', weight: 5 }
    ];
  
    let strength = 0;
  
    // Check each criteria against the password
    criteria.forEach(criterion => {
      if (criterion.name === 'length') {
        if (password.length >= 8) {
          strength += criterion.weight;
        }
      } else {
        if (regex[criterion.name].test(password)) {
          strength += criterion.weight;
        }
      }
    });
  
    return strength;
}
