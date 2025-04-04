import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../delete-confirmation.component';
import { MatIconModule } from '@angular/material/icon';





@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatDialogModule, MatIconModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  

  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  tasks: Task[] = [];

  ngOnInit(): void {
    this.loadTasks();
  }
  
  loadTasks(): void {
    this.taskService.getTasks().subscribe((data: Task[]) => {
      this.tasks = data;
    });
  }
  deleteTask(id: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.taskService.deleteTask(id).subscribe(() => {
          this.loadTasks(); 
        });
      }
    });
  }
  
  
  
}


