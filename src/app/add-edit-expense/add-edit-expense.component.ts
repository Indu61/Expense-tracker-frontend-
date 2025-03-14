import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-expense',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './add-edit-expense.component.html',
  styleUrl: './add-edit-expense.component.css',
})
export class AddEditExpenseComponent {
  category: string = '';
  description: string = '';
  paymentMethod: string = '';
  amount: number = 0;
  isEdit: boolean = false;
  expenseId: number | null = null;

  apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      console.log('Query Params in AddEditExpenseComponent:', params);
      console.log('ID:', params['id']);
      console.log('Edit Mode:', params['editMode']);
    });
    this.route.queryParamMap.subscribe((params) => {
      const id = params.get('id');
      const editMode = params.get('editMode');
      console.log(editMode);
      console.log(id);

      if (id !== null && editMode === 'true') {
        this.isEdit = true;
        this.expenseId = +id;
        this.fetchExpenseData(id);
      }
      console.log('is edit ', this.isEdit);
    });
  }

  fetchExpenseData(id: string) {
    console.log('is edit ', this.isEdit);
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .get<any>(`${this.apiUrl}/getExpenseByid/${id}`, { headers })
      .subscribe(
        (data) => {
          if (!data) {
            console.error('No data found for expense ID:', id);
            return;
          }
          console.log('Fetched Expense Data:', data);

          this.category = data.category;
          this.description = data.description;
          this.paymentMethod = data.paymentMethod;
          this.amount = data.amount;
        },
        (error) => {
          console.error('Error fetching expense:', error);
        }
      );
  }

  onSubmit() {
    this.route.queryParamMap.subscribe((params) => {
      const id = params.get('id'); // Fetch expense ID from query params
      const editMode = params.get('editMode');

      console.log('Edit Mode:', editMode);
      console.log('Expense ID:', id);

      if (editMode === 'true' && id !== null) {
        this.expenseId = Number(id);

        const expenseData = {
          expenseId: id, // Ensure this is included
          category: this.category,
          description: this.description,
          paymentMethod: this.paymentMethod,
          amount: this.amount,
        };

        console.log('Updating Expense:', expenseData);

        const token = localStorage.getItem('authToken');
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        });

        this.http
          .put(`${this.apiUrl}/updateExpense/${id}`, expenseData, {
            headers,
          })
          .subscribe(
            (response) => {
              console.log('Expense updated successfully:', response);
              this.router.navigate(['/expense-list']);
            },
            (error) => {
              console.error('Error updating expense:', error);
            }
          );
      } else {
        console.log('catogory: ' + this.category);
        console.log('description: ' + this.description);
        console.log('payment method: ' + this.paymentMethod);
        console.log('Amount: ' + this.amount);

        const expenseData = {
          category: this.category,
          description: this.description,
          paymentMethod: this.paymentMethod,
          amount: this.amount,
        };

        const token = localStorage.getItem('authToken');
        console.log('token ' + token);

        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        });

        console.log('Headers:', headers.keys());
        console.log('Authorization:', headers.get('Authorization'));
        console.log('Content-Type:', headers.get('Content-Type'));
        this.http
          .post(`${this.apiUrl}/addExpense`, expenseData, { headers })
          .subscribe(
            (response) => {
              console.log('Expense added successfully', response);
              console.log('added data ', expenseData);

              this.router.navigate(['/expense-list']);
            },
            (error) => {
              console.error('Error adding expense', error);
            }
          );
      }
    });
  }
}
