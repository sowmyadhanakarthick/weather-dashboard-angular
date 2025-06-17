import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // ✅ only RouterOutlet here
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {}
