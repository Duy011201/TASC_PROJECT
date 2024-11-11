// user.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from '../reducer/user.reducer';

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectAllUsers = createSelector(selectUserState, (state) => state.users);
export const selectUsersLoading = createSelector(selectUserState, (state) => state.loading);
export const selectUsersError = createSelector(selectUserState, (state) => state.error);
