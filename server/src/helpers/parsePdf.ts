import pdfParse from 'pdf-parse';

const extractTextFromPdf = async (
  pdfFile: Buffer | null
): Promise<string | null> => {
  if (!pdfFile) return null;
  const data = await pdfParse(pdfFile);
  return data.text;
};

export default extractTextFromPdf;
