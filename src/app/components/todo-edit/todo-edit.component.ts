import { Component, OnInit } from '@angular/core';
import { TodosService } from "../../services/todos.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Todo } from "../../models/Todo";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit {
  private todoId: string;
  public todo: Todo;
  public isReadOnly = true;
  public editForm: FormGroup;

  constructor(
    public todoService: TodosService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.editForm = new FormGroup ({
      userId: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}')]),
      title: new FormControl('', [Validators.required, Validators.minLength(10)]),
      completed: new FormControl(false)
    });

    this.spinner.show();
    this.todoId = this.activatedRoute.snapshot.params['id'];
    this.todoService.getTodo(this.todoId).subscribe((todo: Todo) => {
      this.todo = todo;
    },() => {
      this.toastr.error('Error getting data!');
      this.router.navigate(['/']);
    },() => {
      this.spinner.hide();
    });
  }

  onEditTodo() {
    this.isReadOnly = true;
    if (this.editForm.invalid) return;
    const updtTodo = Object.assign({}, this.todo);
    this.todoService.updateTodo(updtTodo).subscribe((res: Todo) => {
      this.toastr.success('Todo was successfully edited!', 'Info!');
      this.router.navigate(['/']);
    },() => {
      this.toastr.success('Something wrong!', 'Error!');
    },() => {
      this.spinner.hide();
    });
  }

}
