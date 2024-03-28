import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { UserStore } from 'src/app/interfaces/user.interface';
import { setUser, setUsers } from './user.action';

export const initialState: UserStore = {
    users: [],
    user: {
        "_id": "",
        "name": "",
        "profileImage": "",
        "username": "",
        "email": "",
        "role": "",
        "gender": "",
        "birthDate": "",
    }
};

export const userReducer = createReducer(
  initialState,
  on(setUsers, (state, actions) => ({ ...state, users: actions.payload })),
  on(setUser, (state, actions) => ({ ...state, user: actions.payload })),
);

export const selectUserStore = createFeatureSelector<UserStore>('user')

export const selectUsers = createSelector(
  selectUserStore,
  (state: UserStore) => state.users
)

export const selectUser = createSelector(
  selectUserStore,
  (state: UserStore) => state.user
)
