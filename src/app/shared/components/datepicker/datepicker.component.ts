import { Component, Input, forwardRef, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true,
    },
  ],
  template: `
    <mat-form-field appearance="outline" class="w-full">
      <mat-label *ngIf="label">{{ label }}</mat-label>
      <input
        #input
        matInput
        [matDatepicker]="picker"
        [value]="value"
        [disabled]="disabled"
        [min]="minDate"
        [max]="maxDate"
        [placeholder]="placeholder"
        (dateChange)="onDateChange($event.value)"
        (input)="onInput($event)"
        (blur)="onBlur()"
        autocomplete="off"
      />
      <mat-datepicker-toggle matIconSuffix [for]="picker">
        <mat-icon matDatepickerToggleIcon>calendar_today</mat-icon>
      </mat-datepicker-toggle>
      <mat-datepicker #picker [touchUi]="touchUi" [startView]="startView" [dateClass]="dateClass">
        <mat-datepicker-actions *ngIf="showActions">
          <button mat-button matDatepickerCancel>Cancelar</button>
          <button mat-raised-button color="primary" matDatepickerApply>Aplicar</button>
        </mat-datepicker-actions>
      </mat-datepicker>
      <mat-hint *ngIf="hint" class="!text-[#707070]">{{ hint }}</mat-hint>
    </mat-form-field>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      ::ng-deep .mat-datepicker-content {
        background-color: var(--bg-surface) !important;
        border: 1px solid var(--border-subtle) !important;
        border-radius: 12px !important;
        box-shadow: var(--shadow-lg) !important;
      }

      ::ng-deep .mat-calendar-body-selected {
        background-color: var(--accent-primary) !important;
        color: black !important;
      }

      ::ng-deep
        .mat-calendar-body-today:not(.mat-calendar-body-selected):not(
          .mat-calendar-body-comparison-identical
        ) {
        border-color: var(--accent-primary) !important;
      }
    `,
  ],
})
export class DatepickerComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() placeholder = 'DD/MM/YYYY';
  @Input() hint?: string;
  @Input() disabled = false;
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() touchUi = false;
  @Input() showActions = false;
  @Input() startView: 'month' | 'year' | 'multi-year' = 'month';
  @Input() dateClass: any;
  @Input() error?: string;

  @ViewChild('input') inputElement!: ElementRef<HTMLInputElement>;

  value: any;
  isManualInvalid = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let digits = input.value.replace(/\D/g, '');
    const isDeleting = (event as InputEvent).inputType === 'deleteContentBackward';

    if (digits.length > 8) digits = digits.substring(0, 8);

    // Solo aplicar máscara si no estamos borrando un separador
    if (!isDeleting) {
      if (digits.length > 4) {
        input.value = `${digits.substring(0, 2)}/${digits.substring(2, 4)}/${digits.substring(4, 8)}`;
      } else if (digits.length > 2) {
        input.value = `${digits.substring(0, 2)}/${digits.substring(2, 4)}`;
      } else {
        input.value = digits;
      }
    }

    this._checkManualValidity();
    this.onTouched();
  }

  onDateChange(value: any): void {
    this.value = value;
    this._checkManualValidity();
    this.onChange(value);
    this.onTouched();
  }

  private _checkManualValidity(): void {
    if (!this.inputElement) return;
    const digits = this.inputElement.nativeElement.value.replace(/\D/g, '');

    if (digits.length === 0) {
      this.isManualInvalid = false;
    } else if (digits.length < 8) {
      this.isManualInvalid = true;
    } else {
      // Tiene 8 dígitos, validar si es una fecha real del calendario
      this.isManualInvalid = !this._isValidDate(digits);
    }
  }

  private _isValidDate(digits: string): boolean {
    if (digits.length !== 8) return false;
    const day = parseInt(digits.substring(0, 2), 10);
    const month = parseInt(digits.substring(2, 4), 10) - 1;
    const year = parseInt(digits.substring(4, 8), 10);
    const date = new Date(year, month, day);
    return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
  }

  onBlur(): void {
    this.onTouched();
  }
}
