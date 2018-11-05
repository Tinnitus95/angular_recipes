import { RecipeLandingComponent } from './recipe-landing.component';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';


describe('RecipeLanding should', () => {
  let component: RecipeLandingComponent;
  let fixture: ComponentFixture<RecipeLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeLandingComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Create component', () => {
    expect(component).toBeTruthy();
  });
});

