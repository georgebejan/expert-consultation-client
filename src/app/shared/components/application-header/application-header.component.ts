import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationApiService } from '@app/core';

@Component({
  selector: 'app-header',
  templateUrl: './application-header.component.html',
  styleUrls: ['./application-header.component.scss']
})
export class ApplicationHeaderComponent {

  constructor(private router: Router,
              private authenticationApiService: AuthenticationApiService) {
  }

  logout() {
    this.authenticationApiService.logout();
    this.router.navigate(['/login']);
  }
}
