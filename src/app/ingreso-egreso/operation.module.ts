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
import { StoreModule } from '@ngrx/store';
import { operationReducer } from './operation.reducer';

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
    DashboardRoutesModule,
    StoreModule.forFeature('operations', operationReducer),
  ],
  exports: [],
})
export class OperationModule {}
