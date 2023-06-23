import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffect } from './users.effect';
import { Actions } from '@ngrx/effects';
import { Observable, of, throwError } from 'rxjs';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { NotificationsService } from '../../../services/notifications/notifications.service';
import { UsersActions, UsersActionsError, UsersActionsSuccess } from '../../actions/users.action';
import { User } from 'src/app/shared/models/user/user.model';
import { provideMockActions } from '@ngrx/effects/testing';
import { HttpClientModule } from '@angular/common/http';
import { Action } from '@ngrx/store';

describe('UsersEffect', () => {
    let spectator: SpectatorService<UsersEffect>;
    let effects: UsersEffect;
    let actions$: Observable<Action>;
    let usersService: UsersService;
    let notificationsService: NotificationsService;

    const createService = createServiceFactory({
      service: UsersEffect,
      imports: [HttpClientModule],
      providers: [
        UsersEffect,
        provideMockActions(() => actions$),
        {
            provide: NotificationsService,
            useValue: {
                showSuccess: () => {},
                showError: () => {}
            }
        },
        {
            provide: UsersService,
            useValue: {
                createUser: () => {},
                getCurrentUser: () => {},
                deleteUser: () => {},
            }
        }
        ],
    });
  
    beforeEach(() => {
      spectator = createService();
      effects = spectator.inject(UsersEffect);
      actions$ = spectator.inject(Actions);
      usersService = spectator.inject(UsersService);
      notificationsService = spectator.inject(NotificationsService);
    });
  
    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
  
    describe('createUser$', () => {
      beforeEach(() => {
        actions$ = of(UsersActions.createUser({user: {id: '1', email: 'johndoe@gmail.com', consents: []}}))
      })

      it('should dispatch UsersActionsSuccess.createUserSuccess and show success notification on successful event creation', () => {
        const user: User = {
          id: '1',
          email:'johndoe@gmail.com',
          consents: [],
        };
        const action = UsersActions.createUser({ user });
        const successNotificationSpy = spyOn(notificationsService, 'showSuccess');
        const createUserSpy = spyOn(usersService, 'createUser').and.returnValue(of(user));
  
        effects.createUser$.subscribe((result) => {
          expect(result).toEqual(UsersActionsSuccess.createUserSuccess({ user }));
          expect(successNotificationSpy).toHaveBeenCalledWith('Utilisateur créé avec succès !');
          expect(createUserSpy).toHaveBeenCalledWith(user);
        });
  
      });
  
      it('should dispatch UsersActionsError.createUserError and show error notification on event creation error', () => {
        const user: User = {
          id: '1',
          email: 'johndoe@gmail.com',
          consents: [],
        };
        const action = UsersActions.createUser({ user });
        const errorNotificationSpy = spyOn(notificationsService, 'showError');
        const createUserSpy = spyOn(usersService, 'createUser').and.returnValue(throwError(() => new Error()))
  
  
        effects.createUser$.subscribe((result) => {
          expect(result.type).toEqual(UsersActionsError.createUserError.type);
          expect(errorNotificationSpy).toHaveBeenCalledWith("Une erreur est survenue lors de la création de l'utilisateur");
          expect(createUserSpy).toHaveBeenCalledWith(user);
        });
  
      });
    });
  
    describe('getCurrentUser$', () => {
      beforeEach(() => {
        actions$ = of(UsersActions.getCurrentUser({ email: 'johndoe@gmail.com'}))
      })

      it('should dispatch UsersActionsSuccess.getCurrentUserSuccess on successful retrieval of current user', () => {
        const user: User = {
            id: '1',
            email:'johndoe@gmail.com',
            consents: [],
          };
          const action = UsersActions.getCurrentUser({ email: user.email });
          const successNotificationSpy = spyOn(notificationsService, 'showSuccess');
          const getCurrentUserSpy = spyOn(usersService, 'getCurrentUser').and.returnValue(of(user));
    
    
          effects.getCurrentUser$.subscribe((result) => {
            expect(result).toEqual(UsersActionsSuccess.getCurrentUserSuccess({ user }));
            expect(successNotificationSpy).toHaveBeenCalledWith('Connexion Success !');
            expect(getCurrentUserSpy).toHaveBeenCalledWith(user.email);
          });
      });
  
      it('should dispatch UsersActionsError.getHistoryEventsFromUserError on error during retrieval of history events', () => {
        const user: User = {
            id: '1',
            email: 'johndoe@gmail.com',
            consents: [],
          };
        const action = UsersActions.getCurrentUser({ email: user.email });
        const errorNotificationSpy = spyOn(notificationsService, 'showError');
        const getCurrentUserSpy = spyOn(usersService, 'getCurrentUser').and.returnValue(throwError(() => new Error()))


        effects.createUser$.subscribe((result) => {
        expect(result.type).toEqual(UsersActionsError.createUserError.type);
        expect(errorNotificationSpy).toHaveBeenCalledWith("Une erreur est survenue lors de la création de l'utilisateur");
        expect(getCurrentUserSpy).toHaveBeenCalledWith(user.email);
        });
      });
    });
  });
  