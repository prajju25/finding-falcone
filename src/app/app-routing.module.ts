import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { FindFalconeComponent } from './app-body/find-falcone/find-falcone.component';
import { MessageDisplayComponent } from './app-body/message-display/message-display.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'game',
    pathMatch: 'full'
  },{
    path: 'message',
    component: MessageDisplayComponent
  },{
  path: 'game',
  component: FindFalconeComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
