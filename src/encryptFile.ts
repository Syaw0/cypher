import { createReadStream, createWriteStream } from "fs";
import { scrypt, createCipheriv } from "crypto";
import { dirname, basename, extname } from "path";

const encryptFile = async (path: string, key: string) => {
  try {
    const algorithm = "aes-256-cbc";
    const initVector = new Uint8Array(16);
    scrypt(key, "salt", 32, (err, generatedKey) => {
      if (err) {
        throw err;
      }
      const file = createReadStream(path);
      const encrypt = createCipheriv(algorithm, generatedKey, initVector);

      const encryptedFile = createWriteStream(
        dirname(path) +
          "/" +
          basename(path, extname(path)) +
          "_encrypted" +
          extname(path)
      );
      file.pipe(encrypt).pipe(encryptedFile);
    });
  } catch (err) {
    console.log(err);
  }
};

export default encryptFile;

encryptFile("/home/siavash/myimage.jpg", "key");
