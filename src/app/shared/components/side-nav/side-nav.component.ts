import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationApiService } from '@app/core';

declare interface RouteInfo {
  path: string;
  titleKey: string;
  icon: string;
  class: string;
  pathOptions: {};
}

export const ROUTES: RouteInfo[] = [
  {path: '/dashboard', titleKey: 'sideNav.dashboard', icon: 'ni ni-shop', class: '', pathOptions: {}},
  {path: '/documents/add', titleKey: 'sideNav.addDocument', icon: 'ni ni-fat-add', class: '', pathOptions: {exact: true}},
  {path: '/documents', titleKey: 'sideNav.documentArchive', icon: 'ni ni-single-copy-04', class: '', pathOptions: {exact: true}},
  {path: '/users', titleKey: 'sideNav.userManagement', icon: 'ni ni-circle-08', class: '', pathOptions: {}},
  {path: '#', titleKey: 'sideNav.dictionary', icon: 'ni ni-books', class: '', pathOptions: {}},
  {path: '#', titleKey: 'sideNav.settings', icon: 'ni ni-settings-gear-65', class: '', pathOptions: {}},
];

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  public isCollapsed = true;
  public menuItems = ROUTES.filter(menuItem => menuItem);

  constructor(private router: Router,
              private authenticationApiService: AuthenticationApiService) {
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

  logout() {
    this.authenticationApiService.logout();
    this.router.navigate(['/login']);
  }
}
