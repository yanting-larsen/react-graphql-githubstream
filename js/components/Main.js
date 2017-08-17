import React from 'react';
import API from '../API';
import IssueStore from '../stores/IssueStore';
import {FormattedDate} from 'react-intl';


let _getAppState = () => {
    return { issues: IssueStore.getAll() };
};

class Main extends React.Component {

    static propTypes = {
        limit: React.PropTypes.number,
        refreshRate: React.PropTypes.number
    }

    static defaultProps = {
        limit: 10,
        refreshRate: 5000
    }


    state = _getAppState();
    intervalId;

    componentDidMount() {
        API.fetchIssues(this.props.limit);
        this.intervalId = setInterval(() => API.fetchIssues(this.props.limit), this.props.refreshRate);
        IssueStore.on('change', this.onChange);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
        IssueStore.removeListener('change', this.onChange);
    }

    onChange = () => {
        console.log('updating list');
        this.setState(_getAppState());
    }

    render() {
        let content = this.state.issues.map(issue => {
            const date = new Date(issue.createdAt);

            return <li key={issue.id}>
                    <div className='content'>
                        <div className='author'><a href={issue.author.url}><img src={issue.author.avatarUrl}/></a></div>
                        <dl>
                        <dt className='title'><a href={issue.url}><span>{issue.title}</span></a></dt>
                        <dd className='reponame'><a href={issue.repository.url}>{issue.repository.name}</a></dd>
                        <dd className='date'>
                            <FormattedDate value={date}
                                            weekday='short'
                                            hour='2-digit'
                                            minute='2-digit'
                                            second='2-digit'/>
                        </dd> 
                        <dd className='text'>{issue.bodyText}</dd>
                        </dl>
                    </div>
                    </li>;
        });
        return (
            <ol>
                {content}
            </ol>
        );
    }
}

export default Main;