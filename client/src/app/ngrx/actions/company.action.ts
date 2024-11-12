import {createAction, createFeatureSelector, props} from '@ngrx/store';
import {CompanyStore} from '../stores/company.store';

export const selectCompanyStoreState = createFeatureSelector<CompanyStore>('company');

export const getAllCompanyStore = createAction('[CompanyStore] Get All CompanyStores');
export const getAllCompanyStoresSuccess = createAction('[CompanyStore] Get All CompanyStores Success', props<{ company: CompanyStore[] }>());
export const getAllCompanyStoreFailure = createAction('[CompanyStore] Get All CompanyStores Failure', props<{ error: string }>());

export const createCompanyStore = createAction('[CompanyStore] Create CompanyStore', props<{ company: CompanyStore }>());
export const createCompanyStoreSuccess = createAction('[CompanyStore] Create CompanyStore Success', props<{ company: CompanyStore }>());
export const createCompanyStoreFailure = createAction('[CompanyStore] Create CompanyStore Failure', props<{ error: string }>());

export const updateCompanyStore = createAction('[CompanyStore] Update CompanyStore', props<{ company: CompanyStore }>());
export const updateCompanyStoreSuccess = createAction('[CompanyStore] Update CompanyStore Success', props<{ company: CompanyStore }>());
export const updateCompanyStoreFailure = createAction('[CompanyStore] Update CompanyStore Failure', props<{ error: string }>());

export const deleteCompanyStore = createAction('[CompanyStore] Delete CompanyStore', props<{ companyID: string }>());
export const deleteCompanyStoreSuccess = createAction('[CompanyStore] Delete CompanyStore Success', props<{ companyID: string }>());
export const deleteCompanyStoreFailure = createAction('[CompanyStore] Delete CompanyStore Failure', props<{ error: string }>());
