import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type NewTaskData } from '../task.model';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() add = new EventEmitter<NewTaskData>();
  public title: string = '';
  public summary: string = '';
  public dueDate: string = '';

  public onCancel() {
    this.cancel.emit();
  }

  public onSubmit() {
    if (this.title && this.summary && this.dueDate) {
      this.add.emit({
        title: this.title,
        summary: this.summary,
        date: this.dueDate,
      });
    }
  }
}
