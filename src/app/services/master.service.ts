import { Injectable } from '@angular/core';
import { DUMMY_USERS } from '../pages/user/dummy_users';
import { BehaviorSubject, find, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DUMMY_TASKS } from '../pages/tasks/dummy-tasks';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(private http: HttpClient) {}

  private userId = new BehaviorSubject<number | null>(null);

  // Observable to expose the userId as a stream
  public userId$ = this.userId.asObservable();

  public updateUserId(id: number | null): void {
    this.userId.next(id);
  }

  getUsers() {
    return DUMMY_USERS;
  }

  getTasks() {
    return DUMMY_TASKS;
  }

  getPinCode(city: string): Observable<any> {
    const url = `https://api.postalpincode.in/postoffice/${city}`;
    return this.http.get(url).pipe(
      map((response: any) => response[0].PostOffice),
      map((postOffices: any[]) =>
        postOffices.find(
          (postOffice) =>
            postOffice.District.toLowerCase() === city.toLowerCase()
        )
      )
    );
  }
}
