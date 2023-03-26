import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { legacy_createStore, StoreEnhancer } from 'redux';
import * as root from './reducer-root';

export const makeStore = <Ext = {}, StateExt = {}>(enhancer?: StoreEnhancer<Ext, StateExt>) => (
  legacy_createStore(root.reducer, enhancer)
);

export type AppState = root.ReducerState;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export const useAppDispatch = useDispatch;
