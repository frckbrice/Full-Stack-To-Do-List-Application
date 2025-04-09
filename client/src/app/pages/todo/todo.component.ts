import { Component } from '@angular/core';
import { ITodoStatus, TodoCardComponent } from '../../shared/components/todo-card/todo-card.component';
import { TodoService } from '../../core/services/todo.service';
import { ITodo } from '../../core/models/to-do-model';
import { SlidePanelComponent } from '../../shared/ui/panel/panel.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo',
  imports: [TodoCardComponent, SlidePanelComponent, ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  todos: ITodo[] = [];
  todoForm!: FormGroup;
  isSlidePanelOpen = false;
  todoStatus = ITodoStatus;
  constructor(private toserService: TodoService, private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      status: new FormControl('OPEN', [Validators.required]),
    });
  }

  ngOnInit() {
    this.getAllTodos();
  }

  getAllTodos() {
    this.todos = this.toserService.getAllTodos();
  }

  onCloseSlidePanel() {
    this.isSlidePanelOpen = false;
  }

  openSlidePanel() {
    this.isSlidePanelOpen = true;
  }


  onSubmit() {
    if (this.todoForm.valid) {
    } else this.todoForm.markAllAsTouched();
  }
}
