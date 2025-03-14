import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './expense-page.component.html',
  styleUrl: './expense-page.component.css',
})
export class ExpensePageComponent {
  expenses: any[] = [];
  filteredData: any[] = [];
  searchQuery: string = '';
  editMode: boolean = false;

  apiUrl = environment.API_URL;

  token = localStorage.getItem('authToken');

  selectedFilter = 'all';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchData();
  }
  onFilterChange(event: any) {
    this.selectedFilter = event.target.value;
    this.fetchData();
  }

  fetchData() {
    //const token = localStorage.getItem('authToken');
    console.log('token ' + this.token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    // this.http.get<any>(`${this.apiUrl}/getallexpenses`, { headers }).subscribe(
    //   (data) => {
    //     this.expenses = data;
    //   },
    //   (error) => {
    //     console.error('Error fetching expenses', error);
    //   }
    // );

    switch (this.selectedFilter) {
      case 'today':
        this.http
          .get<any>(`${this.apiUrl}/gettodayexpenses`, { headers })
          .subscribe(
            (data) => {
              this.expenses = data;
              // this.applySearch();
            },
            (error) => {
              console.error('Error fetching expenses', error);
            }
          );
        break;

      case 'last7days':
        this.http
          .get<any>(`${this.apiUrl}/getLast7Daysexpenses`, { headers })
          .subscribe(
            (data) => {
              this.expenses = data;
              // this.applySearch();
            },
            (error) => {
              console.error('Error fetching expenses', error);
            }
          );
        break;

      case 'last30days':
        this.http
          .get<any>(`${this.apiUrl}/getLast30Daysexpenses`, { headers })
          .subscribe(
            (data) => {
              this.expenses = data;
              // this.applySearch();
            },
            (error) => {
              console.error('Error fetching expenses', error);
            }
          );
        break;

      case 'all':
      default:
        this.http
          .get<any>(`${this.apiUrl}/getallexpenses`, { headers })
          .subscribe(
            (data) => {
              this.expenses = data;
              // this.applySearch();
              console.log(data);
            },
            (error) => {
              console.error('Error fetching expenses', error);
            }
          );
    }
  }

  // applySearch() {
  //   console.log('hi ');
  //   console.log('searched quary ', this.searchQuery);

  //   if (!this.searchQuery) {
  //     this.filteredData = this.expenses;
  //   } else {
  //     this.filteredData = this.expenses.filter((item) =>
  //       Object.values(item).some((val) =>
  //         String(val).toLowerCase().includes(this.searchQuery.toLowerCase())
  //       )
  //     );
  //     console.log('Filter data ', this.filteredData);
  //     this.expenses = this.filteredData;
  //   }
  // }

  navigateToAddExpense() {
    this.router.navigate(['/add-edit-expense']);
  }

  editExpense(expense: any) {
    console.log('edit expense', expense);

    this.router.navigate(['/add-edit-expense'], {
      queryParams: { id: expense.id, editMode: true },
    });
  }

  deleteExpense(expense: any) {
    console.log('token ' + this.token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    this.http
      .delete<any>(`${this.apiUrl}/deleteExpense/${expense.id}`, { headers })
      .subscribe(
        (response) => {
          console.log('Server response:', response.message);
          this.expenses = this.expenses.filter((e: any) => e.id !== expense.id);
          console.log('Expense deleted successfully');
        },
        (error) => {
          console.error('Error deleting expenses', error);
        }
      );
  }
}
