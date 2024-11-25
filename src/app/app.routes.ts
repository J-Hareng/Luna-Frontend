import { Routes } from "@angular/router";
import { LoginPageComponent } from "./comp/l-p-comp/login-page/login-page.component";
import { MainPageComponent } from "./comp/m-p-comp/main-page/main-page.component";
import { MaterialTestComponent } from "./comp/testComp/material-test/material-test.component";
import { TestLunaUtilsComponent } from "./comp/testComp/test-luna-utils/test-luna-utils.component";
export const routes: Routes = [
  { path: "", component: LoginPageComponent }, // Route for '/'
  { path: "Dashboard", component: MainPageComponent },
  { path: "test", component: TestLunaUtilsComponent },
];
