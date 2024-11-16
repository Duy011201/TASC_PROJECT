export interface CompanyStore {
  companyID: String,
  companyName: String;
  introduce: String;
  email: String;
  phone: String;
  province: String;
  address: String;
  field: String;
  avatar: String;
  scale: Number;
  corporateTaxCode: String;
  status: String,
  createdAt: String,
  updatedAt: String,
  createdBy: String,
  updatedBy: String,
}

export interface CompanyState {
  company: CompanyStore | any;
  loading: boolean;
  error: string | null;
}
