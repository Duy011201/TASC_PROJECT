import { createReducer, on } from '@ngrx/store';
import {
  getAllUser, getAllUserSuccess, getAllUserFailure,
  createUser, createUserSuccess, createUserFailure,
  updateUser, updateUserSuccess, updateUserFailure,
  deleteUser, deleteUserSuccess, deleteUserFailure,
  signup, signupSuccess, signupFailure,
  login, loginSuccess, loginFailure
} from '../actions/user.action';
import { UserState } from '../stores/user.store';

export const initialState: UserState = {
  user: [],
  loading: false,
  error: null
};

export const userReducer = createReducer(
  initialState,
  // Get All Users
  on(getAllUser, state => ({ ...state, loading: true })),
  on(getAllUserSuccess, (state, { data }) => ({ ...state, loading: false, data: data })),
  on(getAllUserFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Create User
  on(createUser, state => ({ ...state, loading: true })),
  on(createUserSuccess, (state, { data }) => ({ ...state, loading: false, data: data })),
  on(createUserFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // // Update User
  // on(updateUser, state => ({ ...state, loading: true })),
  // on(updateUserSuccess, (state, { user }) => ({
  //   ...state, loading: false, user: state.user?.map(u => u.userID === user.userID ? user : u)
  // })),
  // on(updateUserFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Delete User
  // on(deleteUser, state => ({ ...state, loading: true })),
  // on(deleteUserSuccess, (state, { }) => ({ ...state, loading: false, })),
  // on(deleteUserFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Login
  on(login, state => ({ ...state, loading: true, error: null })),
  on(loginSuccess, (state, data) => ({...state, data, loading: false, error: null})),
  on(loginFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Signup
  on(signup, state => ({ ...state, loading: true, error: null })),
  on(signupSuccess, (state,) => ({...state, loading: false, error: null})),
  on(signupFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
