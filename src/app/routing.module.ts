import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { AboutComponent } from "./components/about/about.component";
import { TodosComponent } from "./components/todos/todos.component";
import { TodoEditComponent } from "./components/todo-edit/todo-edit.component";
import { AddNewTodoComponent } from "./components/add-new-todo/add-new-todo.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from "./guards/auth.guard";
import { RegistrationComponent } from "./components/registration/registration.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: '', component: TodosComponent, canActivate: [AuthGuard] },
  { path: 'todo/:id', component: TodoEditComponent, canActivate: [AuthGuard] },
  { path: 'addtodo', component: AddNewTodoComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
  { path: "**", component: NotFoundComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class RoutingModule { }
