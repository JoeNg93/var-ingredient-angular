interface RecipeIngredient {
  _id: string;
  name: string;
  quantity: string;
}

interface RecipeImage {
  _id: string;
  imageType: string;
  versionId: string;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  numOfDislikes: number;
  numOfLikes: number;
  numOfMeals: number;
  instructions: string[];
  image: RecipeImage;
  ingredients: RecipeIngredient[];
}
