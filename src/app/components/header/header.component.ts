import { Component } from '@angular/core';
import {TaskService} from "../../services/task.service";
import {Task} from "../../models/task.model";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  taskName: string = '';

  constructor(private taskService: TaskService) { }

  addTask(): void {
    if (this.taskName.trim()) {
      const task: Task = {
        name: this.taskName,
        creator: 'Sameh Tarek',
        creationDate: new Date(),
        completed: false,
        deleted:false
      };
      this.taskService.addTask(task);
      this.taskName = '';
    }
  }
}
