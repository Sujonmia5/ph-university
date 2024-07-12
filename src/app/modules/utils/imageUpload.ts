import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { config } from '../../config';
import { unlink } from 'node:fs';

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_secret_key, // Click 'View Credentials' below to copy your API secret
});

export const imageUploadToCloudinary = (
  imageName: string,
  path: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      {
        public_id: imageName,
      },
      function (error, result) {
        if (error) {
          reject(error);
        }
        resolve(result);

        unlink(path, (err) => {
          if (err) throw err;
        });
      },
    );
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });

// type Asset = {
//   asset_id: string;
//   public_id: string;
//   version: number;
//   version_id: string;
//   signature: string;
//   width: number;
//   height: number;
//   format: string;
//   resource_type: string;
//   created_at: string;
//   tags: string[];
//   bytes: number;
//   type: string;
//   etag: string;
//   placeholder: boolean;
//   url: string;
//   secure_url: string;
//   asset_folder: string;
//   display_name: string;
//   original_filename: string;
//   api_key: string;
// };
