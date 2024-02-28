import { Component, Input } from '@angular/core';
import { Task } from "../../models/task.model";
import { TaskService } from "../../services/task.service";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  @Input() task!: Task;
  editing: boolean = false;
  editedName: string = '';

  constructor(private taskService: TaskService) { }

  deleteTask(): void {
    const index = this.taskService.getTasks().indexOf(this.task);
    if (index !== -1) {
      this.taskService.deleteTask(index);
    }
  }

  editTask(): void {
    this.editing = true;
    this.editedName = this.task.name;
  }

  saveEditedTask(): void {
    this.task.name = this.editedName;
    this.editing = false;
    this.taskService.updateTask(this.task);
  }

  cancelEdit(): void {
    this.editing = false;
  }

  updateTaskCompletion(): void {
    this.taskService.updateTaskCompletion(this.task);
  }
}
