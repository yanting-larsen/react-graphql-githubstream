import {ajax} from 'jquery';
import ServerActions from './actions/ServerActions';
import {GithubToken} from './Constants';

let API = {
    fetchIssues(limit){
        console.log("1. In API");
        ajax({
            method: 'post',
            url: 'https://api.github.com/graphql',
            contentType: "application/json",
            headers: {
                Authorization: `bearer ${GithubToken}`,
            },
            data: JSON.stringify({
                query: `{
                    search(query: "language:JavaScript is:issue", type: ISSUE, first: ${limit}) {
                        nodes {
                            ... on Issue {
                                id
                                createdAt
                                title
                                bodyText
                                url
                                repository {
                                    name
                                    url
                                }
                                author {
                                    avatarUrl
                                    url
                                }
                            }
                        }
                    }
                }`
            })
        }).done(resp => {
            ServerActions.receiveIssues(resp.data.search.nodes);
        });
    }
    
}

export default API;