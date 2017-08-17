import AppDispatcher from '../AppDispatcher';
import {ActionTypes} from '../Constants';

let ServerActions = {
    receiveIssues(issues) {
        console.log('2.In ServerActions');
        AppDispatcher.dispatch({
            actionType: ActionTypes.RECEIVE_ISSUES,
            issues: issues
        });
    }
};

export default ServerActions;
