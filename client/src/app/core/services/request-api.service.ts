import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/develop.environment';
import {Observable} from 'rxjs';
import {getFromLocalStorage, removeQuotes} from '../commons/func'

@Injectable()
export class RequestApiService {
  constructor(private http: HttpClient) {
  }

  public static authHeaders(): HttpHeaders {
    const token = getFromLocalStorage('token');
    if (token !== null) {
      return new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${removeQuotes(getFromLocalStorage('token'))}`
      });
    }
    return new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    });
  }

  private static authHeadersFile(): HttpHeaders {
    const token = removeQuotes(getFromLocalStorage('token'));
    if (token !== null) {
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }
    return new HttpHeaders({});
  }

  postApiHeaderFile(apiUrl: string, body: any, files?: File[]): Observable<any> {
    const headers = RequestApiService.authHeadersFile();
    const formData: FormData = new FormData();

    for (const key in body) {
      if (body.hasOwnProperty(key)) {
        formData.append(key, body[key]);
      }
    }

    if (files && Array.isArray(files)) {
      for (const file of files) {
        if (file) {
          formData.append('files', file, file.name);
        } else {
          console.error('File object is undefined');
        }
      }
    } else {
      console.error('No files provided or files is not an array');
    }

    return this.http.post(`${environment.API_URL}/${apiUrl}`, formData, {headers});
  }
}
