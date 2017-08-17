import AppDispatcher from '../AppDispatcher';
import {ActionTypes} from '../Constants';
import {EventEmitter} from  'events';

let _issues = [];
class IssueStore extends EventEmitter {
    constructor(props) {
        super(props);

        AppDispatcher.register(action => {
            switch(action.actionType) {
                case ActionTypes.RECEIVE_ISSUES:
                    console.log('3. In store');
                    _issues = action.issues;
                    this.emit('change');
                    break;
                default:
                //do nothing
            }
        });
    }

    getAll() {
        return _issues;
    }
}

export default new IssueStore();