import { createAction, props } from '@ngrx/store';
import { ItemInterface, TransactionInterface } from 'src/app/interfaces/item.interface';

export const setItems = createAction(
    '[Item Component] Get Items',
    props<{payload: ItemInterface[]}>()
);

export const setItem = createAction(
    '[Item Component] Get Item',
    props<{payload: ItemInterface}>()
);

export const setThreshold = createAction(
    '[Item Component] Get Item Threshold',
    props<{payload: number}>()
);

export const setItemsThreshold = createAction(
    '[Item Component] Get Items Threshold',
    props<{payload: ItemInterface[]}>()
);

export const setTransactions = createAction(
    '[Item Component] Get Transactions',
    props<{payload: TransactionInterface[]}>()
);
