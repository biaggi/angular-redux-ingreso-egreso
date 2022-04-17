import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { IngresoEgresoType } from '../model/ingreso-egreso';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [],
})
export class IngresoEgresoComponent implements OnInit {
  ingresoEgresoForm!: FormGroup;
  type: IngresoEgresoType = 'ingreso';
  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit() {
    this.ingresoEgresoForm = this.fb.group({
      description: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
    });
  }

  handleSubmit() {
    console.log(this.ingresoEgresoForm.valid);
    console.log(this.ingresoEgresoForm.value);
    if (this.ingresoEgresoForm.invalid) return;
    const { description, amount } = this.ingresoEgresoForm.value;
    this.ingresoEgresoService
      .set({ description, amount, type: this.type })
      ?.then((data) => {
        console.log(data);
        Swal.fire('Registro creado ', undefined, 'success')
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
