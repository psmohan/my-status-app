import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ServiceDialogComponent } from '../services-dialog/services-dialog.component';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-service',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss'],
})
export class ServiceComponent implements OnInit {
  services: any[] = [];

  displayedColumns = ['name', 'status', 'actions'];

  status = [
    'Operational',
    'Degraded Performance',
    'Partial Outage',
    'Major Outage',
  ];

  constructor(
    private serviceService: ServiceService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.loadServices();
  }

  // Fetch services from the service service
  loadServices(): void {
    this.spinnerService.show();
    this.serviceService.getServices().subscribe(
      (data) => {
        this.spinnerService.hide();
        this.services = data;
      },
      (error) => {
        this.spinnerService.hide();
        this.snackBar.open('Failed to load services', 'Close', {
          duration: 3000,
        });
      }
    );
  }

  // Open dialog to add a new service
  openServiceDialog(): void {
    const dialogRef = this.dialog.open(ServiceDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.spinnerService.show();
        this.serviceService.addService(result).subscribe(
          () => {
            this.spinnerService.hide();
            this.loadServices(); // Reload services after adding a new one
            this.snackBar.open('Service added successfully!', 'Close', {
              duration: 3000,
            });
          },
          (error) => {
            this.spinnerService.hide();
            this.snackBar.open('Failed to add service', 'Close', {
              duration: 3000,
            });
          }
        );
      }
    });
  }

  // Update service status
  updateServiceStatus(serviceId: string, status: string): void {
    this.spinnerService.show();
    this.serviceService.updateServiceStatus(serviceId, status).subscribe(
      () => {
        this.spinnerService.hide();
        this.snackBar.open('Service status updated successfully', 'Close', {
          duration: 3000,
        });
        this.loadServices(); // Reload services after updating
      },
      (error) => {
        this.spinnerService.hide();
        this.snackBar.open('Failed to update service status', 'Close', {
          duration: 3000,
        });
      }
    );
  }

  // Delete a service
  deleteService(serviceId: string): void {
    this.spinnerService.show();
    this.serviceService.deleteService(serviceId).subscribe(
      () => {
        this.snackBar.open('Service deleted successfully', 'Close', {
          duration: 3000,
        });
        this.spinnerService.hide();
        this.loadServices(); // Reload services after deleting
      },
      (error) => {
        this.spinnerService.hide();
        this.snackBar.open('Failed to delete service', 'Close', {
          duration: 3000,
        });
      }
    );
  }
}
