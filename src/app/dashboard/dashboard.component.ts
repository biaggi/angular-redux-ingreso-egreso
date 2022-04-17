import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { UserModel } from '../model/user.model';
import { AuthState } from '../auth/auth.reducer';
import { OperationsService } from '../services/operations.service';
import { OperationModel } from '../model/ingreso-egreso';
import { setItems } from '../ingreso-egreso/operation.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  user: UserModel | undefined;

  constructor(
    private store: Store<AppState>,
    private operationService: OperationsService
  ) {}

  ngOnInit() {
    this.subs.push(
      this.store
        .select('auth')
        .pipe(filter((auth) => auth.user !== null))
        .subscribe((auth: AuthState) => {
          if (auth.user) {
            this.user = auth.user;
            this.operationService
              .initOperationsListener(this.user.uid)
              .subscribe((items) => {
                console.log(items);
                this.store.dispatch(setItems({items}))
              });
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subs.map((item) => item.unsubscribe());
  }
}
