import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Store} from '@ngrx/store';
import {CompanyService} from "../services/comapny.service";
import {
  getAllCompany, getAllCompanySuccess, getAllCompanyFailure,
  createCompany, createCompanySuccess, createCompanyFailure,
  updateCompany, updateCompanySuccess, updateCompanyFailure,
  deleteCompany, deleteCompanySuccess, deleteCompanyFailure
} from '../actions/company.action';

@Injectable()
export class CompanyEffect {
  constructor(
    private actions$: Actions,
    private companyService: CompanyService,
    private store: Store
  ) {
  }

  // Get All Company
  getAllCompany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllCompany),
      mergeMap(() =>
        this.companyService.getAllCompany().pipe(
          map(company => getAllCompanySuccess({company})),
          catchError(error => of(getAllCompanyFailure({error: error.message})))
        )
      )
    )
  );

  // Create Company
  createCompany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createCompany),
      mergeMap(({company}) =>
        this.companyService.createCompany(company).pipe(
          map(newUser => createCompanySuccess({user: company})),
          catchError(error => of(createCompanyFailure({error: error.message})))
        )
      )
    )
  );

  // Update Company
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCompany),
      mergeMap(({company}) =>
        this.companyService.updateCompany(company).pipe(
          map(updateCompany => updateCompanySuccess({company: updateCompany})),
          catchError(error => of(updateCompanyFailure({error: error.message})))
        )
      )
    )
  );

  // Delete Company
  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCompany),
      mergeMap(({companyID}) =>
        this.companyService.deleteCompany(companyID).pipe(
          map(() => deleteCompanySuccess({companyID})),
          catchError(error => of(deleteCompanyFailure({error: error.message})))
        )
      )
    )
  );
}
