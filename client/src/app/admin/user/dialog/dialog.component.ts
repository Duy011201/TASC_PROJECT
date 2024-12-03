import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SETTING } from '../../../core/configs/setting.config';
import { CONSTANT } from '../../../core/configs/constant.config';
import { AdminService } from '../../admin.service';
import {
  getFromLocalStorage,
  isEmail,
  isEmpty,
  removeQuotes,
  trimStringObject,
} from '../../../core/commons/func';
import { environment } from '../../../core/environments/develop.environment';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-admin-user-dialog',
  standalone: false,
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogUserComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() data: any = {};
  @Output() visibleChange = new EventEmitter<boolean>();

  LIST_STATUS: any = CONSTANT.SYSTEM_STATUS;
  LIST_ROLE: any = CONSTANT.SYSTEM_ROLE;
  SYSTEM_ACTION = SETTING.SYSTEM_ACTION;
  SYSTEM_ROLE: any = SETTING.SYSTEM_ROLE;

  listFileProfile: any = [];
  listCompany: any = [];
  fileProfile: any = {};

  pathEnvironment = environment.API_URL;
  userForm: FormGroup;

  constructor(
    private messageService: MessageService,
    private service: AdminService,
    private fb: FormBuilder,
  ) {
    this.userForm = this.fb.group({
      userID: [null],
      companyID: [null],
      role: [null],
      username: [null],
      email: [null, [Validators.required]],
      password: [null],
      phone: [null],
      profile: [null],
      status: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.apiGetAllCompany();
  }

  onHideDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  ngOnChanges() {
    this.userForm.patchValue({
      userID: this.data.userID,
      companyID: this.data.companyID,
      role: this.data.role,
      username: this.data.username,
      email: this.data.email,
      password: this.data.password,
      phone: this.data.phone,
      profile: this.data.profile,
      status: this.data.status,
    })
  }

  onFileSelected(event: any, type: string) {
    if (event.target.files && event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        if(type === 'profile') this.listFileProfile.push(event.target.files[i]);
      }
    }
  }

  isFieldValid(fieldName: string, formGroup: FormGroup): boolean {
    const field = formGroup.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  private uploadFile(payload: any, files: any[]): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.service.upload(payload, files).subscribe(
        (result: any) => {
          if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
            this.listFileProfile = [];
            resolve(result.data);
          } else {
            reject(new Error('Upload failed'));
          }
        },
        (error: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error?.message || error.message,
          });
          reject(error);
        }
      );
    });
  }

  public async onCreateUser(): Promise<void> {
    if (this.listFileProfile.length > 0) {
      this.fileProfile = await this.uploadFile({ }, this.listFileProfile);
    }
    if (this.userForm.valid) {
      this.fileProfile ? this.userForm.get('profile')?.setValue(this.fileProfile['filePath']) : '';
      this.apiCreate(this.userForm.value);
    }
  }

  public async onUpdateUser(): Promise<void> {
    if (this.listFileProfile.length > 0) {
      this.fileProfile = await this.uploadFile({ }, this.listFileProfile);
    }

    if (this.userForm.valid) {
      this.fileProfile ? this.userForm.get('profile')?.setValue(this.fileProfile['filePath']) : '';
      this.apiUpdate(this.userForm.value);
    }
  }

  apiCreate(payload: any) {
    this.service.createUser(payload).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: result.message,
          });
          this.onHideDialog();
        }
      },
      (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.massage || error.error.message,
        });
      }
    );
  }

  apiUpdate(payload: any) {
    this.service.updateUser(payload).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: result.message,
          });
          this.onHideDialog();
        }
      },
      (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.massage || error.error.message,
        });
      }
    );
  }

  apiGetAllCompany() {
    this.service.getAllCompany({}).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          this.listCompany = result.data;
        }
      },
      (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.massage || error.error.message,
        });
      }
    );
  }
}
