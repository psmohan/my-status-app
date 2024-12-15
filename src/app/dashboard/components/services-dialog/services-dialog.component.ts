import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from '../../services/service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-service-dialog',
  templateUrl: './services-dialog.component.html',
  styleUrls: ['./services-dialog.component.scss'],
})
export class ServiceDialogComponent {
  service = { name: '', status: 'Operational' };
  statuses = [
    'Operational',
    'Degraded Performance',
    'Partial Outage',
    'Major Outage',
  ];

  constructor(
    private dialogRef: MatDialogRef<ServiceDialogComponent>,
    private serviceService: ServiceService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  saveService(): void {
    if (this.service.name.trim() === '') {
      this.snackBar.open('Please enter a service name!', 'Close', {
        duration: 3000,
      });
      return;
    }
    this.serviceService.addService(this.service).subscribe(
      (response) => {
        this.snackBar.open('Service added successfully!', 'Close', {
          duration: 3000,
        });
        this.dialogRef.close();
      },
      (error) => {
        this.snackBar.open('Error adding service.', 'Close', {
          duration: 3000,
        });
        this.dialogRef.close();
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
