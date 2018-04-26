import { combineReducers, Reducer } from 'redux';

import { appReducer, AppState } from './appReducer';

interface ReduxState {
    app: AppState;
}

const rootReducer: Reducer<ReduxState> = combineReducers<ReduxState>({
    app: appReducer,
});

export { ReduxState };
export default rootReducer;
