import {createReducer, on} from '@ngrx/store';
import {
  getAllCompany, getAllCompanySuccess, getAllCompanyFailure,
  createCompany, createCompanySuccess, createCompanyFailure,
  updateCompany, updateCompanySuccess, updateCompanyFailure,
  deleteCompany, deleteCompanySuccess, deleteCompanyFailure
} from '../actions/company.action';
import {CompanyState} from '../stores/company.store';

export const initialState: CompanyState = {
  company: [],
  loading: false,
  error: null
};

export const companyReducer = createReducer(
  initialState,

  // Get All Company
  on(getAllCompany, state => ({...state, loading: true})),
  on(getAllCompanySuccess, (state, {company}) => ({
    ...state,
    loading: false,
    company,
    error: null
  })),
  on(getAllCompanyFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error
  })),

  // Create Company
  on(createCompany, state => ({...state, loading: true})),
  on(createCompanySuccess, (state, {company}) => ({
    ...state,
    loading: false,
    company: [...state.company, company],
    error: null
  })),
  on(createCompanyFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error
  })),

  // Update Company
  on(updateCompany, state => ({...state, loading: true})),
  on(updateCompanySuccess, (state, {company}) => ({
    ...state,
    loading: false,
    company: state.company.map((c: { companyID: string; }) =>
      c.companyID === company.companyID ? company : c
    ),
    error: null
  })),
  on(updateCompanyFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error
  })),

  // Delete Company
  on(deleteCompany, state => ({...state, loading: true})),
  on(deleteCompanySuccess, (state, {company}) => ({
    ...state,
    loading: false,
    company: state.company.filter((c: { companyID: string }) =>
      c.companyID !== company.companyID ? company : c),
    error: null
  })),
  on(deleteCompanyFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error
  }))
);
