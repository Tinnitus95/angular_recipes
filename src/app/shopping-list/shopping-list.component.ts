
import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/Ingredient.model';

import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from './../store/app.reducers';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<{ingredients: Ingredient[]}>;
  private subscription: Subscription;

  constructor( private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    // when we select an item to be edited we dispatch the StartEdit action
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
