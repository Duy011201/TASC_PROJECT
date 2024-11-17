import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Table} from 'primeng/table';
import {SETTING} from '../../core/configs/setting.config';
import {environment} from '../../core/environments/develop.environment';
import {CONSTANT} from '../../core/configs/constant.config';
import {LoadingService} from "../../ngrx/services/loading.service";
import {getAllUser} from "../../ngrx/actions/user.action";
import {Store} from "@ngrx/store";
import {UserStore} from "../../ngrx/stores/user.store";
import {selectAllUser, selectAllError, selectAllLoading} from "../../ngrx/selectors/user.selector";
import {Observable, skip, take, tap} from "rxjs";

@Component({
  selector: 'app-admin-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  LIST_SYSTEM_STATUS = CONSTANT.SYSTEM_STATUS;
  SYSTEM_STATUS = SETTING.SYSTEM_STATUS;
  SYSTEM_ACTION = SETTING.SYSTEM_ACTION;
  LIST_SYSTEM_ROLE = CONSTANT.SYSTEM_ROLE;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private loadingService: LoadingService,
    private store: Store<UserStore>,
  ) {
  }

  dataDialog: any = {
    actionDialog: '',
    headerDialog: '',
    subHeaderDialog: '',
  };
  listUser: any = [];
  visible: boolean = false;
  isLoading: boolean = true;

  ngOnInit() {
    this.store.dispatch(getAllUser());

    this.store.select(selectAllUser).pipe(skip(1), take(1)).subscribe((res, ) => {
      // @ts-ignore
      this.listUser = res.data;
    });
    this.store.select(selectAllLoading).subscribe((isLoading) => {
      if (isLoading) {
        this.loadingService.setLoading(true);
        this.isLoading = true;
      } else {
        this.loadingService.setLoading(false);
        this.isLoading = false;
      }
    });
  }

  clear(table: Table) {
    table.clear();
  }

  onShowDialog(action: string, data: any): void {
    this.dataDialog = {...data};

    switch (action) {
      case this.SYSTEM_ACTION.VIEW:
        this.dataDialog.headerDialog = 'View user';
        this.dataDialog.subHeaderDialog = 'View user information';
        break;
      case this.SYSTEM_ACTION.CREATE:
        this.dataDialog.headerDialog = 'Create user';
        this.dataDialog.subHeaderDialog = 'Create user information';
        break;
      case this.SYSTEM_ACTION.UPDATE:
        this.dataDialog.headerDialog = 'Update user';
        this.dataDialog.subHeaderDialog = 'Update user information';
        break;
    }

    this.dataDialog.actionDialog = action;
    this.visible = true;
  }

  confirmDelete(event: Event, user: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this user?',
      header: 'Delete User',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        // this.apiDelete(user);
      },
      reject: () => {
      },
    });
  }

  confirmLock(event: Event, user: any, status: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Are you sure that you want ${status === this.SYSTEM_STATUS.LOCK ? 'lock' : 'open'} user?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        // this.apiLock(user, status);
      },
      reject: () => {
      },
    });
  }

  truncateString(str: string, maxLength: number): string {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...';
    }
    return str;
  }

  handleVisibleChange(visible: boolean) {
    this.visible = visible;
    // this.apiGetAll();
  }
}
