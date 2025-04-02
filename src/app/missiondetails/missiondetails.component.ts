import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpacexService } from '../spacex.service';
import { Mission } from '../mission';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-missiondetails',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.css']
})
export class MissionDetailsComponent implements OnInit {
  mission: Mission | null = null;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private spacexService: SpacexService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.spacexService.getLaunchById(+id).subscribe({
        next: (data) => {
          this.mission = data;
        },
        error: (err) => {
          this.errorMessage = 'Failed to load mission details. Please try again later.';
          console.error('Error fetching mission details:', err);
        }
      });
    }
  }
}