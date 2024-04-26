import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, Output, EventEmitter, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect, MatOption } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { getRouterSelectors } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { emptySegment } from '../../constants/empty';
import { ProductFilters, Type, Country } from '../../interfaces/products';

@Component({
  selector: 'app-product-filters',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatSelect, MatOption, MatButton, RouterLink],
  templateUrl: './product-filters.component.html',
  styleUrl: './product-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFiltersComponent implements OnInit {
  @Output() userInput = new EventEmitter<ProductFilters>;
  @Output() queryInput = new EventEmitter<ProductFilters>;

  readonly form = this._fb.group({
    type: [''],
    country: ['']
  });
  readonly typeList: Type[] = [
    { name: 'All', uid: emptySegment },
    { name: 'Red', uid: 'red' },
    { name: 'White', uid: 'white' }
  ];
  readonly countryList: Country[] = [
    { name: 'All', codeA2: emptySegment },
    { name: 'France', codeA2: 'fr' },
    { name: 'Italy', codeA2: 'it' }
  ];

  constructor(
    private _store: Store,
    private _fb: UntypedFormBuilder,
    private _destroyRef: DestroyRef
  ) {
  }

  ngOnInit(): void {
    this._store.select(getRouterSelectors().selectRouteParams)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(params => {
        const { type, country } = params;
        this.form.patchValue({
          type,
          country
        });

        if (this.form.valid) {
          this.queryInput.next(this.form.value);
        }
      });
  }

  public onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.userInput.next(this.form.value);
  }
}
