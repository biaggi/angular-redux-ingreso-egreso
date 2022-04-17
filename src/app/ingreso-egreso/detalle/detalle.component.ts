import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { OperationModel } from 'src/app/model/ingreso-egreso';
import { OperationsService } from '../../services/operations.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [],
})
export class DetalleComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  operations: OperationModel[] = [];

  constructor(
    private store: Store<AppState>,
    private operationsService: OperationsService
  ) {}

  ngOnInit() {
    this.subs.push(
      this.store.select('operations').subscribe((operations) => {
        this.operations = operations.items;
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.map((item) => item.unsubscribe());
  }

  delete(uid: string) {
    this.operationsService.delete(uid);
  }
}
