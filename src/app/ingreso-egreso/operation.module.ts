import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { SortModule } from '../pipes/sort.module';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgChartsModule } from 'ng2-charts';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';

@NgModule({
  declarations: [
    DetalleComponent,
    EstadisticaComponent,
    IngresoEgresoComponent,
    DashboardComponent,
  ],
  imports: [
    SortModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    NgChartsModule,
    DashboardRoutesModule
  ],
  exports: [],
})
export class OperationModule {}
