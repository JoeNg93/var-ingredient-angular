import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject, Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  fetchingData = new Subject<boolean>();

  private recipesUrl =
    window.location.hostname === 'localhost'
      ? 'http://localhost:1206/api/recipes'
      : 'api/recipes';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.fetchingData.next(false);
  }

  getRecipes(): Observable<Recipe[]> {
    this.fetchingData.next(true);
    return this.http.get<Recipe[]>(this.recipesUrl).pipe(
      tap(_ => this.fetchingData.next(false)),
      catchError((err: Error) => {
        this.snackBar.open(`Error: ${err.message}`);
        return of([] as Recipe[]);
      })
    );
  }

  getRecipesByIngredients(ingredients: string): Observable<Recipe[]> {
    const queryParams = new HttpParams({
      fromObject: {
        ingredients,
      },
    });

    this.fetchingData.next(true);
    return this.http
      .get<Recipe[]>(this.recipesUrl, { params: queryParams })
      .pipe(
        tap(_ => this.fetchingData.next(false)),
        catchError((err: Error) => {
          this.snackBar.open(`Error: ${err.message}`);
          return of([] as Recipe[]);
        })
      );
  }

  getRecipe(id: string): Observable<Recipe> {
    this.fetchingData.next(true);
    return this.http.get<Recipe>(`${this.recipesUrl}/${id}`).pipe(
      tap(_ => this.fetchingData.next(false)),
      catchError((err: Error) => {
        this.snackBar.open(`Error: ${err.message}`);
        return of({} as Recipe);
      })
    );
  }

  likeRecipe(id: string): Observable<boolean> {
    return this.http.patch<boolean>(`${this.recipesUrl}/${id}/likes`, {}).pipe(
      map(res => true),
      catchError<boolean>((err: Error) => {
        this.snackBar.open(`Error: ${err.message}`);
        return false as never;
      })
    );
  }

  dislikeRecipe(id: string): Observable<boolean> {
    return this.http
      .patch<boolean>(`${this.recipesUrl}/${id}/dislikes`, {})
      .pipe(
        map(res => true),
        catchError<boolean>((err: Error) => {
          this.snackBar.open(`Error: ${err.message}`);
          return false as never;
        })
      );
  }
}
