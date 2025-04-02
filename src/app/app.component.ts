import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h1>COMP 3133 | Lab Test2 | SpaceX API</h1>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}