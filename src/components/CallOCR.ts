type OCRResult = {
  processedAmount: string;
  processedSender: string;
  processedRecipient: string;
};

export async function uploadReceipt(
  file: File
): Promise<OCRResult> {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch("/api/transactions/ocr", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message ?? "OCR failed");
  }

  return res.json();
}