import { Component, Input, forwardRef, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-daterange-picker',
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
      useExisting: forwardRef(() => DaterangePickerComponent),
      multi: true,
    },
  ],
  template: `
    <mat-form-field appearance="outline" class="w-full">
      <mat-label *ngIf="label">{{ label }}</mat-label>
      <mat-date-range-input
        [rangePicker]="picker"
        [min]="minDate || null"
        [max]="maxDate || null"
        [disabled]="disabled"
        [comparisonStart]="comparisonStart || null"
        [comparisonEnd]="comparisonEnd || null"
        separator=" - "
      >
        <input
          matStartDate
          #startInput
          placeholder="Desde"
          (dateChange)="onStartChange($event.value)"
          (input)="onInput($event, 'start')"
          [value]="value.start"
          autocomplete="off"
        />
        <input
          matEndDate
          #endInput
          placeholder="Hasta"
          (dateChange)="onEndChange($event.value)"
          (input)="onInput($event, 'end')"
          [value]="value.end"
          autocomplete="off"
        />
      </mat-date-range-input>
      <mat-datepicker-toggle matIconSuffix [for]="picker">
        <mat-icon matDatepickerToggleIcon>calendar_today</mat-icon>
      </mat-datepicker-toggle>
      <mat-date-range-picker #picker [touchUi]="touchUi" [dateClass]="dateClass">
        <mat-date-range-picker-actions *ngIf="showActions">
          <button mat-button matDateRangePickerCancel>Cancelar</button>
          <button mat-raised-button color="primary" matDateRangePickerApply>Aplicar</button>
        </mat-date-range-picker-actions>
      </mat-date-range-picker>
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

      ::ng-deep .mat-calendar-body-today:not(.mat-calendar-body-selected) {
        border-color: var(--accent-primary) !important;
      }

      ::ng-deep .mat-calendar-body-in-range::before {
        background-color: var(--accent-primary) !important;
        opacity: 0.1;
      }
    `,
  ],
})
export class DaterangePickerComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() hint?: string;
  @Input() error?: string;
  @Input() disabled = false;
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() touchUi = false;
  @Input() showActions = false;
  @Input() comparisonStart?: Date;
  @Input() comparisonEnd?: Date;
  @Input() dateClass: any;

  @ViewChild('startInput') startInput!: ElementRef<HTMLInputElement>;
  @ViewChild('endInput') endInput!: ElementRef<HTMLInputElement>;

  value: { start: Date | null; end: Date | null } = { start: null, end: null };
  isManualInvalid = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    if (value) {
      this.value = value;
    } else {
      this.value = { start: null, end: null };
    }
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

  onInput(event: Event, type: 'start' | 'end'): void {
    const input = event.target as HTMLInputElement;
    let digits = input.value.replace(/\D/g, '');
    const isDeleting = (event as InputEvent).inputType === 'deleteContentBackward';

    // Caso especial: 16 dígitos en el campo de inicio
    if (type === 'start' && digits.length === 16) {
      const startDigits = digits.substring(0, 8);
      const endDigits = digits.substring(8, 16);

      this._applyMask(this.startInput.nativeElement, startDigits, false);
      this._applyMask(this.endInput.nativeElement, endDigits, false);

      setTimeout(() => {
        this.endInput.nativeElement.focus();
        this._checkValidity();
        this.onTouched();
      });
      return;
    }

    this._applyMask(input, digits, isDeleting);
    this._checkValidity();
    this.onTouched();
  }

  private _applyMask(input: HTMLInputElement, digits: string, isDeleting: boolean): void {
    if (digits.length > 8) digits = digits.substring(0, 8);

    if (!isDeleting) {
      if (digits.length > 4) {
        input.value = `${digits.substring(0, 2)}/${digits.substring(2, 4)}/${digits.substring(4, 8)}`;
      } else if (digits.length > 2) {
        input.value = `${digits.substring(0, 2)}/${digits.substring(2, 4)}`;
      } else {
        input.value = digits;
      }
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

  onStartChange(date: Date | null): void {
    this.value = { ...this.value, start: date };
    this._checkValidity();
    this.onChange(this.value);
    this.onTouched();
  }

  onEndChange(date: Date | null): void {
    this.value = { ...this.value, end: date };
    this._checkValidity();
    this.onChange(this.value);
    this.onTouched();
  }

  private _checkValidity(): void {
    const startVal = this.startInput.nativeElement.value.replace(/\D/g, '');
    const endVal = this.endInput.nativeElement.value.replace(/\D/g, '');

    const startIncomplete = startVal.length > 0 && startVal.length < 8;
    const endIncomplete = endVal.length > 0 && endVal.length < 8;

    const startInvalidContent = startVal.length === 8 && !this._isValidDate(startVal);
    const endInvalidContent = endVal.length === 8 && !this._isValidDate(endVal);

    this.isManualInvalid =
      startIncomplete || endIncomplete || startInvalidContent || endInvalidContent;
  }
}
