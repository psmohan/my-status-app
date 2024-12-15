import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceComponent } from './components/services-list/services-list.component';
import { IncidentComponent } from './components/incidents-list/incidents-list.component';

// implemented the lazy routing.
const routes: Routes = [
  { path: '', component: ServiceComponent },
  { path: 'services', component: ServiceComponent },
  { path: 'incidents', component: IncidentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
