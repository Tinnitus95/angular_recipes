import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from './../../auth/store/auth.actions';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducer';
import * as RecipeActions from './../../recipes/store/recipe.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;
  constructor(
    private store: Store<fromApp.AppState>
    ) {}

  ngOnInit() {
    // extract the state
    this.authState = this.store.select('auth');
  }

  onRecipesSave() {
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }
  onRecipesGet() {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }
  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
