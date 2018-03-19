import { combineReducers } from 'redux';
import gradeReducer from './gradeReducer';

export default combineReducers({
    gradesInfo: gradeReducer
});
