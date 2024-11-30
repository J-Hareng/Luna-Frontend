import { Component } from "@angular/core";
import { MainCacheService } from "../../../serv/logic/main-cache.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MainHeaderComponent } from "./main-header/main-header.component";
import { SiteStatus } from "../../../serv/logic/main-cache.service";
import { MainPageGroupSelectComponent } from "./main-page-group-select/main-page-group-select.component";
import { MainDashboardComponent } from "./main-dashboard/main-dashboard.component";
import { MainTeamsComponent } from "./main-teams/main-teams.component";
import { DashCollectionsComponent } from "./main-dashboard/dash-collections/dash-collections.component";
@Component({
  selector: "app-main-page",
  standalone: true,
  imports: [
    MainTeamsComponent,
    DashCollectionsComponent,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MainHeaderComponent,
    MainPageGroupSelectComponent,
    MainDashboardComponent,
  ],
  templateUrl: "./main-page.component.html",
  styleUrl: "./main-page.component.scss",
})
export class MainPageComponent {
  constructor(public mc: MainCacheService) {
    this.mc.SetUpdata();
    this.mc.SiteStatus = SiteStatus.Main;
  }

  SiteStatus = SiteStatus;
}
