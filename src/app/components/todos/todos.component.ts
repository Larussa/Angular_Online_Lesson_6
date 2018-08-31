import { Component, OnInit } from '@angular/core';
import { Todo } from "../../models/Todo";
import { TodosService }  from "../../services/todos.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  private todos: Todo[];
  time: number = Date.now();
  sumArr: number[] = [1, -3, 7, 10, -18];

  constructor(
    public todoService: TodosService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.todoService.getTodos().subscribe((data: Todo[]) => this.todos = data,
    () => this.toastr.error('An error occurred!'),
    () => this.spinner.hide());

    setTimeout(() => {
      this.sumArr.push(14);
    }, 5000);
  }

  onDelete(id: number) {
    this.spinner.show();
    this.todoService.deleteTodo(id).subscribe((data:Object) => {
      this.todos = this.todos.filter(todo => todo.id != id);
      this.toastr.success("Todo was successfully deleted", "Info");
      this.spinner.hide();
    },() => this.toastr.error('Todo not deleted!', 'Error'),
      () => this.spinner.hide()
    );
  }
}
