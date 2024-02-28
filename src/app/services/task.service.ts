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
    return this.tasks;
  }

  addTask(task: Task): void {
    this.tasks.push(task);
    this.updateLocalStorage();
  }

  deleteTask(index: number): void {
    this.tasks.splice(index, 1);
    this.updateLocalStorage();
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
