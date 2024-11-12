import { Routes } from '@angular/router';
import { NewTestComponent } from './new-test/new-test.component';
import { LandingComponent } from './landing/landing.component';

export const routes: Routes = [
    {path:"",component:LandingComponent},
    {path:"new-test",component:NewTestComponent}
];
