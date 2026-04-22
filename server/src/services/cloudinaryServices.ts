import cloudinary from "../configurations/cloudinary";

export const uploadToCloudinary = async (file: Express.Multer.File): Promise<string> => {
  const result = await new Promise<any>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: "receipts" },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    ).end(file.buffer);
  });

  return result.secure_url;
};

export const deleteFromCloudinary = async (url: string): Promise<void> => {
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[^.]+$/);
  const publicId = match?.[1];
  if (publicId) {
    await cloudinary.uploader.destroy(publicId);
  }
};