import * as CryptoJS from 'crypto-js';

export class CryptoUtil {
  public static encrypto(password: string) {
    const encrypted = CryptoJS.SHA256(password);
    return encrypted.toString(CryptoJS.enc.Base64);
  }
}
