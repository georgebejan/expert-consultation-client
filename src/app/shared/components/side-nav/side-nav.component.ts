import { AfterViewInit, Component } from '@angular/core';
import { Tools } from '@app/shared/utils/tools';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements AfterViewInit {

  ngAfterViewInit() {
    Tools.loadArgonJs();
  }
}
