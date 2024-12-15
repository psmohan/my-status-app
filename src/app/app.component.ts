import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './services/spinner.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  spinnerStatus$: Observable<boolean> = this.spinnerService.getSpinnerStatus();

  constructor(private spinnerService: SpinnerService) {}

  ngOnInit() {}
}
