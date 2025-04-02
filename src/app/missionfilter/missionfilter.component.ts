import { Component, EventEmitter, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'; // Added
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-missionfilter',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule, // Added
    FormsModule
  ],
  templateUrl: './missionfilter.component.html',
  styleUrls: ['./missionfilter.component.css']
})
export class MissionFilterComponent {
  @Output() filterYear = new EventEmitter<string>();
  @Output() filterLaunchSuccess = new EventEmitter<boolean | null>();
  @Output() filterLandingSuccess = new EventEmitter<boolean | null>();
  @Output() resetFilters = new EventEmitter<void>();

  year: string = '';
  launchSuccess: boolean | null = null;
  landingSuccess: boolean | null = null;

  filterMissions() {
    console.log('Year entered in filter:', this.year);
    this.filterYear.emit(this.year);
  }

  filterLaunch() {
    console.log('Launch filter changed:', this.launchSuccess);
    this.filterLaunchSuccess.emit(this.launchSuccess);
  }

  filterLanding() {
    console.log('Landing filter changed:', this.landingSuccess);
    this.filterLandingSuccess.emit(this.landingSuccess);
  }

  reset() {
    console.log('Reset button clicked in MissionFilterComponent');
    this.year = '';
    this.launchSuccess = null;
    this.landingSuccess = null;
    this.filterYear.emit(this.year);
    this.filterLaunchSuccess.emit(this.launchSuccess);
    this.filterLandingSuccess.emit(this.landingSuccess);
    this.resetFilters.emit();
  }
}