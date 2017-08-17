import Helpers from './Helpers';

export let ActionTypes = {
    RECEIVE_ISSUES: 'RECEIVE_ISSUES'
}

export let GithubToken = Helpers.getParams(location.search).token;