import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export const config = {
  NODE_DEV: process.env.NODE_DEV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_password: process.env.DEFAULT_PASSWORD,
  super_admin_password: process.env.SUPER_ADMIN_PASSWORD,

  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,

  jwt_access_secret: process.env.JWT_ACCESS_SECRET,

  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,

  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,

  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,

  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_secret_key: process.env.CLOUDINARY_SECRET_key,
};
