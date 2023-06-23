import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { RegisterComponent } from './register.component';
import { Action, Store } from '@ngrx/store';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersActions } from 'src/app/shared/store/actions/users.action';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, ReplaySubject } from 'rxjs';

describe('RegisterComponent', () => {
  let spectator: Spectator<RegisterComponent>;
  let component: RegisterComponent;
  let store: Store;
  let actions$: Observable<Action>;

  const createComponent = createComponentFactory({
    component: RegisterComponent,
    imports: [ReactiveFormsModule, FormsModule],
    providers: [provideMockStore({}), provideMockActions(() => actions$)],
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

  it('should mark form as touched on value changes', () => {
    const formMarkAsTouchedSpy = spyOn(component.form, 'markAsTouched');

    component.form.setValue({ email: 'test@example.com' });

    expect(formMarkAsTouchedSpy).toHaveBeenCalled();
  });

  it('should dispatch createUser action on onSubmit method call', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const email = 'test@example.com';
    component.form.get('email')!.setValue(email);

    component.onSubmit();


    expect(dispatchSpy).toHaveBeenCalledWith(UsersActions.createUser({ user: { id: null, email, consents: [] } }));
  });
});