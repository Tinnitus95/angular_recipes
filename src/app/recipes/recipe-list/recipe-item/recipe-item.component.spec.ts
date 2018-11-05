import { Recipe } from './../../recipe.model';
import { RecipeItemComponent } from './recipe-item.component';
import { RouterTestingModule} from '@angular/router/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { Component } from '@angular/core';

@Component({
  template: `
    <app-recipe-item [recipeProp]="recipe" [index]="i"></app-recipe-item>
  `
})
class TestHostComponent {
  recipe: Recipe = {name: 'Meatballs', desc: 'some balls', imagePath: '', ingredients: []};
  i = 1;
}

describe('RecipeItemComponent should', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeItemComponent, TestHostComponent],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('be created', () => {
    expect(component).toBeTruthy();
  });
});
