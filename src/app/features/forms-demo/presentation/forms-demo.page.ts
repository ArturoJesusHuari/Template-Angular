import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { CardComponent } from '../../../shared/components/card/card.component';
import { CustomDatePipe } from '../../../shared/pipes/custom-date.pipe';
import { CurrencyPipe } from '../../../shared/pipes/currency.pipe';
import {
  integerValidator,
  decimalValidator,
  moneyValidator,
  phoneValidator,
  textLengthValidator,
  rangeValidator,
  emailValidator,
} from '../../../shared/validators/custom-validators';
import { NumericInputDirective } from '../../../shared/directives/numeric-input.directive';
import { IntegerInputDirective } from '../../../shared/directives/integer-input.directive';
import { MoneyInputDirective } from '../../../shared/directives/money-input.directive';
import { PhoneInputDirective } from '../../../shared/directives/phone-input.directive';

interface Country {
  code: string;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-forms-demo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatButtonModule,
    MatRadioModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule,
    CardComponent,
    CurrencyPipe,
    NumericInputDirective,
    IntegerInputDirective,
    MoneyInputDirective,
    PhoneInputDirective,
  ],
  templateUrl: './forms-demo.page.html',
})
export class FormsDemoPage implements OnInit {
  mainForm: FormGroup;
  submittedData: any = null;
  isSubmitting = false;

  countries: Country[] = [
    { code: 'pe', name: 'Perú' },
    { code: 'ar', name: 'Argentina' },
    { code: 'mx', name: 'México' },
    { code: 'es', name: 'España' },
    { code: 'us', name: 'Estados Unidos' },
    { code: 'co', name: 'Colombia' },
    { code: 'cl', name: 'Chile' },
  ];

  categories: Category[] = [
    { id: 1, name: 'Tecnología' },
    { id: 2, name: 'Finanzas' },
    { id: 3, name: 'Salud' },
    { id: 4, name: 'Educación' },
    { id: 5, name: 'Entretenimiento' },
    { id: 6, name: 'Deportes' },
  ];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.mainForm = this.fb.group({
      // Datos personales
      fullName: ['', [Validators.required, textLengthValidator(3, 100)]],
      email: ['', [Validators.required, emailValidator()]],
      phone: ['', [Validators.required, phoneValidator(9)]],
      birthDate: ['', Validators.required],
      country: ['', Validators.required],

      // Datos numéricos
      age: ['', [Validators.required, integerValidator(), rangeValidator(18, 100)]],
      weight: ['', [decimalValidator(2)]],
      salary: ['', [Validators.required, moneyValidator()]],
      productPrice: ['', [moneyValidator(), rangeValidator(0.01, 999999.99)]],

      // Selección y opciones
      categories: [[], Validators.required],
      gender: ['male'],
      acceptTerms: [false, Validators.requiredTrue],
      newsletter: [false],

      // Información adicional
      comments: ['', textLengthValidator(10, 500)],
    });
  }

  ngOnInit(): void {
    // Inicialización adicional si es necesaria
  }

  onSubmit(): void {
    if (this.mainForm.valid) {
      this.isSubmitting = true;

      // Simular envío asíncrono
      setTimeout(() => {
        this.submittedData = this.mainForm.value;
        this.isSubmitting = false;

        this.snackBar.open('Formulario enviado correctamente', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-success'],
        });

        console.log('Form submitted:', this.submittedData);
      }, 1500);
    } else {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.mainForm.controls).forEach((key) => {
        this.mainForm.get(key)?.markAsTouched();
      });

      this.snackBar.open('Por favor, complete todos los campos requeridos', 'Cerrar', {
        duration: 3000,
        panelClass: ['snackbar-error'],
      });
    }
  }

  resetForm(): void {
    this.mainForm.reset({
      gender: 'male',
      acceptTerms: false,
      newsletter: false,
    });
    this.submittedData = null;

    this.snackBar.open('Formulario limpiado', 'Cerrar', {
      duration: 2000,
    });
  }

  getCountryName(code: string): string {
    return this.countries.find((c) => c.code === code)?.name || code;
  }

  getCategoryNames(ids: number[]): string {
    if (!ids || ids.length === 0) return 'Ninguna';
    return ids.map((id) => this.categories.find((c) => c.id === id)?.name || '').join(', ');
  }

  getGenderLabel(value: string): string {
    const labels: Record<string, string> = {
      male: 'Masculino',
      female: 'Femenino',
      other: 'Otro',
    };
    return labels[value] || value;
  }

  formatMoney(value: number): string {
    if (!value && value !== 0) return '0.00';
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}
