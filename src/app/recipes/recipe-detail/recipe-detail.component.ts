
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import * as ShoppingListAction from './../../shopping-list/store/shopping-list.actions';

import * as fromRecipe from '../store/recipe.reducer';
import * as RecipeActions from '../store/recipe.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
   recipeState: Observable<fromRecipe.State>;
   id: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRecipe.FeatureState>
    ) { }

   // pass the "id" to return the index of the array
  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        // console.log(params);

      this.id = +params['id'];
      this.recipeState = this.store.select('recipes');
    });
  }

  onAddToShopping() {
    this.store.select('recipes').pipe(take(1)).subscribe((recipeState: fromRecipe.State) => {
      this.store.dispatch(new ShoppingListAction.AddIngredients(recipeState.recipes[this.id].ingredients));
    });
  }

  onEditRecipe() {
    this.router.navigate([`/recipes/${this.id}/edit`]);
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}
