import { Component, Input } from '@angular/core';
import { ITodo } from '../../../core/models/to-do-model';

export type ITodoType = 'OPEN' | 'PROGRESS' | 'TESTING' | 'DONE';
export const ITodoStatus = ['OPEN', 'PROGRESS', 'TESTING', 'DONE'];

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
})
export class TodoCardComponent {
  @Input() type: ITodoType = 'OPEN';
  @Input() todo!: ITodo;

  ngOnInit() {
    console.log({ currentTodo: this.todo });
  }
}