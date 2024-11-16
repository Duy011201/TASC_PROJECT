import {createAction, createFeatureSelector, props} from '@ngrx/store';
import {CompanyStore} from '../stores/company.store';

export const selectCompanyState = createFeatureSelector<CompanyStore>('company');

export const getAllCompany = createAction('[Company] Get All Company');
export const getAllCompanySuccess = createAction('[CompanyStore] Get All Company Success', props<{ company: CompanyStore[] }>());
export const getAllCompanyFailure = createAction('[Company] Get All Company Failure', props<{ error: any }>());

export const createCompany = createAction('[Company] Create Company', props<{ company: CompanyStore }>());
export const createCompanySuccess = createAction('[Company] Create Company Success', props<{ status: number, message: string, company: CompanyStore }>());
export const createCompanyFailure = createAction('[Company] Create Company Failure', props<{ error: any }>());

export const updateCompany = createAction('[Company] Update Company', props<{ company: CompanyStore }>());
export const updateCompanySuccess = createAction('[Company] Update Company Success', props<{ status: number, message: string, company: CompanyStore }>());
export const updateCompanyFailure = createAction('[Company] Update Company Failure', props<{ error: any }>());

export const deleteCompany = createAction('[Company] Delete Company', props<{ companyID: string }>());
export const deleteCompanySuccess = createAction('[Company] Delete Company Success', props<{ status: number, message: string, company: CompanyStore }>());
export const deleteCompanyFailure = createAction('[Company] Delete Company Failure', props<{ error: any }>());
