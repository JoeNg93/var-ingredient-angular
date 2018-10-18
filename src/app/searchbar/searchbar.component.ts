import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  MatAutocompleteSelectedEvent,
  MatChipInputEvent,
} from '@angular/material';
import _difference from 'lodash/difference';
import _map from 'lodash/map';
import _isEmpty from 'lodash/isEmpty';
import { IngredientService } from '../ingredient.service';
import { Ingredient } from '../ingredient.model';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent implements OnInit {
  ingredientCtrl = new FormControl();
  filteredIngredients: Observable<string[]>;
  ingredients: string[] = [];
  allIngredients: string[] = [];

  @ViewChild('ingredientInput')
  ingredientInput: ElementRef<HTMLInputElement>;

  constructor(
    private ingredientService: IngredientService,
    private router: Router
  ) {
    this.filteredIngredients = this.ingredientCtrl.valueChanges.pipe(
      startWith(''),
      map(
        (ingredient: string) =>
          ingredient.trim()
            ? this._filter(ingredient.trim())
            : this._getAutocompleteIngredients()
      )
    );
  }

  ngOnInit() {
    this.ingredientService
      .getIngredients()
      .subscribe(
        (ingredients: Ingredient[]) =>
          (this.allIngredients = _map(ingredients, 'name'))
      );
  }

  add(event: MatChipInputEvent) {
    // Dont allow user add ingredient by pressing Enter, just clear the value
    event.input.value = '';
  }

  onRemoveIngredient(value: string) {
    this.ingredients = this.ingredients.filter(
      ingredient => ingredient !== value
    );
  }

  onSelectIngredient(event: MatAutocompleteSelectedEvent): void {
    const ingredientName = event.option.viewValue;
    if (this.ingredients.indexOf(ingredientName) === -1) {
      this.ingredients = this.ingredients.concat(ingredientName);
    }
    this.ingredientInput.nativeElement.value = '';
    this.ingredientCtrl.setValue('');
  }

  onClickSearchRecipes(event) {
    event.preventDefault();

    if (_isEmpty(this.ingredients)) {
      this.router.navigate(['/recipes']);
      return;
    }

    this.router.navigate(['/recipes'], {
      queryParams: { ingredients: this.ingredients.join(',') },
    });
  }

  onClickClearSearchField(event) {
    event.preventDefault();

    this.ingredients = [];
  }

  private _getAutocompleteIngredients() {
    return _difference(this.allIngredients, this.ingredients);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this._getAutocompleteIngredients().filter(
      ingredient => ingredient.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
