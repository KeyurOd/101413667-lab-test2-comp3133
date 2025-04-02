import { Routes } from '@angular/router';
import { MissionListComponent } from './missionlist/missionlist.component';
import { MissionDetailsComponent } from './missiondetails/missiondetails.component';

export const routes: Routes = [
  { path: '', component: MissionListComponent },
  { path: 'mission/:id', component: MissionDetailsComponent }
];