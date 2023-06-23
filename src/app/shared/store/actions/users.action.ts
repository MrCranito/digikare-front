import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "src/app/shared/models/user/user.model";

export const UsersActions = createActionGroup({
    source: 'Users',
    events: {
        'Create User': props<{ user: User }>(),
        'Get Current User': props<{ email: string | null }>(),
        'Delete User': props<{ id: string }>(),
    }
})

export const UsersActionsSuccess = createActionGroup({
    source: 'Users Success',
    events: { 
        'Create User Success': props<{ user: User }>(),
        'Get Current User Success': props<{ user: User }>(),
        'Delete User Success': emptyProps(),
    }
})

export const UsersActionsError = createActionGroup({
    source: 'Users Error',
    events: {
        'Create User Error': props<{ error: Error }>(),
        'Get Current User Error': props<{ error: Error }>(),
        'Delete User Error': props<{ error: Error }>(),
    }
})