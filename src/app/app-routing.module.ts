import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TutorialGuard } from './guards/tutorial.guard';
import { AuthGuard } from './guards/auth.guard';
import { FirstSignInGuard } from './guards/first-sign-in.guard'

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
  {
    path: 'tutor-reviews',
    loadChildren: () => import('./pages/tutor-reviews/tutor-reviews.module').then( m => m.TutorReviewsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'feedback',
    loadChildren: () => import('./pages/feedback/feedback.module').then( m => m.FeedbackPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin-dash',
    loadChildren: () => import('./pages/admin-pages/admin-dash/admin-dash.module').then( m => m.AdminDashPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'topics',
    loadChildren: () => import('./pages/admin-pages/topics/topics.module').then( m => m.TopicsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'topics-reports',
    loadChildren: () => import('./pages/admin-pages/topics-reports/topics-reports.module').then( m => m.TopicsReportsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'replies-reports',
    loadChildren: () => import('./pages/admin-pages/replies-reports/replies-reports.module').then( m => m.RepliesReportsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'be-a-tutor',
    loadChildren: () => import('./pages/admin-pages/be-a-tutor/be-a-tutor.module').then( m => m.BeATutorPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'feedback-emails',
    loadChildren: () => import('./pages/admin-pages/feedback-emails/feedback-emails.module').then( m => m.FeedbackEmailsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'student-chats',
    loadChildren: () => import('./pages/admin-pages/student-chats/student-chats.module').then( m => m.StudentChatsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'reviews',
    loadChildren: () => import('./pages/admin-pages/reviews/reviews.module').then( m => m.ReviewsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/admin-pages/users/users.module').then( m => m.UsersPageModule),
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
