import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../model/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  subs: Subscription[] = [];
  user: UserModel | undefined | null;

  ngOnInit() {
    this.store.select('auth').subscribe(({user}) => {
      this.user = user;
    })
  }

  ngOnDestroy(): void {
    this.subs.map((item) => item.unsubscribe());
  }

  logout() {
    Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading();
      },
    });
    this.authService
      .logout()
      .then((data) => {
        Swal.close();
        this.router.navigate(['/login']);
      })
      .catch((e) => {
        Swal.fire({
          icon: 'error',
          title: e.message,
          text: 'Something went wrong!',
          footer: '<a href="">Why do I have this issue?</a>',
        });
      });
  }
}
