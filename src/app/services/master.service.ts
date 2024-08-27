import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DUMMY_USERS } from '../pages/user/dummy_users';
import { DUMMY_TASKS } from '../pages/tasks/dummy-tasks';
import { NewTaskData } from '../pages/tasks/task.model';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  // Initialize the BehaviorSubject to hold the current user.
  private user = new BehaviorSubject<any | null>(null);

  // Initialize the BehaviorSubject to hold the tasks, starting with dummy data.
  private tasks = new BehaviorSubject<any[]>(DUMMY_TASKS);

  constructor(private http: HttpClient) {}

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
    return this.tasks.asObservable();
  }

  // Method to fetch pin code details for a given city using an API.
  public getPinCode(city: string): Observable<any> {
    const url = `https://api.postalpincode.in/postoffice/${city}`;
    return this.http.get(url).pipe(
      map((response: any) => response[0].PostOffice), // Extract the PostOffice data from the API response
      map((postOffices: any[]) =>
        postOffices.find(
          (postOffice) =>
            postOffice.District.toLowerCase() === city.toLowerCase() // Find the post office in the specified district
        )
      )
    );
  }

  // Method to remove a task by its ID.
  public completeTask(taskId: string): void {
    const updatedTasks = this.tasks.value.filter((task) => task.id !== taskId);
    this.tasks.next(updatedTasks); // Update the tasks BehaviorSubject with the filtered tasks.
  }

  // Method to add a new task to the task list.
  public addTask(task: NewTaskData): void {
    const updatedTasks = [
      ...this.tasks.value, // Spread the existing tasks
      {
        id: new Date().getTime().toString(), // Generate a unique ID based on the current timestamp
        userId: this.user.value?.id, // Assign the current user's ID to the new task
        title: task.title,
        summary: task.summary,
        date: task.date,
      },
    ];
    this.tasks.next(updatedTasks); // Update the tasks BehaviorSubject with the new task list.
  }
}
