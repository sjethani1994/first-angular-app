import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { NewTaskComponent } from './new-task/new-task.component';
import { type NewTaskData } from './task.model';
import { CardComponent } from '../../shared/card/card.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  imports: [CommonModule, NewTaskComponent, CardComponent, DatePipe],
})
export class TasksComponent implements OnInit {
  masterService = inject(MasterService);
  public user: string | any = null;
  public tasks: any[] = [];
  public isAddTask: boolean = false;

  ngOnInit(): void {
    this.masterService.user$.subscribe((user) => {
      this.user = user; // Store the emitted userId
      this.loadTasks(); // Call the loadTasks method when userId changes
    });
  }

  public loadTasks(): void {
    if (this.user !== null) {
      this.masterService.getTasks().subscribe((tasks) => {
        this.tasks = tasks.filter((task) => task.userId === this.user?.id);
      });
      this.isAddTask = false;
    } else {
      this.tasks = []; // Optionally, clear tasks if userId is null
    }
  }

  public completeTask(currentTask: any): void {
    this.masterService.completeTask(currentTask.id);
    this.loadTasks(); // Reload tasks after completing one
  }

  public addTask() {
    this.isAddTask = true;
  }

  onCloseDialog(): void {
    this.isAddTask = false;
  }
}
