import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Ingredient } from './ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  fetchingData = new Subject<boolean>();

  private ingredientsUrl = 'http://localhost:1206/api/ingredients';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.fetchingData.next(false);
  }

  getIngredients(): Observable<Ingredient[]> {
    this.fetchingData.next(true);
    return this.http.get<Ingredient[]>(this.ingredientsUrl).pipe(
      tap(_ => this.fetchingData.next(false)),
      catchError((err: Error) => {
        this.snackBar.open(`Error: ${err.message}`);
        return of([] as Ingredient[]);
      })
    );
  }
}
