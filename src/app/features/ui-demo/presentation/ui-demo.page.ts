import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CardComponent } from '../../../shared/components/card/card.component';
import { HighlightDirective } from '../../../shared/directives/highlight.directive';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';

@Component({
  selector: 'app-ui-demo',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    CardComponent,
    HighlightDirective,
    TruncatePipe,
  ],
  templateUrl: './ui-demo.page.html',
})
export class UiDemoPage {
  longText =
    'Este es un texto muy largo que será truncado por el pipe personalizado. Demuestra cómo podemos crear pipes reutilizables para transformar datos en nuestras plantillas.';

  features = [
    {
      icon: 'speed',
      title: 'Rápido',
      description: 'Optimizado para máximo rendimiento',
    },
    {
      icon: 'security',
      title: 'Seguro',
      description: 'Protección de datos integrada',
    },
    {
      icon: 'devices',
      title: 'Responsive',
      description: 'Funciona en todos los dispositivos',
    },
  ];
}
