import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { groupBy as _groupBy, isEmpty as _isEmpty } from 'lodash';

import { RecipeService } from '../recipe.service';
import { IngredientService } from '../ingredient.service';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../ingredient.model';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-list-page.component.html',
  styleUrls: ['./recipe-list-page.component.css'],
})
export class RecipeListPageComponent implements OnInit {
  recipes: Recipe[] = [];
  ingredientsByCategory: { [key: string]: Ingredient[] } = {};
  queryIngredients: string[] = [];

  recipesLiked: string[] = [];
  recipesDisliked: string[] = [];

  constructor(
    private recipeService: RecipeService,
    private ingredientService: IngredientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.ingredientService.getIngredients().subscribe((x: Ingredient[]) => {
      this.ingredientsByCategory = _groupBy(x, 'categoryName');
    });

    const ingredients = this.route.snapshot.queryParamMap.get('ingredients');

    if (ingredients && ingredients.trim()) {
      this.queryIngredients = ingredients.split(/\s*,\s*/);
      this.getRecipesByIngredients(ingredients);
    } else {
      this.getAllRecipes();
    }
  }

  onClickRemoveQueryIngredient(ingredientName: string) {
    this.queryIngredients = this.queryIngredients.filter(
      ingredient => ingredient !== ingredientName
    );
  }

  onToggleIngredient(event, ingredientName: string) {
    if (event.checked) {
      this.queryIngredients = this.queryIngredients.concat(ingredientName);
    } else {
      this.queryIngredients = this.queryIngredients.filter(
        ingredient => ingredient !== ingredientName
      );
    }
  }

  onClickSearchAgain(event) {
    event.preventDefault();

    if (_isEmpty(this.queryIngredients)) {
      this.getAllRecipes();
      this.router.navigate(['/recipes']);
      return;
    }

    const ingredientsAsStr = this.queryIngredients.join(',');
    this.getRecipesByIngredients(ingredientsAsStr);
    this.router.navigate(['/recipes'], {
      queryParams: { ingredients: ingredientsAsStr },
    });
  }

  getAllRecipes() {
    this.recipeService
      .getRecipes()
      .subscribe((recipes: Recipe[]) => (this.recipes = recipes));
  }

  getRecipesByIngredients(ingredients: string) {
    this.recipeService
      .getRecipesByIngredients(ingredients)
      .subscribe((recipes: Recipe[]) => (this.recipes = recipes));
  }

  onClickLikeRecipe(recipeId: string) {
    this.recipeService.likeRecipe(recipeId).subscribe((success: boolean) => {
      if (success) {
        this.recipesLiked = this.recipesLiked.concat(recipeId);
        this.recipes = this.recipes.map(
          recipe =>
            recipe.id === recipeId
              ? { ...recipe, numOfLikes: recipe.numOfLikes + 1 }
              : recipe
        );
      }
    });
  }

  onClickDislikeRecipe(recipeId: string) {
    this.recipeService.dislikeRecipe(recipeId).subscribe((success: boolean) => {
      if (success) {
        this.recipesDisliked = this.recipesDisliked.concat(recipeId);
        this.recipes = this.recipes.map(
          recipe =>
            recipe.id === recipeId
              ? { ...recipe, numOfDislikes: recipe.numOfDislikes + 1 }
              : recipe
        );
      }
    });
  }

  onClickRecipeTitle(recipeId: string) {
    this.router.navigate([`/recipes/${recipeId}`]);
  }
}
