export const getDownloadableUrl = (url: string) => {
  if (!url.includes("/upload/")) {
    console.error("Invalid Cloudinary URL");
    return url;
  }
  return url.replace("/upload/", "/upload/fl_attachment/");
};
