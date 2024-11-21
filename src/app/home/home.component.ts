import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { DataViewModule } from 'primeng/dataview';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faForward } from '@fortawesome/free-solid-svg-icons';
import { StandingsService } from '../standings/standings.service';
import { DriversService } from '../drivers/drivers.service';
import { BehaviorSubject, Observable, Subscription, combineLatest, filter, map, tap } from 'rxjs';

@Component({
  selector: 'chi-home',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    CardModule,
    DividerModule,
    DataViewModule,
    FontAwesomeModule,

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private standingsService = inject(StandingsService);
  topThreeDriverStandings$: Observable<any> = new Observable<any>();
  topThreeConstructorStandings$: Observable<any> = new Observable<any>();

  faForward = faForward;

  newsContent = [
    {
      title: 'News Item 1',
      subheader: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel pellentesque lectus. Mauris rhoncus interdum pulvinar. Vivamus ut hendrerit nulla. Aenean eget nulla ac tortor varius mattis et nec elit. Praesent vitae tempus ante. Quisque eget mollis dui, sed consequat sapien. Proin a tristique nulla, eu lobortis augue. Cras posuere non nisl id ultrices. Aliquam lacinia felis in enim congue accumsan.'
    },
    {
      title: 'News Item 2',
      subheader: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel pellentesque lectus. Mauris rhoncus interdum pulvinar. Vivamus ut hendrerit nulla. Aenean eget nulla ac tortor varius mattis et nec elit. Praesent vitae tempus ante. Quisque eget mollis dui, sed consequat sapien. Proin a tristique nulla, eu lobortis augue.'
    },
    {
      title: 'News Item 3',
      subheader: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel pellentesque lectus. Mauris rhoncus interdum pulvinar. Vivamus ut hendrerit nulla. Aenean eget nulla ac tortor varius mattis et nec elit.'
    }
  ]

  historyContent = [
    {
      title: 'Monaco Grand Prix',
      subheader: 'The history of Formula 1 at Monaco'
    },
    {
      title: 'British Grand Prix',
      subheader: 'The history of Formula 1 at Silverstone'
    },
    {
      title: 'Italian Grand Prix',
      subheader: 'The history of Formula 1 at Monza'
    }
  ]

  standingsContent = []

  ngOnInit() {
    this.topThreeDriverStandings$ = this.standingsService.getTopThreeDriverStandings();
    this.topThreeConstructorStandings$ = this.standingsService.getTopThreeConstructorStandings();
  }
}
