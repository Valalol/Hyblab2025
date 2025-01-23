import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credits',
  standalone: true,
  imports: [],
  templateUrl: './credits.component.html',
  styleUrl: './credits.component.scss'
})
export class CreditsComponent {
  constructor (public router: Router) {}
}
