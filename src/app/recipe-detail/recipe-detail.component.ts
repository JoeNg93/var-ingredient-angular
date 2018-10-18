import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isEmpty as _isEmpty } from 'lodash';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe = null;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const recipeId = this.route.snapshot.paramMap.get('id');

    this.recipeService
      .getRecipe(recipeId)
      .subscribe((recipe: Recipe) => (this.recipe = recipe));
  }

  recipeNotEmpty() {
    return !_isEmpty(this.recipe);
  }

  getImageUrl() {
    return `http://res.cloudinary.com/dicyn7jds/image/upload/${
      this.recipe.image.versionId
    }/${this.recipe.image._id}.${this.recipe.image.imageType}`;
  }
}
