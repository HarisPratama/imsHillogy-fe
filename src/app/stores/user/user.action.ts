import { createAction, props } from '@ngrx/store';
import { ItemInterface } from 'src/app/interfaces/item.interface';
import { User } from 'src/app/interfaces/user.interface';

export const setUsers = createAction(
    '[Item Component] Get Users',
    props<{payload: User[]}>()
);

export const setUser = createAction(
    '[Item Component] Get User',
    props<{payload: User}>()
);
