import { Component, OnInit } from '@angular/core';
import { TodosService } from "../../services/todos.service";
import { Router } from "@angular/router";
import { Todo } from "../../models/Todo";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, Validators } from "@angular/forms";


@Component({
  selector: 'app-add-new-todo',
  templateUrl: './add-new-todo.component.html',
  styleUrls: ['./add-new-todo.component.css']
})
export class AddNewTodoComponent implements OnInit {

  public addTodo: Todo;
  public addForm: FormGroup;

  constructor(
    public todoService: TodosService,
    public router: Router,
    public toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.addForm = new FormGroup({
      userId: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}')]),
      title: new FormControl('', [Validators.required, Validators.minLength(10)]),
      completed: new FormControl(false)
    });
  }

  addNewTodo() {
    if (this.addForm.invalid) return;
      const newTodo = {
        userId: this.addForm.value.userId,
        title: this.addForm.value.title,
        completed: false
      };
    this.spinner.show();
    this.todoService.addTodo((newTodo)).subscribe((data: Todo) => {
      this.toastr.success(`Todo successfully added.`, 'Success!');
      this.spinner.hide();
      this.router.navigate(['/']);
    },() => {
      this.toastr.error('Error getting data.');
    }, () => {
      this.spinner.hide();
    });
  }
}
