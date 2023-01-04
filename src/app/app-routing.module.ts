import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Channelcomponent } from './channel/channel.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'channel', component: Channelcomponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
