import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {
  login, loginFailure, loginSuccess, setUser,
} from '../../ngrx/actions/user.action';
import {SETTING} from '../../core/configs/setting.config';
import {Actions, ofType} from "@ngrx/effects";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoadingService} from "../../ngrx/services/loading.service";
import {Subscription} from "rxjs";
import {UserStore} from "../../ngrx/stores/user.store";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  SYSTEM_PAGE = SETTING.SYSTEM_PAGE;
  SYSTEM_ROLE = SETTING.SYSTEM_ROLE;
  loginForm: FormGroup;
  isLoading: boolean = false;
  private loadingSubscription: Subscription | undefined;
  private loginSuccessSubscription: Subscription | undefined;
  private loginFailureSubscription: Subscription | undefined;

  constructor(
    private actions$: Actions,
    private messageService: MessageService,
    private router: Router,
    private store: Store<UserStore>,
    private fb: FormBuilder,
    private loadingService: LoadingService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.loadingSubscription = this.loadingService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });

    this.loginSuccessSubscription = this.actions$.pipe(ofType(loginSuccess)).subscribe((response) => {
      this.loadingService.setLoading(false);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: response.message
      });
      this.store.dispatch(setUser({data: response?.data, token: response?.token, refreshToken: response?.refreshToken}));
      if (response.data.role === this.SYSTEM_ROLE.ROLE_ADMIN) {
        this.onNextPage(this.SYSTEM_PAGE.RELATED_ADMIN + '/' + this.SYSTEM_PAGE.MANAGER_ORDER_APPROVAL);
      }
      if (response.data.role === this.SYSTEM_ROLE.ROLE_EMPLOYER) {
        this.onNextPage(this.SYSTEM_PAGE.RELATED_EMPLOYER + '/' + this.SYSTEM_PAGE.DASHBOARD);
      }
      if (response.data.role === this.SYSTEM_ROLE.ROLE_CANDIDATE) {
        this.onNextPage(this.SYSTEM_PAGE.RELATED_CANDIDATE + '/' + this.SYSTEM_PAGE.DASHBOARD);
      }
    });

    this.loginFailureSubscription = this.actions$.pipe(ofType(loginFailure)).subscribe((response) => {
      this.loadingService.setLoading(false);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: response.error ? response.error.message : "Hệ thống xảy ra lỗi",
      });
    });
  }

  onNextPage(key: string): void {
    this.router.navigate([key]);
  }

  isFieldValid(field: string): boolean {
    return this.loginForm.controls[field].invalid && this.loginForm.controls[field].touched;
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.loadingService.setLoading(true);
      const {email, password} = this.loginForm.value;
      this.store.dispatch(login({email, password}));
    } else {
      this.messageService.add({severity: 'error', summary: 'Lỗi', detail: 'Vui lòng kiểm tra lại thông tin!'});
    }
  }

  ngOnDestroy(): void {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
    if (this.loginSuccessSubscription) {
      this.loginSuccessSubscription.unsubscribe();
    }
    if (this.loginFailureSubscription) {
      this.loginFailureSubscription.unsubscribe();
    }
  }
}
