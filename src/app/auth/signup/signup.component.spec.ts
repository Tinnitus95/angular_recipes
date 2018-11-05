import { FormsModule } from '@angular/forms';
import { TestBed, inject, async } from '@angular/core/testing';
import { TestStore } from './../../shared/testStore.store';
import { ComponentFixture } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { Store } from '@ngrx/store';
import * as AuthActions from './../store/auth.actions';


describe('signupComponent should', () => {
  let store: TestStore<any>;
  let fixture: ComponentFixture<SignupComponent>;
  let component: SignupComponent;
  let dispatchSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      providers: [{
        provide: Store, useClass: TestStore
      }],
      imports: [FormsModule]
    }).compileComponents();
  });
  beforeEach(async((inject([Store], (testStore: TestStore<any>) => {
    store = testStore;
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.debugElement.componentInstance;
  }))));

  it('create the component', () => {
    expect(component).toBeTruthy();
  });

  it('allow the user to sign up', () => {
    dispatchSpy = spyOn(store, 'dispatch');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      new AuthActions.TrySignup({username: undefined, password: undefined})
    );
  });
});

