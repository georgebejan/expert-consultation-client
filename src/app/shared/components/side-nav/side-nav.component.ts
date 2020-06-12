import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Interaction } from '@app/shared/utils/interaction';

@Component({
  selector: 'ec-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  public isCollapsed = true;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      this.isCollapsed = true;
    });
  }

  onMouseEnterSidenav(): void {
    if (!Interaction.bodyHasClass('g-sidenav-pinned')) {
      Interaction.addClassToBody('g-sidenav-show');
    }
  }

  onMouseLeaveSidenav(): void {
    if (!Interaction.bodyHasClass('g-sidenav-pinned')) {
      Interaction.removeClassFromBody('g-sidenav-show');
    }
  }

  minimizeSidebar(): void {
    if (Interaction.bodyHasClass('g-sidenav-pinned')) {
      Interaction.hideSideNav();
      Interaction.removeClassFromElement('sidenav-toggler', 'active');
    } else {
      Interaction.showSideNav();
      Interaction.addClassToElement('sidenav-toggler', 'active');
    }
  }
}
