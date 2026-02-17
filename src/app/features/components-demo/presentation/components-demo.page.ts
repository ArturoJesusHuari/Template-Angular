import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { CardComponent } from '../../../shared/components/card/card.component';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { DatepickerComponent } from '../../../shared/components/datepicker/datepicker.component';
import { DaterangePickerComponent } from '../../../shared/components/daterange-picker/daterange-picker.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

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
    MatDividerModule,
    CardComponent,
    ButtonComponent,
    BadgeComponent,
    DatepickerComponent,
    DaterangePickerComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './components-demo.page.html',
})
export class ComponentsDemoPage {
  minDate = new Date();
  maxDate = new Date(new Date().setMonth(new Date().getMonth() + 1));
  sampleDate = new Date();

  rangeForm = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  comparisonStart = new Date(new Date().setDate(new Date().getDate() - 7));
  comparisonEnd = new Date(new Date().setDate(new Date().getDate() - 2));

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

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
