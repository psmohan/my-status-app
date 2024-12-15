import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private firestore: AngularFirestore) {}

  getServices(): Observable<any[]> {
    return this.firestore
      .collection('services')
      .valueChanges({ idField: 'id' });
  }

  addService(service: any): Observable<any> {
    return new Observable((observer) => {
      this.firestore
        .collection('services')
        .add(service)
        .then(() => observer.next('Service added'))
        .catch((error) => observer.error(error));
    });
  }

  deleteService(serviceId: string): Observable<void> {
    return new Observable((observer) => {
      this.firestore
        .collection('services')
        .doc(serviceId)
        .delete()
        .then(() => observer.next())
        .catch((error) => observer.error(error));
    });
  }

  updateServiceStatus(serviceId: string, status: string): Observable<void> {
    return new Observable((observer) => {
      this.firestore
        .collection('services')
        .doc(serviceId)
        .update({ status })
        .then(() => observer.next())
        .catch((error) => observer.error(error));
    });
  }
}
