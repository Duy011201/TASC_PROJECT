import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SETTING } from '../../../core/configs/setting.config';
import { CONSTANT } from '../../../core/configs/constant.config';
import { AdminService } from '../../admin.service';
import {
  getFromLocalStorage,
  isEmpty,
  removeQuotes,
  trimStringObject,
} from '../../../core/commons/func';
import { environment } from '../../../core/environments/develop.environment';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-admin-company-dialog',
  standalone: false,
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogCompanyComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() data: any = {};
  @Output() visibleChange = new EventEmitter<boolean>();

  LIST_PROVINCE: any = CONSTANT.COMPANY_PROVINCE;
  LIST_FIELD: any = CONSTANT.COMPANY_FIELD;
  LIST_STATUS: any = CONSTANT.SYSTEM_STATUS;
  SYSTEM_ACTION = SETTING.SYSTEM_ACTION;

  listFile: any = [];
  fileProfile: any = {};

  companyForm: FormGroup;
  pathEnvironment = environment.API_URL;

  constructor(
    private messageService: MessageService,
    private service: AdminService,
    private fb: FormBuilder,
  ) {
    this.companyForm = this.fb.group({
      companyID: [null],
      companyName: [null, [Validators.required]],
      introduce: [null],
      email: [null],
      phone: [null],
      province: [null],
      address: [null],
      field: [null],
      avatar: [null],
      corporateTaxCode: [null, [Validators.required]],
      status: [null, [Validators.required]],
    });
  }

  ngOnInit() {

  }

  onHideDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  ngOnChanges() {
    this.companyForm.patchValue({
      companyID: this.data.companyID,
      introduce: this.data.introduce,
      email: this.data.email,
      phone: this.data.phone,
      province: this.data.province,
      address: this.data.address,
      field: this.data.field,
      avatar: this.data.avatar,
      corporateTaxCode: this.data.corporateTaxCode,
      status: this.data.status,
    })
  }

  isFieldValid(fieldName: string, formGroup: FormGroup): boolean {
    const field = formGroup.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.listFile.push(event.target.files[i]);
      }
    }
  }

  private uploadFile(payload: any, files: any[]): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.service.upload(payload, files).subscribe(
        (result: any) => {
          if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
            this.listFile = [];
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

  public async onCreateCompany (): Promise<void> {
    if (this.listFile.length > 0) {
      this.fileProfile = await this.uploadFile({ }, this.listFile);
    }

    if (this.companyForm.valid) {
      this.fileProfile ? this.companyForm.get('avatar')?.setValue(this.fileProfile['filePath']) : '';
      this.apiCreate(this.companyForm.value);
    }
  }

  public async onUpdateCompany(): Promise<void> {
    if (this.listFile.length > 0) {
      this.fileProfile = await this.uploadFile({ }, this.listFile);
    }
    if (this.companyForm.valid) {
      this.fileProfile ? this.companyForm.get('avatar')?.setValue(this.fileProfile['filePath']) : '';
      this.apiUpdate(this.companyForm.value);
    }
  }

  apiCreate(payload: any) {
    this.service.createCompany(payload).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: result.message,
          });
          this.listFile = [];
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
    this.service.updateCompany(payload).subscribe(
      (result: any) => {
        if (result.status === SETTING.SYSTEM_HTTP_STATUS.OK) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: result.message,
          });
          this.listFile = [];
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
}
