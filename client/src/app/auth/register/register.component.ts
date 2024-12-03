import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SETTING } from '../../core/configs/setting.config';
import {
  containsSpecialCharacter,
  containsSpecialOrLetter,
  isEmail,
  isEmpty,
  isPassword,
  trimStringObject,
} from '../../core/commons/func';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../core/services/loading.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private loadingService: LoadingService
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: [this.SYSTEM_ROLE.ROLE_CANDIDATE, [Validators.required]],
      status: [SETTING.SYSTEM_STATUS.ACTIVE],
    });
  }

  ngOnInit() {}

  public onNextPage(key: string): void {
    this.router.navigate([key]);
  }

  isFieldValid(fieldName: string, formGroup: FormGroup): boolean {
    const field = formGroup.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSignup(): void {
    if (this.signupForm.valid) {
      this.loadingService.show();
      this.authService.signup(this.signupForm.value).subscribe(
        (result: any) => {
          if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: result['message'],
            });
            setTimeout(() => {
              this.loadingService.hide();
              setTimeout(() => {
                this.router.navigate(['/auth/login']);
              }, 2000);
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
    } else {
      this.messageService.add({severity: 'error', summary: 'Lỗi', detail: 'Vui lòng kiểm tra lại thông tin!'});
    }
  }
}
