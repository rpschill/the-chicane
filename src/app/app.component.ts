import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'the-chicane';
  copyrightDate = new Date().getFullYear();

  menuItems = [
    { label: 'SEASONS', route: 'seasons' },
    { label: 'DRIVERS', route: 'drivers' },
    { label: 'CONSTRUCTORS', route: 'constructors' },
    { label: 'CIRCUITS', route: 'circuits' },
  ];
}
