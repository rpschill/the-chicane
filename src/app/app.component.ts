import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'the-chicane';
  copyrightDate = new Date().getFullYear();
  mobileMenuChecked = false;

  menuItems = [
    { label: 'F1 NEWS', route: 'news' },
    { label: 'SEASONS', route: 'seasons' },
    { label: 'DRIVERS', route: 'drivers' },
    { label: 'CONSTRUCTORS', route: 'constructors' },
    { label: 'CIRCUITS', route: 'circuits' },
    { label: 'HISTORY', route: 'history' }
  ];

  onMobileNav() {
    if (this.mobileMenuChecked) {
      this.mobileMenuChecked = false;
    }
  }
}
