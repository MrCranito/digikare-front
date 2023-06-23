import { createActionGroup, emptyProps } from "@ngrx/store";


export const RoutersAction = createActionGroup({
    source: 'Routers',
    events: {
        'Navigate to Home': emptyProps()
    }
})