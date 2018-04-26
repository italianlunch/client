import {
    applyMiddleware,
    compose,
    createStore,
    Middleware,
    Store,
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import sagas from './sagas/index';

const sagaMiddleware = createSagaMiddleware();

const getMiddleware = () => {
    const middleware: Middleware[] = [sagaMiddleware];
    return applyMiddleware(...middleware);
};

const configureStore = (initialState: any): Store<any> => {
    const store = compose(getMiddleware())(createStore)(
        rootReducer,
        initialState
    );
    sagaMiddleware.run(sagas);
    return store;
};

const reduxStore = configureStore({});

export default reduxStore;
