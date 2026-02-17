import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  template: `
    <mat-form-field appearance="outline" class="w-full">
      <mat-label *ngIf="label">{{ label }}</mat-label>
      <mat-select
        [value]="value"
        [multiple]="multiple"
        [disabled]="disabled"
        [placeholder]="placeholder"
        (selectionChange)="onSelectionChange($event.value)"
        (blur)="onBlur()"
      >
        <mat-option *ngFor="let option of options" [value]="option[valueKey]">
          {{ option[labelKey] }}
        </mat-option>
      </mat-select>
      <mat-hint *ngIf="hint" class="!text-[#707070]">{{ hint }}</mat-hint>
    </mat-form-field>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
    `,
  ],
})
export class SelectComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() placeholder = '';
  @Input() hint?: string;
  @Input() options: any[] = [];
  @Input() labelKey = 'name';
  @Input() valueKey = 'id';
  @Input() multiple = false;
  @Input() disabled = false;

  value: any;

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

  onSelectionChange(value: any): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  onBlur(): void {
    this.onTouched();
  }
}
