import { createAction, props } from '@ngrx/store';
import { ItemInterface } from 'src/app/interfaces/item.interface';

export const setItems = createAction(
    '[Item Component] Get Items',
    props<{payload: ItemInterface[]}>()
);
export const setItem = createAction(
    '[Item Component] Get Item',
    props<{payload: ItemInterface}>()
);
