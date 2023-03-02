import { createReadStream, createWriteStream } from "fs";
import { scrypt, createDecipheriv } from "crypto";
import { dirname, basename, extname } from "path";

const decryptFile = async (path: string, key: string) => {
  try {
    const algorithm = "aes-256-cbc";
    const initVector = new Uint8Array(16);
    scrypt(key, "salt", 32, (err, generatedKey) => {
      if (err) {
        throw err;
      }
      const decipher = createDecipheriv(algorithm, generatedKey, initVector);
      const decrypted = createWriteStream(
        dirname(path) +
          "/" +
          basename(path, extname(path)) +
          "_decrypted" +
          extname(path)
      );
      const encrypted = createReadStream(path);
      encrypted.pipe(decipher).pipe(decrypted);
    });
  } catch (err) {
    console.log(err);
  }
};

export default decryptFile;

decryptFile("/home/siavash/myimage_encrypted.jpg", "key");
