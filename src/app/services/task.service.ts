import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks: Task[] = [
    { id: 1, title: 'Learn Angular', description: 'Basics of Angular', completed: false },
    { id: 2, title: 'Build a project', description: 'Use Angular CLI and components', completed: true }
  ];

  constructor() {}

  getTasks(): Observable<Task[]> {
    return of(this.tasks);
  }

  addTask(task: Task): Observable<void> {
    this.tasks.push(task);
    return of();
  }
  getTaskById(id: number): Observable<Task | undefined> {
    return of(this.tasks.find(task => task.id === id));
  }
  
  updateTask(updatedTask: Task): Observable<void> {
    const index = this.tasks.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
    }
    return of();
  }
  deleteTask(id: number): Observable<void> {
    this.tasks = this.tasks.filter(task => task.id !== id);
    return of();
  }
  
  


  
}
