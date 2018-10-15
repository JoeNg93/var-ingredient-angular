import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  MatAutocompleteSelectedEvent,
  MatChipInputEvent,
} from '@angular/material';
import { difference } from 'lodash';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent implements OnInit {
  ingredientCtrl = new FormControl();
  filteredIngredients: Observable<string[]>;
  ingredients: string[] = [];
  allIngredients: string[] = ['a', 'b', 'c', 'd', 'e', 'f'];

  @ViewChild('ingredientInput')
  ingredientInput: ElementRef<HTMLInputElement>;

  constructor() {
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

  ngOnInit() {}

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

  private _getAutocompleteIngredients() {
    return difference(this.allIngredients, this.ingredients);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this._getAutocompleteIngredients().filter(
      ingredient => ingredient.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
