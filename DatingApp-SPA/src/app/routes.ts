import { MessagesResolver } from './_resolvers/messages.resolver';
import { ListResolver } from './_resolvers/lists.resolver';
import { User } from './_models/user';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberListResolver } from './_resolvers/member-list.resolver';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  // we can add canActivate in single route but to maintain
  // code readability and scalebility we add it in a seperate
  // route with all the childerns
  {
    path: '', // this path is combined with the chiledern paths
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'members',
        component: MemberListComponent,
        resolve: { users: MemberListResolver },
      },
      {
        path: 'members/:id',
        component: MemberDetailComponent,
        resolve: { user: MemberDetailResolver },
      },
      {
        path: 'member/edit',
        component: MemberEditComponent,
        resolve: { user: MemberEditResolver },
        canDeactivate: [PreventUnsavedChanges],
      },
      {
        path: 'messages',
        component: MessagesComponent,
        resolve: { messages: MessagesResolver },
      },
      {
        path: 'lists',
        component: ListsComponent,
        resolve: { User: ListResolver },
      },
    ],
  },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];
