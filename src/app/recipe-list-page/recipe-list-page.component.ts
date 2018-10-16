import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-list-page.component.html',
  styleUrls: ['./recipe-list-page.component.css'],
})
export class RecipeListPageComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const ingredients = this.route.snapshot.queryParamMap.get('ingredients');

    if (ingredients && ingredients.trim()) {
      this.recipeService
        .getRecipesByIngredients(ingredients)
        .subscribe((recipes: Recipe[]) => (this.recipes = recipes));
    } else {
      this.recipeService
        .getRecipes()
        .subscribe((recipes: Recipe[]) => (this.recipes = recipes));
    }
  }
}
