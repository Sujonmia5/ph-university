import { config } from '../config';
import { MUser } from '../modules/user/model.user';

const superAdminData = {
  id: '0001',
  email: 'mdsujon673738@gmail.com',
  password: config.super_admin_password,
  needPasswordChange: false,
  role: 'superAdmin',
  status: 'in-progress',
};

const createSuperAdmin = async () => {
  const isSuperAdminExist = await MUser.findOne({ role: 'superAdmin' });
  if (!isSuperAdminExist) {
    await MUser.create(superAdminData);
  }
};

export default createSuperAdmin;
