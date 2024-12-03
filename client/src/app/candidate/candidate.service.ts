import { Injectable } from '@angular/core';
import { RequestApiService } from '../core/services/request-api.service';
import { UrlApi } from '../core/configs/urlapi.config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  constructor(private _requestApiService: RequestApiService) {}

  public updateUser(body: object) {
    return this._requestApiService
      .postApiHeader(`${UrlApi.UPDATE_USER}`, body)
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

  public downloadFile(body: object) {
    return this._requestApiService
      .postApiHeader(`${UrlApi.FILE_DOWNLOAD}`, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
