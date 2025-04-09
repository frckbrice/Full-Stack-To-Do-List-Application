import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Prisma } from '@prisma/client';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Post()
  create(@Body() createTodoDto: Prisma.TodoCreateInput) {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  findAll(@Query('status') status?: 'OPEN' | 'PROGRESS' | 'TESTING' | 'DONE') {
    return this.todoService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.todoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTodoDto: Prisma.TodoUpdateInput) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.todoService.remove(id);
  }
}
