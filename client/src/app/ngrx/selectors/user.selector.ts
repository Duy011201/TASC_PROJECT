import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from '../stores/user.store';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(selectUserState, (state: UserState) => state.user);

export const selectAllUser = createSelector(selectUserState, (state: any) => state.data);
export const selectAllLoading = createSelector(selectUserState, (state: any) => state.loading);
export const selectAllError = createSelector(selectUserState, (state: UserState) => state.error);

export const selectCreateUser = createSelector(selectUserState, (state: any) => state.data);
export const selectCreateUserLoading = createSelector(selectUserState, (state: any) => state.loading);
export const selectCreateUserError = createSelector(selectUserState, (state: any) => state.error);

export const selectUpdateUser = createSelector(selectUserState, (state: any) => state.data);
export const selectUpdateLoading = createSelector(selectUserState, (state: any) => state.loading);
export const selectUpdateError = createSelector(selectUserState, (state: any) => state.error);

export const selectDeleteUser = createSelector(selectUserState, (state: any) => state.data);
export const selectDeleteLoading = createSelector(selectUserState, (state: any) => state.loading);
export const selectDeleteError = createSelector(selectUserState, (state: any) => state.error);

export const selectSignup = createSelector(selectUserState, (state: any) => state.data);
export const selectSignupLoading = createSelector(selectUserState, (state: any) => state.loading);
export const selectSignupError = createSelector(selectUserState, (state: any) => state.error);

export const selectLogin = createSelector(selectUserState, (state: any) => state.data);
export const selectLoginLoading = createSelector(selectUserState, (state: any) => state.loading);
export const selectLoginError = createSelector(selectUserState, (state: any) => state.error);
