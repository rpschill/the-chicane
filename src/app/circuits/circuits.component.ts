import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { CircuitsService } from './circuits.service';
import { SEASONS } from '../constants/seasons';
import { Observable } from 'rxjs';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'chi-circuits',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    TabViewModule,
    CardModule,
    ButtonModule,
    CascadeSelectModule,
  ],
  templateUrl: './circuits.component.html',
  styleUrl: './circuits.component.scss'
})
export class CircuitsComponent implements OnInit {

  private readonly circuitsService = inject(CircuitsService);

  public currentCircuits: Observable<any> = new Observable();
  public allCircuits: Observable<any> = new Observable();

  public seasonList: any[] | undefined = SEASONS;
  public selectedSeason: string = '';
  public formGroup!: FormGroup;

  ngOnInit() {
    this.currentCircuits = this.circuitsService.getCurrentCircuits();
    this.allCircuits = this.circuitsService.getAllCircuits();

    this.formGroup = new FormGroup({
      selectedSeason: new FormControl<object | null>(null)
    });

    // this.formGroup.valueChanges
    //   .subscribe((formValue) => {
    //     this.onSeasonChange(formValue);
    //   })
  }

  onSeasonChange(formValue: any) {
    if (!formValue.selectedSeason || formValue.selectedSeason.value === '') {
      this.allCircuits = this.circuitsService.getAllCircuits();
    } else {
      this.allCircuits = this.circuitsService.getCircuitsBySeason(formValue.selectedSeason.value);
    }
  }
}
