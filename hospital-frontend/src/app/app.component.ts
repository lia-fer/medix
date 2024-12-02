import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { DataSeederService } from './services/data-seeder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule, CommonModule],
  standalone: true
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  constructor(
    public authService: AuthService,
    private router: Router,
    private dataSeeder: DataSeederService
  ) {}

  ngOnInit() {
    // Seed initial data
    this.dataSeeder.seedData();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}