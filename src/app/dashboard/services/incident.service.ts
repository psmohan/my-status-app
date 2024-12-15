import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IncidentService {
  constructor(private firestore: AngularFirestore) {}

  // Fetch all incidents
  getIncidents(): Observable<any[]> {
    return this.firestore
      .collection('incidents')
      .valueChanges({ idField: 'id' });
  }

  // Add a new incident
  addIncident(incident: any): Observable<any> {
    return new Observable((observer) => {
      this.firestore
        .collection('incidents')
        .add(incident)
        .then(() => {
          observer.next('Incident added');
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  // Update an incident (status or other fields)
  updateIncident(incidentId: string, updatedData: any): Observable<void> {
    return new Observable((observer) => {
      this.firestore
        .collection('incidents')
        .doc(incidentId)
        .update(updatedData)
        .then(() => observer.next())
        .catch((error) => observer.error(error));
    });
  }

  // Mark an incident as resolved
  resolveIncident(incidentId: string): Observable<void> {
    return new Observable((observer) => {
      this.firestore
        .collection('incidents')
        .doc(incidentId)
        .update({ status: 'Resolved' })
        .then(() => observer.next())
        .catch((error) => observer.error(error));
    });
  }

  // Delete an incident
  deleteIncident(incidentId: string): Observable<void> {
    return new Observable((observer) => {
      this.firestore
        .collection('incidents')
        .doc(incidentId)
        .delete()
        .then(() => observer.next())
        .catch((error) => observer.error(error));
    });
  }
}
