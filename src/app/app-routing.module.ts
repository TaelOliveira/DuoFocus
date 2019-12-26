import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TutorialGuard } from './guards/tutorial.guard';
import { AuthGuard } from './guards/auth.guard';
import { FirstSignInGuard } from './guards/first-sign-in.guard'
import { AllTopicsPage } from './pages/forum/all-topics/all-topics.page';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then( m => m.TutorialPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [TutorialGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard, FirstSignInGuard]
  },
  {
    path: 'tutor',
    loadChildren: () => import('./pages/tutor/tutor.module').then( m => m.TutorPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then( m => m.ContactPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'forum',
    loadChildren: () => import('./pages/forum/forum.module').then( m => m.ForumPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'first-sign-in',
    loadChildren: () => import('./pages/first-sign-in/first-sign-in.module').then( m => m.FirstSignInPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'my-tutors',
    loadChildren: () => import('./pages/my-tutors/my-tutors.module').then( m => m.MyTutorsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./pages/messages/messages.module').then( m => m.MessagesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tutor-profile',
    loadChildren: () => import('./pages/tutor-profile/tutor-profile.module').then( m => m.TutorProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'all-topics',
    loadChildren: () => import('./pages/forum/all-topics/all-topics.module').then( m => m.AllTopicsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
