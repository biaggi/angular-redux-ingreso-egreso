import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { createUser } from '../model/user.model';

export interface UserIface {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public auth: AngularFireAuth,
    public firestore: AngularFirestore
  ) {}

  createUser(user: UserIface) {
    const { email, password, name } = user;
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const { uid, email } = user.user!;
        const newUser = createUser(uid, name, email);
        return this.firestore.doc(`${uid}/usuario`).set(newUser);
      });
  }

  initAuthListener() {
    this.auth.authState.subscribe((user) => {
      console.log(user?.uid);
      console.log(user?.email);
    });
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
}
