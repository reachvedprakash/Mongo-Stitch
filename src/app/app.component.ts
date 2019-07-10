import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DBService } from './db.service';

interface Todo {
  title: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private dbService: DBService) { }

  ngOnInit(): void {
    this.dbService.initDB();
  }


  onAddTodo(form: NgForm) {
    const newTodo = { title: form.value.todo };
    this.todos.push(newTodo);
    this.dbService.addToDo(newTodo);
    form.resetForm();
  }

  onRemoveTodo(index: number) {
    this.todos.splice(index, 1);
  }

  onFetchData() {
    this.dbService.getTodos().then(todos => {
      this.todos = todos;
    });
  }
}
