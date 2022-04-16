import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducer';
import { AuthService } from './services/auth.service';
import { setLoading } from './shared/ui.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private auth: AuthService) {
    this.auth.initAuthListener();
  }
}
