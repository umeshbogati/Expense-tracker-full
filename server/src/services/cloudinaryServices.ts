import cloudinary from "../configurations/cloudinary";

export const uploadToCloudinary = async (
  file: Express.Multer.File,
  folderName: string
): Promise<string> => {
  try {
    const uploaded = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: folderName },
          (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(result);
          }
        )
        .end(file.buffer);
    });

    return uploaded.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error("Failed to upload file to Cloudinary");
  }
};