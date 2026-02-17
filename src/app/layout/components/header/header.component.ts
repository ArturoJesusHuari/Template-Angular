import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
  ],
  template: `
    <mat-toolbar class="header">
      <span class="flex-1"></span>

      <button mat-icon-button [matMenuTriggerFor]="notificationMenu">
        <mat-icon>notifications</mat-icon>
      </button>

      <button mat-icon-button [matMenuTriggerFor]="userMenu">
        <mat-icon>account_circle</mat-icon>
      </button>
    </mat-toolbar>

    <mat-menu #notificationMenu="matMenu">
      <button mat-menu-item>
        <mat-icon>info</mat-icon>
        <span>No hay notificaciones</span>
      </button>
    </mat-menu>

    <mat-menu #userMenu="matMenu">
      <button mat-menu-item>
        <mat-icon>person</mat-icon>
        <span>Perfil</span>
      </button>
      <button mat-menu-item>
        <mat-icon>settings</mat-icon>
        <span>Configuración</span>
      </button>
      <mat-divider></mat-divider>
      <button mat-menu-item>
        <mat-icon>logout</mat-icon>
        <span>Cerrar Sesión</span>
      </button>
    </mat-menu>
  `,
  styles: [
    `
      .header {
        position: relative;
        z-index: 10;
        background-color: var(--bg-surface);
        border-bottom: 1px solid var(--border-subtle);
        box-shadow: var(--shadow-sm);
        padding: 0 1.5rem;
        height: 64px !important;
        display: flex;
        align-items: center;
      }

      .flex-1 {
        flex: 1;
      }

      .nav-actions {
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }
    `,
  ],
})
export class HeaderComponent {}
