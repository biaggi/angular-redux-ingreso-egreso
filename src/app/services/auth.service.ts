import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, take } from 'rxjs/operators';
import { createUser, UserModel } from '../model/user.model';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { setUser, unsetUser } from '../auth/auth.actions';
import { Subscription } from 'rxjs';
import { unsetItems } from '../ingreso-egreso/operation.actions';

export interface UserIface {
  name: string;
  email: string;
  password: string;
}
type OptionalUserModel = UserModel | null;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubscription: Subscription | undefined;
  private _user: OptionalUserModel = null;

  get user(): OptionalUserModel {
    return this._user;
  }

  // just to be able to use the same attribute name
  private set user(user) {
    this._user = user;
  }

  constructor(
    public auth: AngularFireAuth,
    public firestore: AngularFirestore,
    public store: Store<AppState>
  ) {}

  createUser(user: UserIface) {
    const { email, password, name } = user;
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const { uid, email } = user.user!;
        const newUser = createUser(uid, name, email);
        return this.firestore.doc(this.getDoc(uid)).set(newUser);
      });
  }

  initAuthListener() {
    this.auth.authState.subscribe(async (user) => {
      if (user) {
        this.userSubscription = this.firestore
          .doc(this.getDoc(user.uid))
          .valueChanges()
          .subscribe((fsUser) => {
            this.user = { ...(fsUser as UserModel) };

            this.store.dispatch(
              setUser({
                user: this.user,
              })
            );
          });
        return this.userSubscription;
      }
      this.user = null;
      this.userSubscription?.unsubscribe();
      await this.store.dispatch(unsetItems());
      return this.store.dispatch(unsetUser());
    });
  }

  private userDestructionSequence() {

  }

  login(user: { email: string; password: string }) {
    const { email, password } = user;
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(map((fbUser) => fbUser !== null));
  }
  private getDoc(uid: string) {
    return `${uid}/usuario`;
  }
}
