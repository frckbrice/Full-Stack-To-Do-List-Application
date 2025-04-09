import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TodoService {

  constructor(private readonly databaseService: DatabaseService) { }

  async create(createTodoDto: Prisma.TodoCreateInput) {
    try {
      return this.databaseService.todo.create({
        data: createTodoDto,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(status?: 'OPEN' | 'PROGRESS' | 'TESTING' | 'DONE') {
    try {
      if (status) {
        return this.databaseService.todo.findMany({
          where: {
            status,
          },
        });
      }
      return this.databaseService.todo.findMany();
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: number) {
    try {
      return this.databaseService.todo.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async update(id: number, updateTodoDto: Prisma.TodoUpdateInput) {
    try {
      return this.databaseService.todo.update({
        where: {
          id,
        },
        data: updateTodoDto,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async remove(id: number) {
    try {
      return this.databaseService.todo.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
