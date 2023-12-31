import { createActionGroup, emptyProps } from "@ngrx/store";

export const AuthActions = createActionGroup({
    source: 'Auth',
    events: {
        'Login': emptyProps(),
        'Logout': emptyProps()
    }
})