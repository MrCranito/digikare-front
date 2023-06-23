import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { LoginComponent } from './login.component';
import { Action, Store } from '@ngrx/store';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersActions } from 'src/app/shared/store/actions/users.action';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

describe('LoginComponent', () => {
  let spectator: Spectator<LoginComponent>;
  let component: LoginComponent;
  let store: Store;
  let actions$: Observable<Action>;

  const createComponent = createComponentFactory({
    component: LoginComponent,
    imports:[ReactiveFormsModule, FormsModule],
    providers: [provideMockStore({}), provideMockActions(() =>  actions$)],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
    store = spectator.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with email FormControl', () => {
    expect(component.form).toBeInstanceOf(FormGroup);
    expect(component.form.get('email')).toBeInstanceOf(FormControl);
  });

  it('should dispatch getCurrentUser action on logIn method call', () => {
    const email = 'test@example.com';
    const getCurrentUserSpy = spyOn(UsersActions, 'getCurrentUser');
    const dispatchSpy = spyOn(store, 'dispatch');

    component.form.get('email')!.setValue(email);

    component.logIn();

    expect(getCurrentUserSpy).toHaveBeenCalledWith({ email });
    expect(dispatchSpy).toHaveBeenCalledWith(UsersActions.getCurrentUser({ email }));
  });
});