import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../services/user.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  getAllUser, getAllUsersSuccess, getAllUserFailure,
  createUser, createUserSuccess, createUserFailure,
  updateUser, updateUserSuccess, updateUserFailure,
  deleteUser, deleteUserSuccess, deleteUserFailure,
  signup, signupSuccess, signupFailure,
  login, loginSuccess, loginFailure
} from '../actions/user.action';

@Injectable()
export class UserEffect {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store
  ) {}

  // Get All Users
  getAllUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllUser),
      mergeMap(() =>
        this.userService.getAllUser().pipe(
          map(users => getAllUsersSuccess({ users })),
          catchError(error => of(getAllUserFailure({ error: error.message })))
        )
      )
    )
  );

  // Create User
  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createUser),
      mergeMap(({ user }) =>
        this.userService.createUser(user).pipe(
          map(newUser => createUserSuccess({ user: newUser })),
          catchError(error => of(createUserFailure({ error: error.message })))
        )
      )
    )
  );

  // Update User
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      mergeMap(({ user }) =>
        this.userService.updateUser(user).pipe(
          map(updatedUser => updateUserSuccess({ user: updatedUser })),
          catchError(error => of(updateUserFailure({ error: error.message })))
        )
      )
    )
  );

  // Delete User
  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      mergeMap(({ userID }) =>
        this.userService.deleteUser(userID).pipe(
          map(() => deleteUserSuccess({ userID })),
          catchError(error => of(deleteUserFailure({ error: error.message })))
        )
      )
    )
  );

  // Signup
  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signup),
      mergeMap(({ data }) =>
        this.userService.signup(data).pipe(
          map(response => signupSuccess({
            message: response.message,
            status: response.status,
            data: response.data
          })),
          catchError(error => of(signupFailure( error )))
        )
      )
    )
  );

  // Login
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(({ email, password }) =>
        this.userService.login(email, password).pipe(
          map(response => loginSuccess({
            message: response.message,
            status: response.status,
            data: response.data,
            token: response.token,
            refreshToken: response.refreshToken
          })),
          catchError(error => of(loginFailure( error )))
        )
      )
    )
  );
}
