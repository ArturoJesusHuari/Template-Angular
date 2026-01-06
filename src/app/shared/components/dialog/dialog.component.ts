import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-example-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Ejemplo de Dialog</h2>
    <mat-dialog-content>
      <p>Este es un ejemplo de Material Dialog.</p>
      <p>Puedes agregar cualquier contenido aquí.</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-raised-button color="primary" mat-dialog-close>Aceptar</button>
    </mat-dialog-actions>
  `,
})
export class DialogComponent {}
