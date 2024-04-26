import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { switchMap, tap, catchError, EMPTY, finalize } from 'rxjs';
import { emptySegment } from './constants/empty';
import { Product, ProductFilters } from './interfaces/products';
import { ProductsApiService } from './services/products.api.service';

export interface MoviesState {
  filters?: ProductFilters;
  products: Product[];
  pending: boolean;
}

const initialState = {
  filters: undefined,
  products: [],
  pending: false
};

@Injectable()
export class ProductsStore extends ComponentStore<MoviesState> {

  readonly products$ = this.select(state => state.products);
  readonly filters$ = this.select(state => state.filters);
  readonly filteredProducts$ = this.select(
    this.products$,
    this.filters$,
    (products, filters) => this._applyFilters(products, filters)
  );
  readonly isPending$ = this.select(state => state.pending);

  readonly setProducts = this.updater((state, products: Product[]) => ({
    ...state,
    products
  }));

  readonly setFilters = this.updater((state, filters: ProductFilters) => ({
    ...state,
    filters
  }));

  readonly getAllProducts = this.effect<void>(trigger$ => trigger$.pipe(
    tap(() => this.patchState({ pending: true })),
    switchMap(() => this._productsService.fetchProducts().pipe(
      tap({
        next: products => this.setProducts(products),
        error: (error: HttpErrorResponse) => console.error(error)
      }),
      finalize(() => this.patchState({ pending: false })),
      catchError(() => EMPTY)
    ))
  ));

  constructor(
    private _productsService: ProductsApiService
  ) {
    super(initialState);
  }

  private _applyFilters(products: Product[], filters?: ProductFilters): Product[] {
    if (!filters) {
      return products;
    }

    return products.filter(product => {
      let accept = true;
      if (accept && filters.type) {
        accept = filters.type === product.type.uid || emptySegment === filters.type;
      }
      if (accept && filters.country) {
        accept = filters.country === product.country.codeA2 || emptySegment === filters.country;
      }

      return accept;
    }) || [];
  }
}
