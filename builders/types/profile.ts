export type ProfileData = {
  first_name?: string;
  last_name?: string;
  username?: string;
  full_name?: string;
  email?: string;
  phone_number?: string;
  user_type?: string;
  location?: string;
  image?: string;
  password?: string;
  confirm_password: string;
  user: {
    id: string;
    roles: Array<{ name: string }>;
    email: string;
    firstname: string;
    lastname: string;
    username: string;
    picture: string | null;
    password: string;
  };
};
