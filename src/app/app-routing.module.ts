
import { HomeComponent } from './core/home/home.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules} from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';


const appRoutes: Routes = [
  // pathMatch full enables redirect for empty paths
  {path: '', component: HomeComponent},
  // This is how to lazy load a module
  {path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
  {path: 'shopping', component: ShoppingListComponent}
];

@NgModule({
  // Must also import the AppRoutingModule to AppModule
  // AoT for lazy loaded modules need to have a preloadingStrategy
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]

})
export class AppRoutingModule {

}
