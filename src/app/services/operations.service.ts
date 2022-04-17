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
const COLLECTION = 'items';

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

  private getItem(userUid: string, docUid: string): AngularFirestoreDocument<OperationModel> {
    return this.firestore.doc(`${userUid}/${DOCUMENT_NAME}/${COLLECTION}/${docUid}`);
  }

  create(operation: {
    description: string;
    amount: number;
    type: IngresoEgresoType;
  }) {
    const user = this.authService.user;
    if (!user) return null;
    const { uid } = user;

    return this.getDoc(uid).collection(COLLECTION).add(operation);
  }

  delete(docUid: string) {
    const user = this.authService.user;
    if (!user) return null;
    const { uid } = user;

    return this.getItem(uid, docUid).delete();
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
