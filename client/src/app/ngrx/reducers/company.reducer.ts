import { createReducer, on } from '@ngrx/store';
import {
  getAllCompany, getAllCompanySuccess, getAllCompanyFailure,
  createCompany, createCompanySuccess, createCompanyFailure,
  updateCompany, updateCompanySuccess, updateCompanyFailure,
  deleteCompany, deleteCompanySuccess, deleteCompanyFailure
} from '../actions/company.action';
import { companyState } from '../stores/company.store';

export const initialState: companyState = {
  company: null,
  loading: false,
  error: null
};

export const userReducer = createReducer(
  initialState,
  // Get All Users
  on(getAllCompany, state => ({ ...state, loading: true })),
  on(getAllCompanySuccess, (state, { company }) => ({ ...state, loading: false, company: company })),
  on(getAllCompanyFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Create Company
  on(createCompany, state => ({ ...state, loading: true })),
  on(createCompanySuccess, (state, { user }) => ({ ...state, loading: false, company: [...state.company, company] })),
  on(createCompanyFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Update Company
  on(updateCompany, state => ({ ...state, loading: true })),
  on(updateCompanySuccess, (state, { user }) => ({
    ...state, loading: false, user: state.user?.map(u => u.userID === user.userID ? user : u)
  })),
  on(updateCompanyFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Delete Company
  on(deleteCompany, state => ({ ...state, loading: true })),
  on(deleteCompanySuccess, (state, { }) => ({ ...state, loading: false, company: company })),
  on(deleteCompanyFailure, (state, { error }) => ({ ...state, loading: false, error })),
);
