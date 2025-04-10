import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IResponse, ITodo } from '../models/to-do-model';
import { HttpClient } from '@angular/common/http';
import { apiEndpoint } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) { }

  getAllTodo(status: string): Observable<IResponse<ITodo[]>|any> {
    let queryString = '';
    if (status !== '') {
      queryString = `status=${status}`;
    }
    const todos = this.http.get<IResponse<ITodo[]>>(
      `${apiEndpoint.TodoEndpoint.getAllTodo}?${queryString}` // adding query string to filter the todo from api.
    );

    console.log(todos);
    return todos;
  }

  addTodo(data: ITodo): Observable<IResponse<ITodo>> {
    return this.http.post<IResponse<ITodo>>(
      `${apiEndpoint.TodoEndpoint.addTodo}`,
      data
    );
  }

  updateTodo(id: number, data: ITodo): Observable<IResponse<ITodo>> {
    return this.http.put<IResponse<ITodo>>(
      `${apiEndpoint.TodoEndpoint.updateTodo}/${id}`,
      data
    );
  }

  deleteTodo(id: number): Observable<IResponse<ITodo> | null> {
    if (!id || id <= 0)
      return throwError(() => new Error('ID is required'));
    return this.http.delete<IResponse<ITodo>>(
      `${apiEndpoint.TodoEndpoint.updateTodo}/${id}`,
    );
  }
}