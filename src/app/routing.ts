import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  // { path: '*', component: HomeComponent, pathMatch: 'full' },

  {
    path: 'verify_account',
    loadChildren: () => import('./modules/auth/complete-registration/complete-registration.module').then(m => m.CompleteRegistrationModule)
  },
  {
    path: 'password_token',
    loadChildren: () => import('./modules/auth/password-token/password-token.module').then(m => m.PasswordTokenModule)
  },
  {
    path: 'reset_password',
    loadChildren: () => import('./modules/auth/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
  },
  {
    path: 'sign_in',
    loadChildren: () => import('./modules/auth/sign-in/sign-in.module').then(m => m.SignInModule)
  },
  {
    path: 'sign_up',
    loadChildren: () => import('./modules/auth/sign-up/sign-up.module').then(m => m.SignUpModule)
  },
  {
    path: 'author/:id',
    loadChildren: () => import('./modules/authors/author.module').then(m => m.AuthorModule)
  },
  {
    path: 'browse',
    loadChildren: () => import('./modules/browse/browse.module').then(m => m.BrowseModule)
  },
  {
    path: 'books/add',
    loadChildren: () => import('./modules/books/add-book/add-book.module').then(m => m.AddBookModule)
  },
  {
    path: 'book/:id/edit',
    loadChildren: () => import('./modules/books/edit-book/edit-book.module').then(m => m.EditBookModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'librarians/manage',
    loadChildren: () => import('./modules/librarians/manage-users/manage-librarians.module').then(m => m.ManageLibrariansModule)
  },
  {
    path: 'publisher/:id',
    loadChildren: () => import('./modules/publisher/publisher.module').then(m => m.PublisherModule)
  },
  {
    path: 'quotes/book/:id',
    loadChildren: () => import('./modules/quotes/quotes.module').then(m => m.QuotesModule)
  },
  {
    path: 'series/:id',
    loadChildren: () => import('./modules/series/series.module').then(m => m.SeriesModule)
  },
  {
    path: 'tickets/user/:userId',
    loadChildren: () => import('./modules/tickets/tickets.module').then(m => m.TicketsModule)
  },
  {
    path: 'users/:id/profile',
    loadChildren: () => import('./modules/users/profiles/profiles.module').then(m => m.ProfilesModule)
  },
  {
    path: 'users/:id/followers',
    loadChildren: () => import('./modules/users/reader-followers/followers.module').then(m => m.ReaderFollowersModule)
  },
  {
    path: 'timeline/:id',
    loadChildren: () => import('./modules/users/timelines/timelines.module').then(m => m.TimelinesModule)
  },
  {
    path: 'book/:id',
    loadChildren: () => import('./modules/books/books.module').then(m => m.BooksModule)
  }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouting {

}
