import { Ingredient } from '../shared/Ingredient.model';

export class Recipe {
    constructor(
        public name: string,
        public desc: string,
        public imagePath: string,
        public ingredients: Ingredient[]
        ) {
    }
}
