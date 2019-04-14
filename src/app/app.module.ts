import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import {AlertService, AuthenticationService, UserService, ChildService, SponsorService} from './_services';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { NavigationComponent } from './navigation/navigation.component';
import { HeaderComponent } from './header/header.component';
import {HttpClientModule} from '@angular/common/http';
import {
    ChildDetailComponent, ChildListComponent, ChildSearchComponent, ChildContributionComponent, ChildAddComponent,
    ChildAddContributionComponent
} from './child';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import {SponsorAddComponent, SponsorDetailComponent, SponsorListComponent, SponsorSearchComponent} from './sponsor';
import {ContributionService} from './_services/contribution.service';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        routing,
        DatePickerModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AlertComponent,
        LoginComponent,
        RegisterComponent,
        NavigationComponent,
        HeaderComponent,
        ChildListComponent,
        ChildDetailComponent,
        SponsorListComponent,
        SponsorDetailComponent,
        ChildSearchComponent,
        SponsorSearchComponent,
        ChildContributionComponent,
        SponsorAddComponent,
        ChildAddComponent,
        ChildAddContributionComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        ChildService,
        SponsorService,
        ContributionService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
