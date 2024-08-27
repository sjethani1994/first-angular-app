import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type NewTaskData } from '../task.model';
import { MasterService } from '../../../services/master.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  @Output() closeDialog = new EventEmitter<void>();

  private masterService = inject(MasterService);

  public title: string = '';
  public summary: string = '';
  public dueDate: string = '';

  public onCloseDialog() {
    this.closeDialog.emit();
  }

  public onSubmit() {
    if (this.title && this.summary && this.dueDate) {
      this.masterService.addTask({
        title: this.title,
        summary: this.summary,
        date: this.dueDate,
      });
    }
    this.closeDialog.emit();
  }
}
