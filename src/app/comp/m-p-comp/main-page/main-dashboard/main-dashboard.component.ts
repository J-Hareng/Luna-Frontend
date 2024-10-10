import { Component } from '@angular/core';
import { DashTeamsComponent } from './dash-teams/dash-teams.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { DashCollectionsComponent } from './dash-collections/dash-collections.component';
@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [DashTeamsComponent,MatTabsModule,MatIconModule,DashCollectionsComponent],
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.scss'
})
export class MainDashboardComponent {

}
