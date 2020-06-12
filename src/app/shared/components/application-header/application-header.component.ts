import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { AuthenticationApiService } from '@app/core';
import { Interaction } from '@app/shared/utils/interaction';

@Component({
  selector: 'ec-header',
  templateUrl: './application-header.component.html',
  styleUrls: ['./application-header.component.scss']
})
export class ApplicationHeaderComponent implements OnInit {
  public sidenavOpen = true;

  constructor(private router: Router,
              private authenticationApiService: AuthenticationApiService) {
  }

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (window.innerWidth < 1200) {
          Interaction.hideSideNav();
          this.sidenavOpen = false;
        }
      }
    });
  }

  toggleSidenav(): void {
    if (Interaction.bodyHasClass('g-sidenav-pinned')) {
      Interaction.hideSideNav();
      this.sidenavOpen = false;
    } else {
      Interaction.showSideNav();
      this.sidenavOpen = true;
    }
  }

  logout(): void {
    this.authenticationApiService.logout();
    this.router.navigate(['/login']);
  }
}
