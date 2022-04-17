import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { OperationState, AppStateOperation } from '../operation.reducer';
import { OperationModel } from '../../model/ingreso-egreso';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

interface StatsState {
  incomes: number;
  outcomes: number;
  totalIncome: number;
  totalOutcome: number;
}

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [],
})
export class EstadisticaComponent implements OnInit {
  subs: Subscription[] = [];

  stats: StatsState = {
    incomes: 0,
    outcomes: 0,
    totalIncome: 0,
    totalOutcome: 0,
  };

  constructor(private store: Store<AppStateOperation>) {}

  ngOnInit() {
    this.subs.push(
      this.store.select('operations').subscribe((operation: OperationState) => {
        const newStats = {
          incomes: 0,
          outcomes: 0,
          totalIncome: 0,
          totalOutcome: 0,
        };

        for (const item of operation.items) {
          if (item.type == 'ingreso') {
            newStats.incomes++;
            newStats.totalIncome += item.amount;
          }
          if (item.type == 'egreso') {
            newStats.outcomes++;
            newStats.totalOutcome += item.amount;
          }
        }
        this.stats = newStats;
        this.doughnutChartData = {
          labels: this.doughnutChartLabels,
          datasets: [
            { data: [this.stats.totalIncome, this.stats.totalOutcome] },
          ],
        };
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.map((item) => item.unsubscribe());
  }

  // chart

  // Doughnut
  public doughnutChartLabels: string[] = ['ingresos-gastos'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{ data: [this.stats.totalIncome, this.stats.totalOutcome] }],
  };
  public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
  }
}
