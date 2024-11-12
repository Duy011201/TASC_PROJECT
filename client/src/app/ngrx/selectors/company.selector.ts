import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CompanyState } from '../stores/company.store';

export const selectCompanyState = createFeatureSelector<CompanyState>('company');

export const selectCompany = createSelector(selectCompanyState, (state: CompanyState) => state.company);

export const selectAllCompany = createSelector(selectCompanyState, (state: CompanyState) => state.company);
export const selectCompanyLoading = createSelector(selectCompanyState, (state: CompanyState) => state.loading);
export const selectCompanyError = createSelector(selectCompanyState, (state: CompanyState) => state.error);

export const selectCreateCompany = createSelector(selectCompanyState, (state: CompanyState) => state.company);
export const selectCreateCompanyLoading = createSelector(selectCompanyState, (state: CompanyState) => state.loading);
export const selectCreateCompanyError = createSelector(selectCompanyState, (state: CompanyState) => state.error);

export const selectUpdateCompany = createSelector(selectCompanyState, (state: CompanyState) => state.company);
export const selectUpdateLoading = createSelector(selectCompanyState, (state: CompanyState) => state.loading);
export const selectUpdateError = createSelector(selectCompanyState, (state: CompanyState) => state.error);

export const selectDeleteCompany = createSelector(selectCompanyState, (state: CompanyState) => state.company);
export const selectDeleteLoading = createSelector(selectCompanyState, (state: CompanyState) => state.loading);
export const selectDeleteError = createSelector(selectCompanyState, (state: CompanyState) => state.error);

export const selectSignup = createSelector(selectCompanyState, (state: CompanyState) => state.company);
export const selectSignupLoading = createSelector(selectCompanyState, (state: CompanyState) => state.loading);
export const selectSignupError = createSelector(selectCompanyState, (state: CompanyState) => state.error);

export const selectLogin = createSelector(selectCompanyState, (state: CompanyState) => state.company);
export const selectLoginLoading = createSelector(selectCompanyState, (state: CompanyState) => state.loading);
export const selectLoginError = createSelector(selectCompanyState, (state: CompanyState) => state.error);
