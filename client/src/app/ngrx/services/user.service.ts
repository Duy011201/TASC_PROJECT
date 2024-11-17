import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserStore} from '../stores/user.store';
import {environment} from '../../core/environments/develop.environment'
import {Store} from "@ngrx/store";
import {RequestApiService} from "../../core/services/request-api.service"

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrlUserServiceAuth = environment.API_URL_USER_SERVICE_AUTH;
  private apiUrlUserService = environment.API_URL_USER_SERVICE;
  private readonly authHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.authHeaders = RequestApiService.authHeaders();
  }

  getAllUser(): Observable<UserStore[]> {
    return this.http.get<UserStore[]>(`${this.apiUrlUserService}/user/all`, { headers: this.authHeaders });
  }

  createUser(user: UserStore): Observable<{status: number, message: string, data: UserStore}> {
    return this.http.post<{status: number, message: string, data: UserStore}>(this.apiUrlUserService, user);
  }

  updateUser(user: UserStore): Observable<{status: number, message: string, data: UserStore}> {
    return this.http.put<{status: number, message: string, data: UserStore}>(`${this.apiUrlUserService}/${user.userID}`, user);
  }

  deleteUser(userID: string): Observable<{status: number, message: string, data: UserStore}> {
    return this.http.delete<{status: number, message: string, data: UserStore}>(`${this.apiUrlUserService}/${userID}`);
  }

  signup(user: UserStore): Observable<{ status: number, message: string, data: UserStore }> {
    return this.http.post<{ status: number, message: string, data: UserStore }>(`${this.apiUrlUserServiceAuth}/signup`, user);
  }

  login(email: string, password: string): Observable<{ status: number, message: string, data: UserStore; token: string, refreshToken: string }> {
    return this.http.post<{ status: number, message: string, data: UserStore; token: string, refreshToken: string }>(`${this.apiUrlUserServiceAuth}/login`, {email, password});
  }
}
