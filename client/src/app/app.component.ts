import {Component, OnInit} from '@angular/core';
import {
  Router,
  RouterOutlet,
  ActivationEnd,
  ActivatedRouteSnapshot,
} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {isEmpty} from './core/commons/func';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './component/header/header.component';
import {FooterComponent} from './component/footer/footer.component';
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    CommonModule,
  ],
  providers: [],
})
export class AppComponent implements OnInit {
  /*
   * Default value for comp header and comp footer
   */
  public showHeader: boolean = false;
  public showFooter: boolean = false;

  /*
   * Get value from router
   */
  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter((event) => event instanceof ActivationEnd),
        map((event) => (<ActivationEnd>event).snapshot),
        map((snapshot) => (<ActivatedRouteSnapshot>snapshot).data)
      )
      .subscribe((data) => {
        const dataRouter = Object.assign({}, data);
        if (!isEmpty(dataRouter)) {
          this.showHeader = !!dataRouter?.['showHeader'];
          this.showFooter = !!dataRouter?.['showFooter'];
        }
      });
  }

  ngOnInit(): void {
  }
}
