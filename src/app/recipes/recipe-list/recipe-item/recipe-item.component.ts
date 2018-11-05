import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeItemComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('recipeProp') recipe: Recipe;
  @Input() index: number;

  constructor( ) { }

  ngOnInit() {

  }



}
