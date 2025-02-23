'use client';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {api} from '@/services';
import {categoryReducer, paymentMethodReducer} from '@/slices';

const reducers = combineReducers({
  api: api.reducer,
  category: categoryReducer,
  paymentMethod: paymentMethodReducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware => {
    const defaultMiddleWares = [api.middleware];
    const middleWares = getDefaultMiddleware().concat(defaultMiddleWares);
    return middleWares;
  },
});

setupListeners(store.dispatch);

export {store};
