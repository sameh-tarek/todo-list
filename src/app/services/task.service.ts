import { Injectable } from '@angular/core';
import { Task } from "../models/task.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private localStorageKey = 'tasks';
  private tasks: Task[] = [];

  constructor() {
    const storedTasks = localStorage.getItem(this.localStorageKey);
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }

  private updateLocalStorage(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.tasks));
  }

  getTasks(): Task[] {
    return this.tasks.filter(task => !task.deleted);
  }

  addTask(task: Task): void {
    this.tasks.push(task);
    this.updateLocalStorage();
    window.location.reload();
  }

  deleteTask(task: Task): void {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks[index].deleted = true;
      this.updateLocalStorage();
      window.location.reload();
    }
  }

  updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex(task => task === updatedTask);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.updateLocalStorage();
    }
  }

  updateTaskCompletion(task: Task): void {
    const index = this.tasks.findIndex(t => t === task);
    if (index !== -1) {
      this.tasks[index] = { ...task, completed: task.completed };
      this.updateLocalStorage();
    }
  }
}
