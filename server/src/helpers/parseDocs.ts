import { extractRawText } from 'mammoth';

const extractTextFromDocs = async (
  docFile: Buffer | null
): Promise<string | null> => {
  if (!docFile) return null;
  const result = await extractRawText({
    buffer: docFile,
  });
  return result.value;
};

export default extractTextFromDocs;
