import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { NewTaskComponent } from './new-task/new-task.component';
import { type NewTaskData } from './task.model';
import { CardComponent } from "../../shared/card/card.component";

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
      this.filterTask(); // Call the filterTask method when userId changes
    });
  }

  public filterTask(): void {
    if (this.user !== null) {
      this.tasks = this.masterService
        .getTasks()
        .filter((task) => task.userId === this.user.id);
      this.isAddTask = false;
    } else {
      this.tasks = []; // Optionally, clear tasks if userId is null
    }
  }

  public completeTask(currentTask: any): void {
    if (this.tasks.length > 1) {
      this.tasks = this.tasks.filter((task) => task.id !== currentTask.id);
    } else {
      this.tasks = [];
    }
  }

  public addTask() {
    this.isAddTask = true;
  }

  onCancel(): void {
    this.isAddTask = false;
  }

  onAddTask(task: NewTaskData) {
    this.tasks.unshift({
      id: new Date().getTime().toString(),
      userId: this.user.id,
      title: task.title,
      summary: task.summary,
      date: task.date,
    });
    this.isAddTask = false;
  }
}
