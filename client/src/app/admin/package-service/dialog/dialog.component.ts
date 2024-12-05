import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessageService} from 'primeng/api';
import {SETTING} from '../../../core/configs/setting.config';
import {AdminService} from '../../admin.service';
import {
  getFromLocalStorage,
  isEmpty,
  removeQuotes,
  trimStringObject,
} from '../../../core/commons/func';
import {environment} from '../../../core/environments/develop.environment';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-admin-package-service-dialog',
  standalone: false,
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogServiceDialogComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() data: any = {};
  @Output() visibleChange = new EventEmitter<boolean>();

  SYSTEM_ACTION = SETTING.SYSTEM_ACTION;
  pathEnvironment = environment.API_URL;
  listFile: any = [];
  fileAvatar: any = {};
  pakageServiceForm: FormGroup;

  constructor(
    private messageService: MessageService,
    private service: AdminService,
    private fb: FormBuilder,
  ) {
    this.pakageServiceForm = this.fb.group({
      packageServiceID: [null],
      packageServiceName: [null, [Validators.required]],
      price: [null, [Validators.required]],
      promotion: [null, [Validators.required]],
      content: [null],
      expirationDate: [null, [Validators.required]],
      avatar: [null, [Validators.required]],
    });
  }

  ngOnInit() {
  }

  onHideDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  ngOnChanges() {
    if (this.data.actionDialog === this.SYSTEM_ACTION.CREATE) {
      this.data.promotion = 0
    }

    this.pakageServiceForm.patchValue({
      packageServiceID: this.data.packageServiceID,
      packageServiceName: this.data.packageServiceName,
      price: this.data.price,
      promotion: this.data.promotion,
      content: this.data.content,
      expirationDate: this.data.expirationDate,
      avatar: this.data.avatar,
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

  public async onCreateUser(): Promise<void> {
    if (this.listFile.length > 0) {
      this.fileAvatar = await this.uploadFile({ }, this.listFile);
      this.fileAvatar ? this.pakageServiceForm.get('avatar')?.setValue(this.fileAvatar['filePath']) : '';
    }

    if (this.pakageServiceForm.valid) {
      this.apiCreate(this.pakageServiceForm.value);
    }
  }

  public async onUpdateUser(): Promise<void> {
    if (this.listFile.length > 0) {
      this.fileAvatar = await this.uploadFile({ }, this.listFile);
      this.fileAvatar ? this.pakageServiceForm.get('avatar')?.setValue(this.fileAvatar['filePath']) : '';
    }

    if (this.pakageServiceForm.valid) {
      this.apiUpdate(this.pakageServiceForm.value);
    }
  }

  apiCreate(payload: any) {
    this.service.createPackageService(payload).subscribe(
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
    this.service.updatePackageService(payload).subscribe(
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
}
