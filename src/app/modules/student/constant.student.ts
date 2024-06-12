import { TBloodGroups } from './interface.student';

export const bloodGroups: TBloodGroups[] = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
];
export const searchableFields = [
  'name.firstName',
  'name.middleName',
  'name.lastName',
  'email',
  'id',
];

export const excludesFields = ['searchTerm', 'sort', 'page', 'limit', 'fields'];
