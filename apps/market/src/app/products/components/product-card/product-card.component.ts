import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCard, MatCardHeader, MatCardContent, MatCardActions, MatCardTitle } from '@angular/material/card';
import { MatChipSet, MatChip } from '@angular/material/chips';
import { Product } from '../../interfaces/products';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, MatCard, MatCardContent, MatCardActions, NgOptimizedImage, MatChipSet, MatChip, MatCardTitle, MatCardHeader],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  @Input() product?: Product;

  readonly picturePath = '/assets/images/products/';
}
