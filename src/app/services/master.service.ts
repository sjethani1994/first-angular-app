import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DUMMY_USERS } from '../pages/user/dummy_users';
import { NewTaskData } from '../pages/tasks/task.model';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  // Initialize the BehaviorSubject to hold the current user.
  private user = new BehaviorSubject<any | null>(null);

  // Initialize the BehaviorSubject to hold the tasks, starting with dummy data.
  private tasks = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      console.log(storedTasks);
      this.tasks.next(JSON.parse(storedTasks));
    }
  }

  // Observable to expose the user as a stream.
  public user$ = this.user.asObservable();

  // Method to update the current user.
  public updateUser(user: any | null): void {
    this.user.next(user);
  }

  // Method to get the list of users from the dummy data.
  public getUsers(): any[] {
    return DUMMY_USERS;
  }

  // Method to get the tasks as an observable.
  public getTasks(): Observable<any[]> {
    return this.tasks.asObservable().pipe(
      map((tasks) => tasks.filter((task) => !task.isCompleted)) // Filter out completed tasks
    );
  }

  // Method to remove a task by its ID.
  public completeTask(taskId: string): void {
    const updatedTasks = this.tasks.value.map((task) =>
      task.id === taskId ? { ...task, isCompleted: true } : task
    );
    this.tasks.next(updatedTasks);
    this.saveTasks(); // Save updated tasks to localStorage
  }

  // Method to add a new task to the task list.
  public addTask(task: NewTaskData): void {
    const newTask = {
      id: new Date().getTime().toString(),
      userId: this.user.value?.id,
      title: task.title,
      summary: task.summary,
      dueDate: task.date,
      isCompleted: false, // Default to false when adding a new task
    };
    const updatedTasks = [...this.tasks.value, newTask];
    this.tasks.next(updatedTasks);
    this.saveTasks(); // Save updated tasks to localStorage
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks.value));
  }
}
