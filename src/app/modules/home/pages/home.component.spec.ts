import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthActions } from 'src/app/shared/store/actions/auth.action';
import { EventsAction } from 'src/app/shared/store/actions/events.action';
import { User } from 'src/app/shared/models/user/user.model';
import { of } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';
import { selectUser } from 'src/app/shared/store/selectors/users.selector';

describe('HomeComponent', () => {
let spectator: Spectator<HomeComponent>;
let component: HomeComponent;

const createComponent = createComponentFactory({
    component: HomeComponent,
    imports: [ReactiveFormsModule],
    providers: [provideMockStore({})],
});

    beforeEach(() => {
        const mockUser: User = {
            id: '1',
            email: '',
            consents: [
                { id: 'email_notifications', enabled: true },
                { id: 'sms_notifications', enabled: false },
            ],
        };
        spectator = createComponent();
        component = spectator.component
    });

    it('should create', () => {
        expect(component).toBeInstanceOf(HomeComponent);
    });

    describe('initialization', () => {
        it('should initialize the component', () => {
            expect(component.currentUser$).toBeDefined();
            expect(component.isLoading$).toBeDefined();
            expect(component.user).toBeUndefined();
            expect(component.form).toBeDefined();
        });
    })

    describe('selectSMS', () => {
        it('should update sms value', () => {
            const event = { target: { checked: true } };
            component.selectSMS(event);
            expect(component.form.get('sms')!.value).toEqual(true);
        });
    })

    describe('selectEmail', () => {
        it('should update email value', () => {
            const event = { target: { checked: true } };
            component.selectEmail(event);
            expect(component.form.get('email')!.value).toEqual(true);
        });
    })

    describe('logOut', () => {
        it('should dispatch logout action', () => {
            const store = spectator.inject(Store);
            const dispatchSpy = spyOn(store, 'dispatch');
    
            component.logOut();
    
            expect(dispatchSpy).toHaveBeenCalledWith(AuthActions.logout());
        });
    })

    describe('updateConsents', () => {
        it('should dispatch createEvent action', () => {
            const store = spectator.inject(Store);
            const dispatchSpy = spyOn(store, 'dispatch');
    
            const mockUser: User = { id: '1', email: '', consents: [] };
            component.user = mockUser;
    
            component.form.get('email')!.setValue(true);
            component.form.get('sms')!.setValue(false);
    
            component.updateConsents();
    
            const expectedEvent = {
                id: null,
                consents: [
                    { id: 'sms_notifications', enabled: false },
                    { id: 'email_notifications', enabled: true },
                ],
            };
    
            expect(dispatchSpy).toHaveBeenCalledWith(
                EventsAction.createEvent({ event: expectedEvent, userId: '1' })
            );
        });
    }) 
});