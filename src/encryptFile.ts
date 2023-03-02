import { createReadStream, createWriteStream } from "fs";
import { randomBytes, scryptSync, createCipheriv } from "crypto";
const encryptFile = (path: string) => {
  try {
    const algorithm = "aes-256-cbc";
    const initVector = randomBytes(16);
    const Securitykey = scryptSync("key", "salt", 32);
    const cipher = createCipheriv(algorithm, Securitykey, initVector);
    let encryptedData: any;
    const readable = createReadStream(path);
    readable.on("data", (chunk) => {
      encryptedData = cipher.update(chunk.toString("hex"), "hex");
    });
    readable.on("end", () => {
      console.log(encryptedData.toString("hex"));
      const writable = createWriteStream(path);
      writable.write(encryptedData.toString("hex"));
    });
  } catch (err) {
    console.log(err);
  }
};

export default encryptFile;

encryptFile("/home/siavash/myimage.jpg");
