import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { setLoading, stopLoading } from "src/app/shared/ui.actions";
import Swal from "sweetalert2";
import { AppState } from '../../app.reducer';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: [],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  isLoading: boolean = false;
  subs: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ["biaggi@gmail.com", [Validators.required, Validators.email]],
      password: ["123456", Validators.required],
    });
    const sub = this.store.select('ui').subscribe(ui => {
      this.isLoading = ui.loading;
      console.log('loading', this.isLoading)
    })
    this.subs.push(sub);
  }

  ngOnDestroy(): void {
    this.subs.map(sub => sub.unsubscribe());
  }

  login() {
    if (this.loginForm.invalid) return;
    // Swal.fire({
    //   title: "Espere por favor",
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });
    this.store.dispatch(setLoading())
    this.authService
      .login(this.loginForm.value)
      .then((auth) => {
        console.log(auth);
        this.store.dispatch(stopLoading())
        // Swal.close();
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
