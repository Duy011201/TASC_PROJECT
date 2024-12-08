import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth.service';
import {
  getFromLocalStorage,
  isEmail,
  isEmpty,
  isPassword, removeQuotes,
  saveToLocalStorage,
} from '../../core/commons/func';
import { SETTING } from '../../core/configs/setting.config';
import { Router } from '@angular/router';
import { LoadingService } from '../../core/services/loading.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  SYSTEM_PAGE = SETTING.SYSTEM_PAGE;
  SYSTEM_ROLE = SETTING.SYSTEM_ROLE;

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService,
    private fb: FormBuilder,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  isFieldValid(field: string): boolean {
    return this.loginForm.controls[field].invalid && this.loginForm.controls[field].touched;
  }

  public onNextPage(key: string): void {
    this.router.navigate([key]);
  }

  public onLogin(): void {
    let payload = this.loginForm.value;
    this.loadingService.show();
    this.isLoading = true;
    this.authService.login(payload).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: result.message,
          });
          setTimeout(() => {
            this.loadingService.hide();
            saveToLocalStorage('userID', result.data['userID']);
            saveToLocalStorage('email', result.data['email']);
            saveToLocalStorage('role', result.data['role']);

            saveToLocalStorage('token', result['token']);
            saveToLocalStorage('refreshToken', result['refreshToken']);

            if (removeQuotes(getFromLocalStorage('role')) === this.SYSTEM_ROLE.ROLE_ADMIN) {
              this.onNextPage(
                this.SYSTEM_PAGE.RELATED_ADMIN + '/' + this.SYSTEM_PAGE.MANAGER_USER
              );
            }

            if (removeQuotes(getFromLocalStorage('role')) === this.SYSTEM_ROLE.ROLE_EMPLOYER) {
              this.onNextPage(
                this.SYSTEM_PAGE.RELATED_EMPLOYER + '/' + this.SYSTEM_PAGE.MANAGER_RECRUITMENT
              );
            }

            if (removeQuotes(getFromLocalStorage('role')) === this.SYSTEM_ROLE.ROLE_CANDIDATE) {
              this.onNextPage(
                this.SYSTEM_PAGE.RELATED_CANDIDATE + '/' + this.SYSTEM_PAGE.DASHBOARD
              );
            }

          }, 500);
        }
      },
      (error: any) => {
        this.loadingService.hide();
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.massage || error.error.message,
        });
      }
    );
  }
}
