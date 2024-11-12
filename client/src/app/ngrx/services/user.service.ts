import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserStore} from '../stores/user.store';
import {environment} from '../../core/environments/develop.environment'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrlUserServiceAuth = environment.API_URL_USER_SERVICE_AUTH;
  private apiUrlUserService = environment.API_URL_USER_SERVICE;

  constructor(private http: HttpClient) {
  }

  getAllUser(): Observable<UserStore[]> {
    return this.http.get<UserStore[]>(this.apiUrlUserService);
  }

  createUser(user: UserStore): Observable<UserStore> {
    return this.http.post<UserStore>(this.apiUrlUserService, user);
  }

  updateUser(user: UserStore): Observable<UserStore> {
    return this.http.put<UserStore>(`${this.apiUrlUserService}/${user.userID}`, user);
  }

  deleteUser(userID: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlUserService}/${userID}`);
  }

  signup(user: UserStore): Observable<{ status: number, message: string, data: UserStore }> {
    return this.http.post<{ status: number, message: string, data: UserStore }>(`${this.apiUrlUserServiceAuth}/signup-candidate`, user);
  }

  login(email: string, password: string): Observable<{ status: number, message: string, data: UserStore; token: string, refreshToken: string }> {
    return this.http.post<{ status: number, message: string, data: UserStore; token: string, refreshToken: string }>(`${this.apiUrlUserServiceAuth}/login`, {email, password});
  }
}
