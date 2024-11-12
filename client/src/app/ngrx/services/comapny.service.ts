import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CompanyStore} from '../stores/company.store';
import {environment} from '../../core/environments/develop.environment'

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private apiUrlUserServiceAuth = environment.API_URL_USER_SERVICE_AUTH;
  private apiUrlUserService = environment.API_URL_USER_SERVICE;

  constructor(private http: HttpClient) {
  }

  getAllCompany(): Observable<CompanyStore[]> {
    return this.http.get<CompanyStore[]>(this.apiUrlUserService);
  }

  createCompany(user: CompanyStore): Observable<CompanyStore> {
    return this.http.post<CompanyStore>(this.apiUrlUserService, user);
  }

  updateCompany(company: CompanyStore): Observable<CompanyStore> {
    return this.http.put<CompanyStore>(`${this.apiUrlUserService}/${company.companyID}`, company);
  }

  deleteCompany(companyID: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlUserService}/${companyID}`);
  }
}
