import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsers from '../reducers/users.reducer';

export const selectUsersState = createFeatureSelector<fromUsers.UsersState>(
    fromUsers.usersFeatureKey
)

export const selectUser = createSelector(
    selectUsersState,
    (state: fromUsers.UsersState) => state?.user
)

export const selectIsLoadingUser = createSelector(
    selectUsersState,
    (state: fromUsers.UsersState) => state?.isLoading
)