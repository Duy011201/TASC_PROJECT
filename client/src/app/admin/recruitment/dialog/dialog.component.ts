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
import dayjs from "dayjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmployerService} from "../../../employer/employer.service";

@Component({
  selector: 'app-admin-recruitment-dialog',
  standalone: false,
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogRecruitmentComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() data: any = {};
  @Output() visibleChange = new EventEmitter<boolean>();

  LIST_RECRUITMENT: any = CONSTANT.RECRUITMENT;
  LIST_PROVINCE: any = CONSTANT.COMPANY_PROVINCE;
  LIST_FIELD: any = CONSTANT.COMPANY_FIELD;
  LIST_FORM_WORK: any = CONSTANT.FORM_WORK;
  SYSTEM_ACTION = SETTING.SYSTEM_ACTION;
  STATUS_RECRUITMENT: any = SETTING.RECRUITMENT;

  currentDate = new Date();
  pathEnvironment = environment.API_URL;
  recruitmentForm: FormGroup;

  constructor(
    private messageService: MessageService,
    private service: AdminService,
    private fb: FormBuilder,
  ) {
    this.recruitmentForm = this.fb.group({
      recruitmentID: [null],
      userID: [null],
      title: [null, [Validators.required]],
      address: [null, [Validators.required]],
      description: [null, [Validators.required]],
      required: [null, [Validators.required]],
      benefit: [null, [Validators.required]],
      province: [null, [Validators.required]],
      field: [null, [Validators.required]],
      formWork: [null, [Validators.required]],
      timeStart: [null, [Validators.required]],
      timeEnd: [null, [Validators.required]],
      salaryFrom: [null, [Validators.required]],
      salaryTo: [null, [Validators.required]],
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
    if (this.data.actionDialog !== this.SYSTEM_ACTION.CREATE) {
      if (this.data.timeStart) {
        this.data.timeStart = dayjs(this.data.timeStart).toDate();
      }

      if (this.data.timeEnd) {
        this.data.timeEnd = dayjs(this.data.timeEnd).toDate();
      }
    }

    this.recruitmentForm.patchValue({
      recruitmentID: this.data.recruitmentID,
      userID: this.data.userID,
      title: this.data.title,
      address: this.data.address,
      description: this.data.description,
      required: this.data.required,
      benefit: this.data.benefit,
      province: this.data.province,
      field: this.data.field,
      formWork: this.data.formWork,
      timeStart: this.data.timeStart,
      timeEnd: this.data.timeEnd,
      salaryFrom: this.data.salaryFrom,
      salaryTo: this.data.salaryTo,
      status: this.data.status,
    })

    if (this.data.actionDialog === this.SYSTEM_ACTION.CREATE) {
      this.recruitmentForm.get('timeStart')?.setValue(dayjs(this.currentDate).toDate());
      this.recruitmentForm.get('status')?.setValue(this.STATUS_RECRUITMENT.PENDING);
    }
  }

  isFieldValid(fieldName: string, formGroup: FormGroup): boolean {
    const field = formGroup.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onChangeTitle(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let title = inputElement.value;
    this.data.keyword = title
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/\s+/g, '-');
  }

  public async onUpdate(): Promise<void> {
    this.recruitmentForm.get('userID')?.setValue(removeQuotes(getFromLocalStorage('userID')));
    if (this.recruitmentForm.valid) {
      this.apiUpdate(this.recruitmentForm.value);
    }
  }

  apiUpdate(payload: any) {
    this.service.updateRecruitment(payload).subscribe(
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
