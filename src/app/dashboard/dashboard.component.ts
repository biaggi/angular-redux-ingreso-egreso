import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { UserModel } from '../model/user.model';
import { AuthState } from '../auth/auth.reducer';
import { OperationsService } from '../services/operations.service';
import { OperationModel } from '../model/ingreso-egreso';
import { setItems, unsetItems } from '../ingreso-egreso/operation.actions';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  user: UserModel | undefined;
  operationsSub!: Subscription;
  constructor(
    private store: Store<AppState>,
    private operationService: OperationsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.store.select('auth').subscribe((auth: AuthState) => {
      console.log('auth change', auth);
      if (auth.user) {
        this.user = auth.user;
        if (!this.operationsSub?.closed) this.operationsSub?.unsubscribe();
        this.operationsSub = this.operationService
          .initOperationsListener(this.user.uid)
          .subscribe((items) => {
            this.store.dispatch(setItems({ items }));
          });
      }
    });
  }

  /** basically this will be destroyed on logout */
  ngOnDestroy(): void {
    this.store.dispatch(unsetItems());
    this.operationsSub?.unsubscribe();
  }
}
