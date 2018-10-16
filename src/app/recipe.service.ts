import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  fetchingData = new Subject<boolean>();

  private recipesUrl = 'http://localhost:1206/api/recipes';

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
}
