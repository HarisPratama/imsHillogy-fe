import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { setItems, setItem, setThreshold, setItemsThreshold, setTransactions } from './item.actions';
import { ItemStoreInterface } from 'src/app/interfaces/item.interface';

export const initialState: ItemStoreInterface = {
    items: [],
    item: {
        name: '',
        description: '',
        quantity: 0,
        price: 0,
    },
    threshold: 0,
    itemsThreshold: [],
    transactions: []
};

export const itemReducer = createReducer(
  initialState,
  on(setItems, (state, actions) => ({ ...state, items: actions.payload })),
  on(setItem, (state, actions) => ({ ...state, item: actions.payload })),
  on(setThreshold, (state, actions) => ({ ...state, threshold: actions.payload })),
  on(setItemsThreshold, (state, actions) => ({ ...state, itemsThreshold: actions.payload })),
  on(setTransactions, (state, actions) => ({ ...state, transactions: actions.payload })),
);

export const selectItemStore = createFeatureSelector<ItemStoreInterface>('item')

export const selectItems = createSelector(
  selectItemStore,
  (state: ItemStoreInterface) => state.items
)

export const selectItem = createSelector(
  selectItemStore,
  (state: ItemStoreInterface) => state.item
)

export const selectThreshold = createSelector(
  selectItemStore,
  (state: ItemStoreInterface) => state.threshold
)

export const selectitemThreshold = createSelector(
  selectItemStore,
  (state: ItemStoreInterface) => state.itemsThreshold
)

export const selectTransactions = createSelector(
  selectItemStore,
  (state: ItemStoreInterface) => state.transactions
)
