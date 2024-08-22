import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-current-user',
  standalone: true,
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentUserComponent {
  selectedUser = input({
    name: String,
    avatar: String,
  });
}
