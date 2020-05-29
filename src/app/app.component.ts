import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '@app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'legal-consultation-client';
  private subscriptions: Subscription[] = [];

  constructor(translate: TranslateService, private authService: AuthenticationService,
              private router: Router) {
    translate.addLangs(['en', 'ro']);
    translate.setDefaultLang('ro');
    translate.use('ro');
  }

  ngOnInit(): void {
    this.subscriptions.push(this.authService.hasExpired.subscribe((expired) => {
      if (expired) {
        this.authService.removeAuthenticationData();
        this.router.navigate(['/login']);
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
