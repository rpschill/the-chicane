import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CircuitsService } from './circuits.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'chi-circuits',
  standalone: true,
  imports: [
    AsyncPipe,
    TabViewModule,
    CardModule,
    ButtonModule,
  ],
  templateUrl: './circuits.component.html',
  styleUrl: './circuits.component.scss'
})
export class CircuitsComponent {

  private readonly circuitsService = inject(CircuitsService);

  public currentCircuits: Observable<any> = new Observable();
  public allCircuits: Observable<any> = new Observable();

  ngOnInit() {
    this.currentCircuits = this.circuitsService.getCurrentCircuits();
    this.allCircuits = this.circuitsService.getAllCircuits();
  }

}
