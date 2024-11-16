import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {SETTING} from '../../core/configs/setting.config';
import {Router} from '@angular/router';
import {LoadingService} from '../../ngrx/services/loading.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Actions, ofType} from "@ngrx/effects";
import {signup, signupFailure, signupSuccess} from "../../ngrx/actions/user.action";
import {createCompany, createCompanyFailure, createCompanySuccess} from "../../ngrx/actions/company.action";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {UserStore} from "../../ngrx/stores/user.store";

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  public SYSTEM_PAGE = SETTING.SYSTEM_PAGE;
  public SYSTEM_ROLE = SETTING.SYSTEM_ROLE;
  signupForm: FormGroup;
  isLoading: boolean = false;
  stateOptions: any[] = [{ label: 'Ứng viên', value: 'one-way' },{ label: 'Nhà tuyển dụng', value: 'return' }];
  private loadingSubscription: Subscription | undefined;
  private signupSuccessSubscription: Subscription | undefined;
  private signupFailureSubscription: Subscription | undefined;

  constructor(
    private messageService: MessageService,
    private router: Router,
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private store: Store<UserStore>,
    private actions$: Actions,
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: [this.SYSTEM_ROLE.ROLE_CANDIDATE, [Validators.required]],
      status: [SETTING.SYSTEM_STATUS.ACTIVE],
    });
  }

  ngOnInit() {
    this.loadingSubscription = this.loadingService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });
    this.signupSuccessSubscription = this.actions$.pipe(ofType(signupSuccess)).subscribe((response) => {
      this.loadingService.setLoading(false);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: response.message
      });
      this.router.navigate([SETTING.SYSTEM_PAGE.AUTH_LOGIN])
    });

    this.signupFailureSubscription = this.actions$.pipe(ofType(signupFailure)).subscribe((response) => {
      this.loadingService.setLoading(false);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: response.error ? response.error.message : "Hệ thống xảy ra lỗi",
      });
    });
  }

  isFieldValid(field: string, form: FormGroup): boolean {
    return form.controls[field].invalid && form.controls[field].touched;
  }

  onNextPage(key: string): void {
    this.router.navigate([key]);
  }

  onSignup() {
    if (this.signupForm.valid) {
      this.loadingService.setLoading(true);
      let payload = this.signupForm.value;
      this.store.dispatch(signup({ user: payload }));
    } else {
      this.messageService.add({severity: 'error', summary: 'Lỗi', detail: 'Vui lòng kiểm tra lại thông tin!'});
    }
  }
}
