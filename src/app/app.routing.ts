import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ListUserComponent} from "./user/list-user/list-user.component";
import { RegistrationComponent } from './registration/registration.component';
import { PreventLogInAccess } from './core/prevent-log-in-access.service';
import { NewsPageComponent } from './news-page/news-page.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [PreventLogInAccess] },
  { path: 'list-user', component: ListUserComponent },
  { path: 'registration', component: RegistrationComponent, canActivate: [PreventLogInAccess]},
  { path: 'news-page', component: NewsPageComponent },
  { path : '', component : LoginComponent, canActivate: [PreventLogInAccess] }
];

export const routing = RouterModule.forRoot(routes);
