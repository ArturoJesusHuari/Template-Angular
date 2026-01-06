import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CardComponent } from '../../../shared/components/card/card.component';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';

@Component({
  selector: 'app-components-demo',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatMenuModule,
    MatTooltipModule,
    CardComponent,
  ],
  templateUrl: './components-demo.page.html',
})
export class ComponentsDemoPage {
  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  openDialog() {
    this.dialog.open(DialogComponent);
  }

  showSnackbar(message: string, type: string = 'default') {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass:
        type === 'success' ? 'snackbar-success' : type === 'error' ? 'snackbar-error' : '',
    });
  }
}
