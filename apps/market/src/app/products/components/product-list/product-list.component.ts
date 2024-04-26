import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { Product } from '../../interfaces/products';
import { ProductsStore } from '../../products.component.store';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, LetDirective],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  readonly products$ = this._componentStore.filteredProducts$;
  public trackByProduct = (index: number, item: Product): string => item.uid;

  constructor(
    private _componentStore: ProductsStore
  ) {
  }

}
