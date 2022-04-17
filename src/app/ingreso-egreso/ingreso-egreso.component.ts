import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { IngresoEgresoType } from '../model/ingreso-egreso';
import { OperationsService } from '../services/operations.service';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { UiState } from '../shared/ui.reducers';
import { Subscription } from 'rxjs';
import * as uiActions from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [],
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  ingresoEgresoForm!: FormGroup;
  type: IngresoEgresoType = 'ingreso';
  loading: boolean = false;
  subs: Subscription[] = [];
  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: OperationsService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.ingresoEgresoForm = this.fb.group({
      description: ['prueba', Validators.required],
      amount: [5, [Validators.required, Validators.min(1)]],
    });

    this.subs.push(
      this.store.select('ui').subscribe((ui: UiState) => {
        this.loading = ui.loading;
      })
    );
  }
  ngOnDestroy(): void {
    this.subs.map((sub) => sub.unsubscribe());
  }

  handleSubmit() {

    if (this.ingresoEgresoForm.invalid) return;
    const { description, amount } = this.ingresoEgresoForm.value;
    this.store.dispatch(uiActions.setLoading())
    this.ingresoEgresoService
      .create({ description, amount, type: this.type })
      ?.then((data) => {
        Swal.fire('Registro creado ', undefined, 'success');
        this.store.dispatch(uiActions.stopLoading())
      })
      .catch((e) => {
        Swal.fire('Error al guardar el ingreso', undefined, 'success');
        this.store.dispatch(uiActions.stopLoading())
      });
  }
}
