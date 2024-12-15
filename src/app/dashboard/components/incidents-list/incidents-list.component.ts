import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../../services/incident.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { IncidentDialogComponent } from '../incident-dialog/incident-dialog.component';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-incident',
  templateUrl: './incidents-list.component.html',
  styleUrls: ['./incidents-list.component.scss'],
})
export class IncidentComponent implements OnInit {
  incidents: any[] = [];

  displayedColumns = ['name', 'issues', 'status', 'actions'];
  issues = [
    'Operational',
    'Degraded Performance',
    'Partial Outage',
    'Major Outage',
  ];
  constructor(
    private incidentService: IncidentService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.loadIncidents();
  }

  // Fetch incidents from the incident service
  loadIncidents(): void {
    this.spinnerService.show();
    this.incidentService.getIncidents().subscribe(
      (data) => {
        this.incidents = data;
        this.spinnerService.hide();
      },
      (error) => {
        this.spinnerService.hide();
        this.snackBar.open('Failed to load incidents', 'Close', {
          duration: 3000,
        });
      }
    );
  }

  // Open dialog to add a new incident
  openIncidentDialog(): void {
    const dialogRef = this.dialog.open(IncidentDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.spinnerService.show();
        this.incidentService.addIncident(result).subscribe(
          () => {
            this.spinnerService.hide();
            this.loadIncidents(); // Reload incidents after adding a new one
            this.snackBar.open('Incident added successfully!', 'Close', {
              duration: 3000,
            });
          },
          (error) => {
            this.spinnerService.hide();
            this.snackBar.open('Failed to add incident', 'Close', {
              duration: 3000,
            });
          }
        );
      }
    });
  }

  // Resolve an incident
  resolveIncident(incidentId: string): void {
    this.spinnerService.show();
    this.incidentService.resolveIncident(incidentId).subscribe(
      () => {
        this.spinnerService.hide();
        this.snackBar.open('Incident status changed successfully', 'Close', {
          duration: 3000,
        });
        this.loadIncidents(); // Reload incidents after resolving
      },
      (error) => {
        this.spinnerService.hide();
        this.snackBar.open('Failed to resolve incident', 'Close', {
          duration: 3000,
        });
      }
    );
  }

  updateIssue(incident: any): void {
    const updatedIncident = {
      ...incident,
      issue: incident.issue,
      status: incident.status,
    }; // Copy object to update issue
    this.spinnerService.show();
    this.incidentService
      .updateIncident(incident.incidentId, updatedIncident)
      .subscribe(
        () => {
          this.spinnerService.hide();
          this.snackBar.open('Incident updated successfully', 'Close', {
            duration: 3000,
          });
        },
        (error) => {
          this.spinnerService.hide();
          this.snackBar.open('Failed to update incident', 'Close', {
            duration: 3000,
          });
        }
      );
  }

  // Delete an incident
  deleteIncident(incidentId: string): void {
    this.spinnerService.show();
    this.incidentService.deleteIncident(incidentId).subscribe(
      () => {
        this.snackBar.open('Incident deleted successfully', 'Close', {
          duration: 3000,
        });
        this.spinnerService.hide();
        this.loadIncidents(); // Reload incidents after deleting
      },
      (error) => {
        this.spinnerService.hide();
        this.snackBar.open('Failed to delete incident', 'Close', {
          duration: 3000,
        });
      }
    );
  }
}
