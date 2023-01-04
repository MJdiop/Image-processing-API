import * as sharp from "sharp";

export const resizeImage = async (
  file: string,
  width: number | null,
  height: number | null,
  outPut: string
): Promise<sharp.OutputInfo> => {
  try {
    const result = await sharp(file).resize(width, height).jpeg({ quality: 80 }).toFile(outPut);
    return result;
  } catch (error) {
    throw new Error("error " + error);
  }
};
