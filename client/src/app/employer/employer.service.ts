import { Injectable } from '@angular/core';
import { RequestApiService } from '../core/services/request-api.service';
import { UrlApi } from '../core/configs/urlapi.config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmployerService {
  constructor(private _requestApiService: RequestApiService) {}

  public getAllRole(body: object) {
    return this._requestApiService
      .postApiHeader(`${UrlApi.ADMIN_GET_ALL_ROLE}`, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public getAllUser(body: object) {
    return this._requestApiService
      .postApiHeader(`${UrlApi.GET_ALL_USER}`, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public updateUser(body: object) {
    return this._requestApiService
      .postApiHeader(`${UrlApi.UPDATE_USER}`, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public createUser(body: object) {
    return this._requestApiService
      .postApiHeader(`${UrlApi.CREATE_USER}`, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public deleteUser(body: object) {
    return this._requestApiService
      .postApiHeader(`${UrlApi.DELETE_USER}`, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public getByIDUser(body: object) {
    return this._requestApiService
      .postApiHeader(`${UrlApi.GET_BY_ID_USER}`, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public upload(body: object, files: any) {
    return this._requestApiService
      .postApiHeaderFile(`${UrlApi.FILE_UPLOAD}`, body, files)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public getAllCompany(body: object) {
    return this._requestApiService
      .postApiHeader(`${UrlApi.GET_ALL_COMPANY}`, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public getAllCompanyHeader(body: object) {
    return this._requestApiService
      .postApi(`${UrlApi.GET_ALL_HEADER_COMPANY}`, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public getByIDCompany(body: object) {
    return this._requestApiService
      .postApiHeader(`${UrlApi.GET_BY_ID_COMPANY}`, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public updateCompany(body: object) {
    return this._requestApiService
      .postApiHeader(`${UrlApi.UPDATE_COMPANY}`, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public createCompany(body: object) {
    return this._requestApiService
      .postApiHeader(`${UrlApi.CREATE_COMPANY}`, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public deleteCompany(body: object) {
    return this._requestApiService
      .postApiHeader(`${UrlApi.DELETE_COMPANY}`, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public sendNotificationEmail(body: object) {
    return this._requestApiService
      .postApiHeader(`${UrlApi.SEND_NOTIFICATION_EMAIL}`, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public getAllServicePack(body: object) {
    return this._requestApiService
      .postApiHeader(`${UrlApi.GET_ALL_SERVICE_PACK}`, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public updateServicePack(body: object) {
    return this._requestApiService
      .postApiHeader(`${UrlApi.UPDATE_SERVICE_PACK}`, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public createServicePack(body: object) {
    return this._requestApiService
      .postApiHeader(`${UrlApi.CREATE_SERVICE_PACK}`, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public deleteServicePack(body: object) {
    return this._requestApiService
      .postApiHeader(`${UrlApi.DELETE_SERVICE_PACK}`, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public getAllProduct(body: object) {
    return this._requestApiService
      .postApiHeader(`${UrlApi.GET_ALL_PRODUCT}`, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public updateProduct(body: object) {
    return this._requestApiService
      .postApiHeader(`${UrlApi.UPDATE_PRODUCT}`, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public createProduct(body: object) {
    return this._requestApiService
      .postApiHeader(`${UrlApi.CREATE_PRODUCT}`, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public deleteProduct(body: object) {
    return this._requestApiService
      .postApiHeader(`${UrlApi.DELETE_PRODUCT}`, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public getAllHistory(body: object) {
    return this._requestApiService
      .postApiHeader(`${UrlApi.GET_ALL_HISTORY}`, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public getAllRecruitment(body: object) {
    return this._requestApiService
      .postApiHeader(`${UrlApi.GET_ALL_RECRUITMENT}`, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public getAllRecruitmentHeader(body: object) {
    return this._requestApiService
      .postApi(`${UrlApi.GET_ALL_RECRUITMENT_HEADER}`, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public updateRecruitment(body: object) {
    return this._requestApiService
      .postApiHeader(`${UrlApi.UPDATE_RECRUITMENT}`, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public createRecruitment(body: object) {
    return this._requestApiService
      .postApiHeader(`${UrlApi.CREATE_RECRUITMENT}`, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public deleteRecruitment(body: object) {
    return this._requestApiService
      .postApiHeader(`${UrlApi.DELETE_RECRUITMENT}`, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public statusRecruitment(body: object) {
    return this._requestApiService
      .postApiHeader(`${UrlApi.STATUS_RECRUITMENT}`, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public getRecruitmentProcessEmployer(body: object) {
    return this._requestApiService
      .postApiHeader(`${UrlApi.GET_ALL_RECRUITMENT_PROCESS_EMPLOYER}`, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public getRecruitmentProcessCandidate(body: object) {
    return this._requestApiService
      .postApiHeader(`${UrlApi.GET_ALL_RECRUITMENT_PROCESS_CANDIDATE}`, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public deleteRecruitmentProcess(body: object) {
    return this._requestApiService
      .postApiHeader(`${UrlApi.DELETE_RECRUITMENT_PROCESS}`, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public createRecruitmentProcess(body: object) {
    return this._requestApiService
      .postApiHeader(`${UrlApi.CREATE_RECRUITMENT_PROCESS}`, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public saveProfileRecruitmentProcess(body: object) {
    return this._requestApiService
      .postApiHeader(`${UrlApi.SAVE_PROFILE}`, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public downloadFile(body: object) {
    return this._requestApiService
      .postApiHeader(`${UrlApi.FILE_DOWNLOAD}`, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public getReportEmployer(body: object) {
    return this._requestApiService
      .postApiHeader(`${UrlApi.GET_REPORT_EMPLOYER}`, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
