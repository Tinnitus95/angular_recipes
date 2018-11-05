
import * as AuthActions from './../store/auth.actions';
import { TestStore } from './../../shared/testStore.store';
import { Store } from '@ngrx/store';
import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { SigninComponent } from './signin.component';
import { FormsModule } from '@angular/forms';


describe('Signin Component should', () => {
  let store: TestStore<any>;
  let fixture: ComponentFixture<SigninComponent>;
  let component: SigninComponent;
  let dispatchSpy;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SigninComponent],
      providers: [
        {provide: Store, useClass: TestStore}
      ],
      imports: [FormsModule]
    }).compileComponents();
  });
  beforeEach(async((inject([Store], (testStore: TestStore<any>) => {
    store = testStore;
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.debugElement.componentInstance;
  }))));

  it('create the component', () => {

    expect(component).toBeTruthy();
  });

  it('allow the user to sign in', () => {
    dispatchSpy = spyOn(store, 'dispatch');


    const button = fixture.debugElement.nativeElement.querySelector('.btn-primary');
    button.click();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      new AuthActions.TrySignin({username: undefined, password: undefined})
    );
  });

});
