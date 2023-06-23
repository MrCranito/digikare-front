import { createReducer, on } from "@ngrx/store";
import { UsersActions, UsersActionsSuccess } from "../actions/users.action";
import { User } from "src/app/shared/models/user/user.model";
import { AuthActions } from "../actions/auth.action";

export const usersFeatureKey = 'users';

export interface UsersState {
    user: User | null
    isLoading: boolean
}

export const usersInitialState: UsersState = {
    user: null,
    isLoading: false
};

export const usersReducer = createReducer(
    usersInitialState,

    on(UsersActions.getCurrentUser, (state) => {
        return {
            ...state,
            isLoading: true
        }
    }),
    on(UsersActions.createUser, (state) => {
        return {
            ...state,
            isLoading: true
        }
    }),
    on(UsersActionsSuccess.getCurrentUserSuccess, (state, action) => {
        return {
            ...state,
            user: action.user,
            isLoading: false
        }
    }),
    on(UsersActionsSuccess.createUserSuccess, (state, action) => {
        return {
            ...state,
            user: action.user,
            isLoading: false
        }
    }),
    on(UsersActionsSuccess.deleteUserSuccess, (state) => {
        return {
            ...state,
            user: null
        }
    }),
    on(AuthActions.logout, (state) => {
        return {
            ...state,
            user: null
        }
    })
)