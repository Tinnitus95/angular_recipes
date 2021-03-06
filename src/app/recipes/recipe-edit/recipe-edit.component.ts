import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import * as RecipeActions from '../store/recipe.actions';
import * as fromRecipe from '../store/recipe.reducer';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRecipe.FeatureState>) {}


  ngOnInit() {
    // params is a observable and allows subscribing to
    this.route.params
      .subscribe((params: Params) => {
        // console.log(params);
        if (params) {
          this.id = +params['id'];
          // console.log(params);

          this.editMode = params['id'] != null;
        }
        this.initForm();
        // check if there is an ID, if true set editMode
    });
  }

  onSubmit() {
    // const value = this.recipeForm.value;
    // const newRecipe = new Recipe(
    //   value['name'],
    //   value['desc'],
    //   value['imagePath'],
    //   value['ingredients']);
    if (this.editMode) {
      this.store.dispatch(new RecipeActions.UpdateRecipe({index: this.id, updatedRecipe: this.recipeForm.value}));
    } else {
     this.store.dispatch(new RecipeActions.AddRecipe(this.recipeForm.value));
    }
    this.router.navigate([`/recipes/${this.id}`]);

  }

  onAddIngredient() {
  (<FormArray>this.recipeForm.get('ingredients')).push(
    new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    }));
}
  onDeleteIngredient(index: number) {
    // Delete the ingredient form group with index i
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onCancel() {
    this.router.navigate([`/recipes/${this.id}`]);
  }

  private initForm() {

    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.store.select('recipes').pipe(take(1)).subscribe((recipeState: fromRecipe.State) => {
        const recipe = recipeState.recipes[this.id];
        recipeName = recipe.name;
        recipeImagePath = recipe.imagePath;
        recipeDescription = recipe.desc;
         if (recipe['ingredients']) {
          for (const ingredient of recipe.ingredients) {
            recipeIngredients.push(
             new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
      });
    }

    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }
}
