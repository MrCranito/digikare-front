import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RoutersAction } from "../../actions/routers.action";
import { map, of } from "rxjs";
import { AuthActions } from "../../actions/auth.action";
import { NotificationsService } from "../../../services/notifications/notifications.service";

@Injectable()
export class RoutersEffect {
    constructor(private actions$: Actions, private notificationsService: NotificationsService, private router: Router) {}

    redirectToHome$ = createEffect(() =>
     this.actions$.pipe(
        ofType(RoutersAction.navigateToHome),
        map(() => {
            return of(this.router.navigate(['/']))
        })
     ), { dispatch: false}
    )

    redirectToLogin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logout),
            map(() => {
                this.notificationsService.showSuccess('Utilisateur déconnecté avec succès')
                return of(this.router.navigate(['/login']))
            })
        ), { dispatch: false}
        )
}