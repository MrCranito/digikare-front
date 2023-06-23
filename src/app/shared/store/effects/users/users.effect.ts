import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersActions, UsersActionsError, UsersActionsSuccess } from "../../actions/users.action";
import { UsersService } from "src/app/shared/services/users/users.service";
import { catchError, exhaustMap, map, of } from "rxjs";
import { User } from "src/app/shared/models/user/user.model";
import { RoutersAction } from "../../actions/routers.action";
import { NotificationsService } from "../../../services/notifications/notifications.service";

@Injectable()
export class UsersEffect {
    constructor(private actions$: Actions, private notificationsService: NotificationsService, private usersService: UsersService) {}

    getCurrentUser$ = createEffect(() =>  
        this.actions$.pipe(
            ofType(UsersActions.getCurrentUser),
            exhaustMap((action) => {
                return this.usersService.getCurrentUser(action!.email).pipe(
                    map((user: User) => {
                        this.notificationsService.showSuccess('Connexion Success !')
                        return UsersActionsSuccess.getCurrentUserSuccess({ user });
                    }),
                    catchError((error: any) => {
                        if(error.status === 404)  {
                            this.notificationsService.showError("L'utilisateur n'existe pas")
                        } else {
                            this.notificationsService.showError("Une erreur est survenue lors de la création de l'évènement")
                        }
                        return of(UsersActionsError.createUserError({ error }));
                    })
                )
            })
        )
    )

    createUser$ = createEffect(() =>  
        this.actions$.pipe(
            ofType(UsersActions.createUser),
            exhaustMap((action) => {
                return this.usersService.createUser(action.user).pipe(
                    map((user: User) => {
                        this.notificationsService.showSuccess('Utilisateur créé avec succès !')
                        return UsersActionsSuccess.createUserSuccess({ user });
                    }),
                    catchError((error: Error) => {
                        this.notificationsService.showError("Une erreur est survenue lors de la création de l'utilisateur")
                        return of(UsersActionsError.createUserError({ error }));
                    })
                )
            })
        )
    )

    deleteUser$ = createEffect(() =>  
        this.actions$.pipe(
            ofType(UsersActions.deleteUser),
            exhaustMap((action) => {
                return this.usersService.deleteUser(Number.parseInt(action.id, 10)).pipe(
                    map(() => {
                        this.notificationsService.showSuccess('Utilisateur supprimé avec succès !')
                        return UsersActionsSuccess.deleteUserSuccess();
                    }),
                    catchError((error: Error) => {
                        this.notificationsService.showError("Une erreur est survenue lors de la suppression de l'utilisateur")
                        return of(UsersActionsError.deleteUserError({ error }));
                    })
                )
            })
        )
    )

    navigateToHome$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActionsSuccess.createUserSuccess, UsersActionsSuccess.getCurrentUserSuccess),
            map(() => {
                return RoutersAction.navigateToHome();
            })
        )
    )
}