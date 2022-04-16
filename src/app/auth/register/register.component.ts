import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";
import { Subscription } from 'rxjs';
import { AppState } from '../../app.reducer';
import { Store } from "@ngrx/store";
import { setLoading, stopLoading } from '../../shared/ui.actions';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styles: [],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  subs: Subscription[] = [];
  isLoading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
    const sub = this.store.select('ui').subscribe((ui) => {
      this.isLoading = ui.loading;
    })
    this.subs.push(sub);
  }
  handleSubmit() {
    if (this.registerForm.invalid) return;
    // Swal.fire({
    //   title: "Espere por favor",
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });
    this.store.dispatch(setLoading())

    this.authService
      .createUser(this.registerForm.value)
      .then((auth) => {
        // Swal.close();
        this.store.dispatch(stopLoading())
        this.router.navigate(["/"]);
      })
      .catch((e) => {
        this.store.dispatch(stopLoading())
        Swal.fire({
          icon: "error",
          title: e.message,
          text: "Something went wrong!",
          footer: '<a href="">Why do I have this issue?</a>',
        });
      });
  }
}
