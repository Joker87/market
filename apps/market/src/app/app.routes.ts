import { Route } from '@angular/router';
import { ProductListComponent } from './products/components/product-list/product-list.component';
import { ProductsComponent } from './products/products.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      {
        path: '',
        component: ProductListComponent,
      },
      {
        path: ':type',
        component: ProductListComponent
      },
      {
        path: ':type/:country',
        component: ProductListComponent
      }
    ]
  }
];
