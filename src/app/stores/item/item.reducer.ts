import { createReducer, on } from '@ngrx/store';
import { setItems, setItem } from './item.actions';
import { ItemStoreInterface } from 'src/app/interfaces/item.interface';

export const initialState: ItemStoreInterface = {
    items: [],
    item: {
        name: '',
        description: '',
        quantity: 0,
        price: 0,
    }
};

export const itemReducer = createReducer(
  initialState,
  on(setItems, (state, actions) => ({ ...state, items: actions.payload })),
  on(setItem, (state, actions) => ({ ...state, item: actions.payload })),
);
