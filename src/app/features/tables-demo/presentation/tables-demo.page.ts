import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CardComponent } from '../../../shared/components/card/card.component';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

@Component({
  selector: 'app-tables-demo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    CardComponent,
  ],
  templateUrl: './tables-demo.page.html',
})
export class TablesDemoPage {
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'status', 'actions'];
  dataSource: MatTableDataSource<User>;

  searchControl = new FormControl('');
  roleControl = new FormControl('');
  statusControl = new FormControl('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private allUsers: User[] = [];

  constructor() {
    this.allUsers = this.generateMockUsers();
    this.dataSource = new MatTableDataSource(this.allUsers);

    // Configurar filtro personalizado
    this.dataSource.filterPredicate = this.createFilter();

    // Suscribirse a cambios en los filtros
    this.searchControl.valueChanges.subscribe(() => this.applyFilters());
    this.roleControl.valueChanges.subscribe(() => this.applyFilters());
    this.statusControl.valueChanges.subscribe(() => this.applyFilters());
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private createFilter(): (data: User, filter: string) => boolean {
    return (data: User, filter: string): boolean => {
      const searchTerm = this.searchControl.value?.toLowerCase() || '';
      const roleFilter = this.roleControl.value || '';
      const statusFilter = this.statusControl.value || '';

      const matchesSearch =
        !searchTerm ||
        data.name.toLowerCase().includes(searchTerm) ||
        data.email.toLowerCase().includes(searchTerm);

      const matchesRole = !roleFilter || data.role === roleFilter;
      const matchesStatus = !statusFilter || data.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    };
  }

  private applyFilters() {
    // Trigger filter update
    this.dataSource.filter = Math.random().toString();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  resetFilters() {
    this.searchControl.setValue('');
    this.roleControl.setValue('');
    this.statusControl.setValue('');
  }

  private generateMockUsers(): User[] {
    const roles = ['Admin', 'User', 'Guest'];
    const statuses = ['Activo', 'Inactivo'];
    const users: User[] = [];

    for (let i = 1; i <= 50; i++) {
      users.push({
        id: i,
        name: `Usuario ${i}`,
        email: `usuario${i}@ejemplo.com`,
        role: roles[Math.floor(Math.random() * roles.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
      });
    }

    return users;
  }
}
