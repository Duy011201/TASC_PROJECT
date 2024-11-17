import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SETTING } from '../../../core/configs/setting.config';
import { CONSTANT } from '../../../core/configs/constant.config';
import {
  getFromLocalStorage,
  isEmail,
  isEmpty,
  removeQuotes,
  trimStringObject,
} from '../../../core/commons/func';
import { environment } from '../../../core/environments/develop.environment';

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

  selectRole: any = {};
  selectStatus: any = {};
  selectCompany: any = {};

  listFileImage: any = [];
  listFileProfile: any = [];
  listCompany: any = [];

  pathEnvironment = environment.API_URL;

  constructor(
    private messageService: MessageService,
  ) {}

  ngOnInit() {

    // this.apiGetAllCompany();
  }

  onHideDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  ngOnChanges() {
    this.selectStatus = this.LIST_STATUS.find(
      (item: any) => item.CODE === this.data.status
    );
    // this.selectRole = this.listRole.find(
    //   (item: any) => item.roleName === this.data.roleName
    // );
    this.selectCompany = this.listCompany.find(
      (item: any) => item.name === this.data.companyName
    );
  }

  onFileSelected(event: any, type: string) {
    if (event.target.files && event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        if(type === 'image') this.listFileImage.push(event.target.files[i]);
        if(type === 'profile') this.listFileProfile.push(event.target.files[i]);
      }
    }
  }
}
