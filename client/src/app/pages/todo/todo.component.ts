import { Component, OnInit } from '@angular/core';
import {
  ITodoStatus,
  TodoCardComponent,
} from '../../shared/components/todo-card/todo-card.component';
import { TodoService } from '../../core/services/todo.service';
import { ITodo } from '../../core/models/to-do-model';
import { SlidePanelComponent } from '../../shared/ui/panel/panel.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [TodoCardComponent, SlidePanelComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit {
  todoForm!: FormGroup;
  todos: ITodo[] = [];
  todoStatus = ITodoStatus;
  isSlidePanelOpen = false;
  todoId: number | null = null;
  filterByStatus = ''; // set the default filter as blank, since its a string.
  constructor(private todoService: TodoService, private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      status: new FormControl('OPEN', [Validators.required]),
    });
  }


  ngOnInit(): void {
    this.getAllTodos();
  }

  getAllTodos() {
    this.todoService.getAllTodo(this.filterByStatus).subscribe({
      next: (response) => {
        console.log({ response, todos: response });
        this.todos = response || [];
      },
    });
  }

  openSlidePanel() {
    this.isSlidePanelOpen = true;
  }

  onCloseSlidePanel() {
    this.isSlidePanelOpen = false;
  }

  onFilterByStatus(status: string) {
    console.log(status);
    this.filterByStatus = status;
    this.getAllTodos();
  }

  onSubmit() {
    if (this.todoForm.valid) {
      if (this.todoId) { // we update the todo based on the existing id.
        this.todoService
          .updateTodo(this.todoId, this.todoForm.value)
          .subscribe({
            next: (response) => {
              this.getAllTodos();
              this.onCloseSlidePanel();
            },
          });
      } else { // we create the new todo.
        this.todoService.addTodo(this.todoForm.value).subscribe({
          next: (response) => {
            this.getAllTodos();
            this.onCloseSlidePanel();
          },
        });
      }
    } else {
      this.todoForm.markAllAsTouched();
    }
  }

  //we load the current todo and fill it in the form
  onLoadTodoForm(item: ITodo) {
    this.todoId = item.id!!;
    this.todoForm.patchValue({ // we need to fill the form with the current todo in order to modidy it.
      title: item.title,
      description: item.description,
      status: item.status,
    });
    this.openSlidePanel();
  }
}