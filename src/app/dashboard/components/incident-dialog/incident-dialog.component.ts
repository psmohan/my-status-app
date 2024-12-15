import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IncidentService } from '../../services/incident.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-incident-dialog',
  templateUrl: './incident-dialog.component.html',
  styleUrls: ['./incident-dialog.component.scss'],
})
export class IncidentDialogComponent {
  incident = {
    name: '',
    description: '',
    issue: 'Degraded Performance',
    status: 'Pending',
  };
  issues = [
    'Operational',
    'Degraded Performance',
    'Partial Outage',
    'Major Outage',
  ];
  statuses = ['Resolved', 'Pending'];

  constructor(
    private dialogRef: MatDialogRef<IncidentDialogComponent>,
    private incidentService: IncidentService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  /**
   * Validates the incident fields and sends the data to the backend.
   * On success, shows a confirmation message and closes the dialog.
   * On failure, shows an error notification.
   */
  saveIncident(): void {
    if (
      this.incident.name.trim() === '' ||
      this.incident.description.trim() === ''
    ) {
      // Ensures all required fields are filled before proceeding
      this.snackBar.open('Please fill in all fields!', 'Close', {
        duration: 3000,
      });
      return;
    }

    // Calls the service to save the incident
    this.incidentService.addIncident(this.incident).subscribe(
      (response) => {
        // Success: notify the user and close the dialog
        this.snackBar.open('Incident added successfully!', 'Close', {
          duration: 3000,
        });
        this.dialogRef.close();
      },
      (error) => {
        // Failure: notify the user of the error
        this.snackBar.open('Error adding incident.', 'Close', {
          duration: 3000,
        });
      }
    );
  }

  /**
   * Closes the dialog without saving changes.
   */
  closeDialog(): void {
    this.dialogRef.close();
  }
}
