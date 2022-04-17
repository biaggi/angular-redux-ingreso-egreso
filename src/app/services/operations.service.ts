import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  QuerySnapshot,
} from '@angular/fire/compat/firestore';
import { OperationModel, IngresoEgresoType } from '../model/ingreso-egreso';
import { AuthService } from './auth.service';
import { UserModel } from '../model/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const DOCUMENT_NAME = 'ingresos-egresos';

@Injectable({
  providedIn: 'root',
})
export class OperationsService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  private getDoc(uid: string): AngularFirestoreDocument<OperationModel> {
    return this.firestore.doc(`${uid}/${DOCUMENT_NAME}`);
  }
  set(operation: {
    description: string;
    amount: number;
    type: IngresoEgresoType;
  }) {
    const user = this.authService.user;
    if (!user) return null;
    const { uid } = user;

    return this.getDoc(uid).collection('items').add(operation);
  }

  initOperationsListener(uid: string): Observable<OperationModel[]> {
    return this.getDoc(uid)
      .collection('items')
      .snapshotChanges()
      .pipe(
        map((snapshot) =>
          snapshot.map(({ payload }) => ({
            ...payload.doc.data(),
            uid: payload.doc.id,
          } as OperationModel))
        )
      );
   }
}
