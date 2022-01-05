import { AuthGuard } from './shared/authguard.service';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'home', canActivate: [AuthGuard],
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  }, {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterPageModule)
  },

  {
    path: 'otpverification/:otp/:mno',
    loadChildren: () => import('./auth/otpverification/otpverification.module').then(m => m.OTPVerificationPageModule)
  },
  {
    path: 'productslist/:MachineID',
    loadChildren: () => import('./pages/productslist/productslist.module').then(m => m.ProductsListPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartPageModule)
  },

  {
    path: 'myinquiry',
    loadChildren: () => import('./pages/myinquiry/myinquiry.module').then(m => m.MyInquiryPageModule)
  },
  {
    path: 'brochure',
    loadChildren: () => import('./pages/brochure/brochure.module').then(m => m.BrochurePageModule)
  },
  {
    path: 'adduser',
    loadChildren: () => import('./pages/adduser/adduser.module').then(m => m.AddUserPageModule)
  },
  {
    path: 'inquirydetails/:inqID',
    loadChildren: () => import('./pages/inquirydetails/inquirydetails.module').then(m => m.InquiryDetailsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'contactus',
    loadChildren: () => import('./pages/contactus/contactus.module').then(m => m.ContactUsPageModule)
  },
  //Admin
  {
    path: 'machinelist',
    loadChildren: () => import('./pages/machinelist/machinelist.module').then(m => m.MachineListPageModule)
  },
  {
    path: 'partlist/:MachineID',
    loadChildren: () => import('./pages/partlist/partlist.module').then(m => m.PartListPageModule)
  },

  {
    path: 'addmachine',
    loadChildren: () => import('./pages/addmachine/addmachine.module').then(m => m.AddMachinePageModule)
  },
  {
    path: 'editmachine/:MachineID/:MachineName',
    loadChildren: () => import('./pages/editmachine/editmachine.module').then(m => m.EditMachinePageModule)
  },
  {
    path: 'addparts',
    loadChildren: () => import('./pages/addparts/addparts.module').then(m => m.AddPartsPageModule)
  },
  {
    path: 'agent',
    loadChildren: () => import('./pages/agent/agent.module').then(m => m.AgentPageModule)
  },
  {
    path: 'editagent/:AgentID/:FirstName/:LastName/:Email/:Mobile',
    loadChildren: () => import('./pages/editagent/editagent.module').then(m => m.EditAgentPageModule)
  },
  {
    path: 'addagent',
    loadChildren: () => import('./pages/addagent/addagent.module').then(m => m.AddAgentPageModule)
  },
  {
    path: 'editpart/:MachinePartsID/:MachineName/:PartsName/:PartsNo/:QOH',
    loadChildren: () => import('./pages/editpart/editpart.module').then(m => m.EditPartPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
