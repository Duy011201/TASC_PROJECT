import {createAction, createFeatureSelector, props} from '@ngrx/store';
import { UserStore } from '../stores/user.store';

export const selectUserState = createFeatureSelector<UserStore>('user');

export const setUser = createAction('[User] Set user', props<{ data: UserStore, token: string, refreshToken: string }>());

export const getAllUser = createAction('[User] Get All Users');
export const getAllUserSuccess = createAction('[User] Get All Users Success', props<{ users: UserStore[] }>());
export const getAllUserFailure = createAction('[User] Get All Users Failure', props<{ error: any }>());

export const createUser = createAction('[User] Create User', props<{ user: UserStore }>());
export const createUserSuccess = createAction('[User] Create User Success', props<{ user: UserStore }>());
export const createUserFailure = createAction('[User] Create User Failure', props<{ error: any }>());

export const updateUser = createAction('[User] Update User', props<{ user: UserStore }>());
export const updateUserSuccess = createAction('[User] Update User Success', props<{ user: UserStore }>());
export const updateUserFailure = createAction('[User] Update User Failure', props<{ error: any }>());

export const deleteUser = createAction('[User] Delete User', props<{ userID: string }>());
export const deleteUserSuccess = createAction('[User] Delete User Success', props<{ userID: string }>());
export const deleteUserFailure = createAction('[User] Delete User Failure', props<{ error: any }>());

export const signup = createAction('[User] Signup', props<{ user: UserStore }>());
export const signupSuccess = createAction('[User] Signup Success', props<{ message: string, status: number, user: UserStore }>());
export const signupFailure = createAction('[User] Signup Failure', props<{ error: any }>());

export const login = createAction('[User] Login', props<{ email: string; password: string }>());
export const loginSuccess = createAction('[User] Login Success', props<{ status: number, message: string, data: UserStore; token: string, refreshToken: string }>());
export const loginFailure = createAction('[User] Login Failure', props<{ error: any }>());
