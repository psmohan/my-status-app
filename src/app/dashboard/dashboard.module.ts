import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceComponent } from './components/services-list/services-list.component';
import { IncidentComponent } from './components/incidents-list/incidents-list.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { IncidentDialogComponent } from './components/incident-dialog/incident-dialog.component';
import { ServiceDialogComponent } from './components/services-dialog/services-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    ServiceComponent,
    IncidentComponent,
    IncidentDialogComponent,
    ServiceDialogComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ],
})
export class DashboardModule {}
