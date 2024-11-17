import {Component} from '@angular/core';
import {SETTING} from '../../core/configs/setting.config';
import {Router} from '@angular/router';
import {environment} from "../../core/environments/develop.environment";

@Component({
  selector: 'app-admin-menu-left',
  standalone: false,
  templateUrl: './menu-left.component.html',
  styleUrl: './menu-left.component.scss',
})
export class MenuLeftComponent {
  SYSTEM_PAGE = SETTING.SYSTEM_PAGE;
  email = ""
  avatar = ""
  pathEnvironment = environment.API_URL;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  public onNextPage(key: string): void {
    this.router.navigate([key]);
  }

  public isRouteActive(routePath: string): boolean {
    return this.router.url.includes(routePath);
  }
}
