import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgentPage } from './agent.page';

const routes: Routes = [
  {
    path: '',
    component: AgentPage,
  }
];

@NgModule({
  imports: [
    SharedModule, 
       FormsModule,
    RouterModule.forChild(routes)  ],
  declarations: [AgentPage]
})
export class AgentPageModule {}
