import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  AfterContentInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <button
      [attr.type]="type"
      [disabled]="disabled || loading"
      [class]="getButtonClasses()"
      (click)="handleClick($event)"
    >
      <mat-icon *ngIf="icon && !loading" [class.order-last]="iconPosition === 'right'">
        {{ icon }}
      </mat-icon>

      <svg
        *ngIf="loading"
        class="animate-spin h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>

      <ng-content></ng-content>
    </button>
  `,
  styles: [],
})
export class ButtonComponent implements AfterContentInit {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() fullWidth = false;

  @Output() onClick = new EventEmitter<Event>();

  hasContent = false;
  private el = inject(ElementRef);

  ngAfterContentInit() {
    this.checkContent();
  }

  private checkContent() {
    // Verificamos si hay texto o elementos proyectados
    const nativeElement = this.el.nativeElement;
    // Buscamos nodos de texto que no sean solo espacios o cualquier elemento que no sea el botón mismo
    // En este caso, simplemente comprobamos el contenido del componente host
    const text = nativeElement.textContent?.trim();
    this.hasContent = !!text;
  }

  handleClick(event: Event): void {
    if (!this.disabled && !this.loading) {
      this.onClick.emit(event);
    }
  }

  getButtonClasses(): string {
    const baseClasses = [
      'inline-flex',
      'items-center',
      'justify-center',
      'font-semibold',
      'rounded-lg',
      'transition-all',
      'duration-200',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-2',
      'focus:ring-offset-[#0f0f0f]',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
    ];

    // Size classes
    const sizeClasses = {
      sm: ['text-xs', 'px-3', 'py-1.5', 'gap-1.5'],
      md: ['text-sm', 'px-4', 'py-2.5', 'gap-2'],
      lg: ['text-base', 'px-6', 'py-3', 'gap-2'],
    };

    // Variant classes
    const variantClasses = {
      primary: [
        'bg-[#3ecf8e]',
        'text-black',
        'hover:bg-[#5ee299]',
        'active:bg-[#00a766]',
        'focus:ring-[#3ecf8e]/50',
        'shadow-sm',
        'hover:shadow-md',
      ],
      secondary: [
        'bg-[#1f1f1f]',
        'text-white',
        'border',
        'border-[#353535]',
        'hover:bg-[#242424]',
        'hover:border-[#3ecf8e]/50',
        'focus:ring-[#3ecf8e]/50',
      ],
      outline: [
        'bg-transparent',
        'text-[#f0f0f0]',
        'border',
        'border-[#353535]',
        'hover:bg-[#1f1f1f]',
        'hover:border-[#3ecf8e]',
        'focus:ring-[#3ecf8e]/50',
      ],
      ghost: ['bg-transparent', 'text-[#f0f0f0]', 'hover:bg-[#1f1f1f]', 'focus:ring-[#3ecf8e]/50'],
      danger: [
        'bg-[#ef4444]',
        'text-white',
        'hover:bg-[#f87171]',
        'active:bg-[#dc2626]',
        'focus:ring-red-500/50',
        'shadow-sm',
        'hover:shadow-md',
      ],
    };

    const widthClass = this.fullWidth ? ['w-full'] : [];

    return [
      ...baseClasses,
      ...sizeClasses[this.size],
      ...variantClasses[this.variant],
      ...widthClass,
    ].join(' ');
  }
}
