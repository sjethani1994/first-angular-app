import { Component, inject, OnChanges, OnInit } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TasksComponent } from '../tasks/tasks.component';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UserComponent, CommonModule, RouterOutlet, TasksComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  public componentsToLoad: any = [UserComponent];
  public showTask: number | null = null; // This now represents the user ID or null

  private masterService = inject(MasterService);

  ngOnInit(): void {
    this.masterService.userId$.subscribe((id) => {
      this.showTask = id;
    });
  }
}
