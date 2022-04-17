import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { OperationModel } from 'src/app/model/ingreso-egreso';
import { OperationsService } from '../../services/operations.service';
import { AppStateOperation } from '../operation.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [],
})
export class DetalleComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  operations: OperationModel[] = [];

  constructor(
    private store: Store<AppStateOperation>,
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
