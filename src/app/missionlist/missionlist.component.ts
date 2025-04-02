import { Component, OnInit } from '@angular/core';
import { SpacexService } from '../spacex.service';
import { Mission } from '../mission';
import { MissionFilterComponent } from '../missionfilter/missionfilter.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-missionlist',
  standalone: true,
  imports: [
    CommonModule,
    MissionFilterComponent,
    MatListModule,
    MatCardModule
  ],
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css']
})
export class MissionListComponent implements OnInit {
  missions: Mission[] = [];
  allMissions: Mission[] = [];
  errorMessage: string | null = null;
  yearFilter: string = '';
  launchSuccessFilter: boolean | null = null;
  landingSuccessFilter: boolean | null = null;

  constructor(
    private spacexService: SpacexService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchMissions();
  }

  fetchMissions(launchYear?: string) {
    this.spacexService.getLaunches(launchYear).subscribe({
      next: (data) => {
        console.log('API Response:', data);
        this.allMissions = data;
        this.applyFilters();
      },
      error: (err) => {
        this.errorMessage = 'Failed to load missions. Please try again later.';
        console.error('Error fetching SpaceX launches:', err);
      }
    });
  }

  filterByYear(year: string) {
    console.log('Year filter received in MissionListComponent:', year);
    this.yearFilter = year;
    this.fetchMissions(year || undefined);
  }

  filterByLaunchSuccess(success: boolean | null) {
    console.log('Launch filter applied:', success);
    this.launchSuccessFilter = success;
    this.applyFilters();
  }

  filterByLandingSuccess(success: boolean | null) {
    console.log('Landing filter applied:', success);
    this.landingSuccessFilter = success;
    this.applyFilters();
  }

  resetFilters() {
    console.log('Resetting filters...');
    this.yearFilter = '';
    this.launchSuccessFilter = null;
    this.landingSuccessFilter = null;
    this.fetchMissions();
  }

  navigateToDetails(flightNumber: number) {
    this.router.navigate(['/mission', flightNumber]);
  }

  private applyFilters() {
    let filteredMissions = [...this.allMissions].filter(m => m !== null && m !== undefined);

    // Filter by launch success
    if (this.launchSuccessFilter !== null) {
      filteredMissions = filteredMissions.filter(m => {
        if (!m) return false;
        const matches = m.launch_success === this.launchSuccessFilter;
        console.log(`Mission: ${m.mission_name}, Launch Success: ${m.launch_success}, Filter: ${this.launchSuccessFilter}, Matches: ${matches}`);
        return matches;
      });
    }

    // Filter by landing success
    if (this.landingSuccessFilter !== null) {
      filteredMissions = filteredMissions.filter(m => {
        if (!m) return false;
        const landingSuccess = m.rocket.first_stage.cores[0]?.land_success ?? null;
        const matchesFilter = landingSuccess === this.landingSuccessFilter || (this.landingSuccessFilter === false && landingSuccess === null);
        console.log(`Mission: ${m.mission_name}, Landing Success: ${landingSuccess}, Filter: ${this.landingSuccessFilter}, Matches: ${matchesFilter}`);
        return matchesFilter;
      });
    }

    // Log mission patch URLs for debugging
    filteredMissions.forEach(m => {
      if (m && m.mission_name && m.links) {
        console.log(`Mission: ${m.mission_name}, Patch URL: ${m.links.mission_patch_small}`);
      } else {
        console.log('Skipping invalid mission:', m);
      }
    });

    console.log('Filtered Missions:', filteredMissions);
    this.missions = filteredMissions;
  }
}