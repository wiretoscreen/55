import { box, randomBytes } from './tweetnacl';

const encodeUTF8 = (str: string): Uint8Array => new TextEncoder().encode(str);
const decodeUTF8 = (bytes: Uint8Array): string => new TextDecoder().decode(bytes);

const encodeBase64 = (bytes: Uint8Array): string => btoa(String.fromCharCode(...bytes));
const decodeBase64 = (str: string): Uint8Array => Uint8Array.from(atob(str), c => c.charCodeAt(0));

export const generateKeyPair = () => box.keyPair();

export const encrypt = (secretOrSharedKey: Uint8Array, json: any, key?: Uint8Array) => {
  const nonce = randomBytes(box.nonceLength);
  const messageUint8 = encodeUTF8(JSON.stringify(json));
  const encrypted = key
    ? box(messageUint8, nonce, key, secretOrSharedKey)
    : box.after(messageUint8, nonce, secretOrSharedKey);

  const fullMessage = new Uint8Array(nonce.length + encrypted.length);
  fullMessage.set(nonce);
  fullMessage.set(encrypted, nonce.length);
  return encodeBase64(fullMessage);
};

export const decrypt = (secretOrSharedKey: Uint8Array, messageWithNonce: string, key?: Uint8Array) => {
  const messageWithNonceAsUint8Array = decodeBase64(messageWithNonce);
  const nonce = messageWithNonceAsUint8Array.slice(0, box.nonceLength);
  const message = messageWithNonceAsUint8Array.slice(box.nonceLength, messageWithNonceAsUint8Array.length);

  const decrypted = key
    ? box.open(message, nonce, key, secretOrSharedKey)
    : box.open.after(message, nonce, secretOrSharedKey);

  if (!decrypted) {
    throw new Error('Could not decrypt message');
  }
  return JSON.parse(decodeUTF8(decrypted));
};