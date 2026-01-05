import { createWorker, PSM, type Worker } from "tesseract.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

type ROI = {
  left: number;
  top: number;
  width: number;
  height: number;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imgPath = path.join(__dirname, '../image_test/BillPayment_test_6.jpg')

const metaData = await sharp(imgPath).metadata();
const imgWidth = metaData.width ?? 0;
const imgHeight = metaData.height ?? 0;

async function ocrROI(
  worker: Worker,
  imgPath: string,
  roi: ROI,
  psm: PSM
): Promise<string> {
  const buffer = await sharp(imgPath)
    .extract(roi)
    .grayscale()
    .linear(1.2, -10)
    .threshold(180)
    .toBuffer();

  await worker.setParameters({
    tessedit_ocr_engine_mode: 1,
    tessedit_pageseg_mode: psm,
  });

  const { data } = await worker.recognize(buffer);
  return data.text;
}

function getROIs(imgWidth: number, imgHeight: number) {
  if (imgHeight <= 1303 && imgWidth <= 990) {
    return {
      psm: PSM.SINGLE_BLOCK,
      amount: {
        left: 10,
        top: Math.floor(imgHeight * 0.30),
        width: imgWidth - 10,
        height: Math.floor(imgHeight * 0.08),
      },
      sender: {
        left: 10,
        top: Math.floor(imgHeight * 0.40),
        width: imgWidth - 10,
        height: Math.floor(imgHeight * 0.25),
      },
      recipient: {
        left: 10,
        top: Math.floor(imgHeight * 0.58),
        width: imgWidth - 10,
        height: Math.floor(imgHeight * 0.17),
      },
    };
  }

  return {
    psm: PSM.SINGLE_COLUMN,
    amount: {
      left: 10,
      top: Math.floor(imgHeight * 0.35),
      width: imgWidth - 10,
      height: Math.floor(imgHeight * 0.08),
    },
    sender: {
      left: 10,
      top: Math.floor(imgHeight * 0.45),
      width: imgWidth - 10,
      height: Math.floor(imgHeight * 0.11),
    },
    recipient: {
      left: 10,
      top: Math.floor(imgHeight * 0.60),
      width: imgWidth - 10,
      height: Math.floor(imgHeight * 0.15),
    },
  };
}

function collapseThai(text: string): string {
  return text
    .replace(
      /([\u0E00-\u0E7F])\s+(?=[\u0E00-\u0E7F])/g,
      "$1"
    )
    .replace(/\s{2,}/g, " ")
    .trim();
}

async function runOCR(imgPath: string):Promise<void> {

    console.log("image height :", imgHeight);
    console.log("image width :", imgWidth);

    const { psm, amount, sender, recipient } = getROIs(imgWidth, imgHeight);

    

    const worker = await createWorker(['eng', 'tha']);
    const transactionText = await ocrROI(worker, imgPath, amount, psm);
    const senderText = await ocrROI(worker, imgPath, sender, psm);
    const recipientText = await ocrROI(worker, imgPath, recipient, psm);
    
    // TEXT RECOGNITION OUTPUT
    console.log("HEADER OCR:");
    console.log(transactionText);
    console.log("\n\n")
    console.log("Sender OCR:");
    console.log(collapseThai(senderText));
    console.log("\n\n")
    console.log("Recipient OCR:");
    console.log(collapseThai(recipientText));

    await worker.terminate();
}

runOCR(imgPath).catch(console.error);
// Different parameters for distinct for m-banking receipt image size
