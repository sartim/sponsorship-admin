import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import {ChildAddComponent, ChildAddContributionComponent, ChildDetailComponent, ChildListComponent, ChildSearchComponent} from './child';
import {SponsorDetailComponent, SponsorListComponent, SponsorSearchComponent} from './sponsor';
import {ChildContributionComponent} from './child/child-contribution.component';
import {SponsorAddComponent} from './sponsor/sponsor-add.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'child/list', component: ChildListComponent, canActivate: [AuthGuard] },
    { path: 'add-child', component: ChildAddComponent, canActivate: [AuthGuard] },
    { path: 'add-contribution', component: ChildAddContributionComponent, canActivate: [AuthGuard] },
    { path: 'child/:id', component: ChildDetailComponent, canActivate: [AuthGuard] },
    { path: 'child-search', component: ChildSearchComponent, canActivate: [AuthGuard] },
    { path: 'child-contribution', component: ChildContributionComponent, canActivate: [AuthGuard] },
    { path: 'sponsor/list', component: SponsorListComponent, canActivate: [AuthGuard] },
    { path: 'add-sponsor', component: SponsorAddComponent, canActivate: [AuthGuard] },
    { path: 'sponsor/:id', component: SponsorDetailComponent, canActivate: [AuthGuard] },
    { path: 'sponsor-search', component: SponsorSearchComponent, canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
