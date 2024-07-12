import { Schema, model } from 'mongoose';
import { TUser, TUserModel } from './interface.user';
import bcrypt from 'bcrypt';
import { config } from '../../config';

const userSchema = new Schema<TUser, TUserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    passwordChangeAt: {
      type: Date,
      default: new Date(),
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin', 'superAdmin'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistByCustomId = async function (id) {
  return await MUser.findOne({ id }).select('+password');
};
userSchema.statics.isPasswordMatch = async function (
  planPassword,
  hashPassword,
) {
  return await bcrypt.compare(planPassword, hashPassword);
};

userSchema.statics.isJWTTokenTimeChecker = function (
  tokenTime: number,
  passwordChangeTime: Date,
) {
  const passwordChangeTimeMinute =
    new Date(passwordChangeTime).getTime() / 1000;
  return passwordChangeTimeMinute > tokenTime;
};

export const MUser = model<TUser, TUserModel>('user', userSchema);
