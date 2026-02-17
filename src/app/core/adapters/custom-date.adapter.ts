import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

/**
 * Adaptador de fechas personalizado para formato dd/MM/yyyy
 * Configuración global para toda la aplicación
 */
@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  override parse(value: any): Date | null {
    if (!value || typeof value !== 'string') {
      return super.parse(value);
    }

    const trimmedValue = value.trim();

    // Si solo hay números y son 8, tratar como DDMMYYYY
    if (/^\d{8}$/.test(trimmedValue)) {
      const day = parseInt(trimmedValue.substring(0, 2), 10);
      const month = parseInt(trimmedValue.substring(2, 4), 10) - 1;
      const year = parseInt(trimmedValue.substring(4, 8), 10);
      return this._createDate(year, month, day);
    }

    // Formato estándar dd/mm/yyyy
    const parts = trimmedValue.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      return this._createDate(year, month, day);
    }

    return null;
  }

  private _createDate(year: number, month: number, day: number): Date | null {
    if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
    const date = new Date(year, month, day);
    if (date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
      return date;
    }
    return null;
  }

  override format(date: Date, displayFormat: Object): string {
    if (!date || isNaN(date.getTime())) {
      return '';
    }

    if (displayFormat === 'DD/MM/YYYY') {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }

    return super.format(date, displayFormat);
  }

  override getFirstDayOfWeek(): number {
    return 1; // Lunes como primer día de la semana
  }
}
