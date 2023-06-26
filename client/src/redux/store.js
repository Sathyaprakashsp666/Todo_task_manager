import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../redux/reducers/authReducer';
import taskReducer from '../redux/reducers/taskReduecr';

const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
