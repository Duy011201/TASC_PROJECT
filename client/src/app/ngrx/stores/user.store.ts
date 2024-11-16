export interface UserStore {
  userID: String,
  companyID: String,
  role: String,
  username: String,
  email: String,
  password: String,
  phone: String,
  avatar: String,
  profile: String,
  status: String,
  createdAt: String,
  updatedAt: String,
  createdBy: String,
  updatedBy: String,
}

export interface UserState {
  user: UserStore | any;
  loading: boolean;
  error: string | null;
}
