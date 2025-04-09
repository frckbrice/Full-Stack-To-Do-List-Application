import { Injectable } from '@angular/core';
import { ITodo } from '../models/to-do-model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: ITodo[] = [
    {
      id: 1,
      title: 'Todo 1',
      description: 'Description 1',
      status: 'OPEN',
      created_at: '2023-01-01',
      updated_at: '2023-01-01'
    },
    {
      id: 2,
      title: 'Todo 2',
      description: 'Description 2',
      status: 'PROGRESS',
      created_at: '2023-01-02',
      updated_at: '2023-01-02'
    },
  ]
  constructor() { }

  getAllTodos() {
    return this.todos;
  }
}
