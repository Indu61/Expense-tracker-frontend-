import { Routes } from '@angular/router';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ExpensePageComponent } from './expense-page/expense-page.component';
import { AddEditExpenseComponent } from './add-edit-expense/add-edit-expense.component';

export const routes: Routes = [
  { path: 'expense-list', component: ExpensePageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'add-edit-expense', component: AddEditExpenseComponent },
];
