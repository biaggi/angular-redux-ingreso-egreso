import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { IngresoEgresoType } from '../model/ingreso-egreso';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { UiState } from '../shared/ui.reducers';
import { Subscription } from 'rxjs';

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
    private ingresoEgresoService: IngresoEgresoService,
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
    this.ingresoEgresoService
      .set({ description, amount, type: this.type })
      ?.then((data) => {
        Swal.fire('Registro creado ', undefined, 'success');
      })
      .catch((e) => {
        Swal.fire('Error al guardar el ingreso', undefined, 'success');
      });
  }
}
