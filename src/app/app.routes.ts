import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SeasonsComponent } from './seasons/seasons.component';
import { ConstructorsComponent } from './constructors/constructors.component';
import { DriversComponent } from './drivers/drivers.component';
import { CircuitsComponent } from './circuits/circuits.component';
import { NewsComponent } from './news/news.component';
import { HistoryComponent } from './history/history.component';
import { StandingsComponent } from './standings/standings.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'seasons', component: SeasonsComponent },
  { path: 'constructors', component: ConstructorsComponent },
  { path: 'drivers', component: DriversComponent },
  { path: 'circuits', component: CircuitsComponent },
  { path: 'news', component: NewsComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'standings', component: StandingsComponent },
  { path: '**', redirectTo: '' }
];
