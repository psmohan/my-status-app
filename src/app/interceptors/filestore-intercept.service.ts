import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  getDoc,
} from '@angular/fire/firestore';
import { SpinnerService } from '../services/spinner.service';
import { Observable, from } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirestoreInterceptorService {
  constructor(
    private firestore: Firestore,
    private loadingService: SpinnerService
  ) {}

  getCollection<T>(collectionName: string): Observable<any> {
    this.loadingService.show();
    const collectionRef = collection(this.firestore, collectionName);

    return collectionData(collectionRef, { idField: 'id' }).pipe(
      finalize(() => this.loadingService.hide())
    );
  }

  getDocument<T>(collectionName: string, docId: string): Observable<T> {
    this.loadingService.show();
    const docRef = doc(this.firestore, `${collectionName}/${docId}`);

    return from(getDoc(docRef).then((docSnap) => docSnap.data() as T)).pipe(
      finalize(() => this.loadingService.hide())
    );
  }
}
