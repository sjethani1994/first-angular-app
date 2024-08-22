import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  imports: [CommonModule],
})
export class TasksComponent implements OnInit {
  masterService = inject(MasterService);
  public user: string | any = null;
  public tasks: any[] = [];

  ngOnInit(): void {
    this.masterService.user$.subscribe((user) => {
      this.user = user; // Store the emitted userId
      this.filterTask(); // Call the filterTask method when userId changes
    });
  }

  public filterTask(): void {
    if (this.user !== null) {
      this.tasks = this.masterService
        .getTasks()
        .filter((task) => task.userId === this.user.id);
    } else {
      this.tasks = []; // Optionally, clear tasks if userId is null
    }
  }
}
