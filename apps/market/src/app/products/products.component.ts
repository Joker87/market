import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatDrawerContainer, MatDrawer } from '@angular/material/sidenav';
import { Router, RouterOutlet } from '@angular/router';
import { emptySegment } from 'apps/market/src/app/products/constants/empty';
import { ProductFiltersComponent } from './components/product-filters/product-filters.component';
import { ProductFilters } from './interfaces/products';
import { ProductsStore } from './products.component.store';
import { ProductsApiService } from './services/products.api.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ProductFiltersComponent,
    MatProgressSpinner,
    MatDrawerContainer,
    MatButton,
    MatDrawer,
    RouterOutlet
  ],
  providers: [
    ProductsStore,
    ProductsApiService
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {

  readonly isPending$ = this._componentStore.isPending$;

  constructor(
    private _componentStore: ProductsStore,
    private _router: Router
  ) {
  }

  ngOnInit(): void {
    this._componentStore.getAllProducts();
  }

  public onUserInput($event: ProductFilters) {
    const parts = [];
    parts.push($event.type || emptySegment);
    parts.push($event.country || emptySegment);
    this._router.navigate(parts);
  }

  public onQueryInput($event: ProductFilters) {
    this._componentStore.setFilters($event);
  }
}
