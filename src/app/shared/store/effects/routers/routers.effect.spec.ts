import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { RoutersEffect } from './routers.effect';
import { Actions } from '@ngrx/effects';
import { Router } from '@angular/router';
import { NotificationsService } from '../../../services/notifications/notifications.service';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, ReplaySubject } from 'rxjs';
import { AuthActions } from '../../actions/auth.action';
import { RoutersAction } from '../../actions/routers.action';
import { Action } from '@ngrx/store';

describe('RoutersEffect', () => {
  let spectator: SpectatorService<RoutersEffect>;
  let effects: RoutersEffect;
  let notificationsService: NotificationsService;
  let router: Router;
  let actions$: Observable<Action>;

  const createService = createServiceFactory({
    service: RoutersEffect,
    providers: [
        RoutersEffect,
        provideMockActions(() => actions$),
        {
            provide: NotificationsService,
            useValue: {
                showSuccess: () => {}
            }
        },
        {
            provide: Router,
            useValue: {
                navigate: () => {}
            }
        }
    ],
  });

  beforeEach(() => {
    spectator = createService();
    effects = spectator.inject(RoutersEffect);
    actions$ = spectator.inject(Actions);
    notificationsService = spectator.inject(NotificationsService);
    router = spectator.inject(Router);
  })

  it('should compile', () => {
    expect(effects).toBeTruthy();
  })

  describe('redirectToHome$', () => {
    beforeEach(() => {
        actions$ = of(RoutersAction.navigateToHome)
    })

    it('should navigate to home page', () => {
      const navigateSpy = spyOn(router, 'navigate');

      effects.redirectToHome$.subscribe(() => {
        expect(navigateSpy).toHaveBeenCalledWith(['/']);
      });
    });
  });

  describe('redirectToLogin$', () => {
    beforeEach(() => {  
        actions$ = of(AuthActions.logout)
    })

    it('should navigate to login page and show success notification', () => {
      const navigateSpy = spyOn(router, 'navigate');
      const showSuccessSpy = spyOn(notificationsService, 'showSuccess');

      effects.redirectToLogin$.subscribe(() => {
        expect(showSuccessSpy).toHaveBeenCalledWith('Utilisateur déconnecté avec succès');
        expect(navigateSpy).toHaveBeenCalledWith(['/login']);
      });
    });
  });
});
