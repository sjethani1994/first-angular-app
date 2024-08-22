import { CommonModule } from '@angular/common';
import { MasterService } from '../../services/master.service';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { CurrentUserComponent } from './current-user/current-user.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, CurrentUserComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  public usersList: any;
  public activeIndex: number | null = null;
  public selectedUser: any = signal(null);
  constructor(private masterService: MasterService) {}

  ngOnInit(): void {
    this.usersList = this.masterService.getUsers();
  }

  selectUser(index: number, currentItem: any): void {
    this.activeIndex = index;
    this.selectedUser.set({
      name: currentItem.name,
      avatar: computed(() => 'assets/' + currentItem.avatar),
    });

    this.masterService.updateUserId(currentItem.id);
  }

  public get imagePath(): string {
    return 'assets/';
  }
}
