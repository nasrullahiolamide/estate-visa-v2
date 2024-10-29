export type ProfileData = {
  id: string;
  roles: Array<{ name: string }>;
  email?: string;
  firstname?: string;
  lastname?: string;
  fullname?: string;
  username?: string;
  picture?: string;
  password?: string;
  phone?: string;
  estateId?: string;
  houseId?: string;
};
