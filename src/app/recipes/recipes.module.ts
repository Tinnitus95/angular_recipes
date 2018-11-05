import { FeatureState, recipeReducer } from './store/recipe.reducer';
import { StoreModule } from '@ngrx/store';
import { RecipesRoutingModule } from './recipes-routing.module';

import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeLandingComponent } from './recipe-landing/recipe-landing.component';
import { RecipesComponent } from './recipes.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { RecipeEffects } from './store/recipe.effects';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeLandingComponent,
    RecipeListComponent,
    RecipeEditComponent,
    RecipeDetailComponent,
    RecipeItemComponent,

  ],
  // Define withc modules you want to use in this module
  imports: [
    ReactiveFormsModule,
    RecipesRoutingModule,
    SharedModule,
    StoreModule.forFeature('recipes', recipeReducer),
    EffectsModule.forFeature([RecipeEffects])
  ]
})

export class RecipesModule {}
