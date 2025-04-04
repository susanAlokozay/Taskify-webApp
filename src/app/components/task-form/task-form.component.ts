import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TaskService, Task } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  taskForm!: FormGroup;
  editMode = false;
  taskId!: number;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      completed: [false]
    });

    // Check if it's edit mode
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.editMode = true;
        this.taskId = +idParam;
        this.taskService.getTaskById(this.taskId).subscribe(task => {
          if (task) {
            this.taskForm.patchValue(task);
          }
        });
      }
    });

    // Watch for changes (optional)
    this.taskForm.valueChanges.subscribe(values => {
      console.log('Form changed:', values);
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;

      if (this.editMode) {
        const updatedTask: Task = {
          id: this.taskId,
          ...formValue
        };

        this.taskService.updateTask(updatedTask).subscribe(() => {
          alert('Task updated!');
          this.router.navigate(['/tasks']);
        });

      } else {
        const newTask: Task = {
          id: Date.now(),
          ...formValue
        };

        this.taskService.addTask(newTask).subscribe(() => {
          alert('Task added!');
          this.router.navigate(['/tasks']);
        });
      }
    }
  }
}

