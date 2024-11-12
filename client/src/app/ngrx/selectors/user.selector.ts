import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from '../stores/user.store';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(selectUserState, (state: UserState) => state.user);

export const selectAllUser = createSelector(selectUserState, (state: UserState) => state.user);
export const selectUserLoading = createSelector(selectUserState, (state: UserState) => state.loading);
export const selectUserError = createSelector(selectUserState, (state: UserState) => state.error);

export const selectCreateUser = createSelector(selectUserState, (state: UserState) => state.user);
export const selectCreateUserLoading = createSelector(selectUserState, (state: UserState) => state.loading);
export const selectCreateUserError = createSelector(selectUserState, (state: UserState) => state.error);

export const selectUpdateUser = createSelector(selectUserState, (state: UserState) => state.user);
export const selectUpdateLoading = createSelector(selectUserState, (state: UserState) => state.loading);
export const selectUpdateError = createSelector(selectUserState, (state: UserState) => state.error);

export const selectDeleteUser = createSelector(selectUserState, (state: UserState) => state.user);
export const selectDeleteLoading = createSelector(selectUserState, (state: UserState) => state.loading);
export const selectDeleteError = createSelector(selectUserState, (state: UserState) => state.error);

export const selectSignup = createSelector(selectUserState, (state: UserState) => state.user);
export const selectSignupLoading = createSelector(selectUserState, (state: UserState) => state.loading);
export const selectSignupError = createSelector(selectUserState, (state: UserState) => state.error);

export const selectLogin = createSelector(selectUserState, (state: UserState) => state.user);
export const selectLoginLoading = createSelector(selectUserState, (state: UserState) => state.loading);
export const selectLoginError = createSelector(selectUserState, (state: UserState) => state.error);
