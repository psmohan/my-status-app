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

  saveIncident(): void {
    if (
      this.incident.name.trim() === '' ||
      this.incident.description.trim() === ''
    ) {
      this.snackBar.open('Please fill in all fields!', 'Close', {
        duration: 3000,
      });
      return;
    }
    this.incidentService.addIncident(this.incident).subscribe(
      (response) => {
        this.snackBar.open('Incident added successfully!', 'Close', {
          duration: 3000,
        });
        this.dialogRef.close();
      },
      (error) => {
        this.snackBar.open('Error adding incident.', 'Close', {
          duration: 3000,
        });
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
