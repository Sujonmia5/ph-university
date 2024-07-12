import jwt from 'jsonwebtoken';
import AppError from '../../Error/appError';
import httpStatus from 'http-status';
import { MUser } from '../user/model.user';
import { TUser } from '../user/interface.user';
import nodemailer from 'nodemailer';

export const createToken = (
  jwtPayload: { id: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const userInfoChecker = async (id: string): Promise<TUser> => {
  const user = await MUser.isUserExistByCustomId(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'user is not founded');
  }
  if (user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is deleted');
  }

  if (user.status === 'blocked') {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is blocked');
  }
  return user;
};

export const forgetPasswordSendMail = async (resetLink: string, to: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'mdsujon673738@gmail.com',
      pass: 'zmjv fsvn gdok axtl',
    },
  });

  await transporter.sendMail({
    from: 'mdsujon673738@gmail.com', // sender address
    to, // list of receivers
    subject: 'Change your password within 10 minute', // Subject line
    text: 'Hello world?', // plain text body
    html: `${resetLink}
    </br>
    <a style="color: #3498db; text-decoration: none; font-weight: bold;"
       onmouseover="this.style.color='#2980b9'; this.style.textDecoration='underline';"
       onmouseout="this.style.color='#3498db'; this.style.textDecoration='none';"
       onmousedown="this.style.color='#2c3e50';"
       onmouseup="this.style.color='#2980b9';" href="${resetLink}">Reset</a>`,
  });
};
