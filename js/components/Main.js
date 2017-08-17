import React from 'react';
import API from '../API';
import IssueStore from '../stores/IssueStore';
import {FormattedRelative} from 'react-intl';
 

let _getAppState = () => {
    return { issues: IssueStore.getAll() };
};

class Main extends React.Component {

    static propTypes = {
        limit: React.PropTypes.number
    }

    static defaultProps = {
        limit: 10
    }
    
    state = _getAppState();

    componentDidMount() {
        API.fetchIssues(this.props.limit);
        IssueStore.on('change', this.onChange);
    }
    componentWillUnmount() {
        IssueStore.removeListener('change', this.onChange);
    }
    onChange = () => {
        console.log('4. In the view');
        this.setState(_getAppState());
    }

    render() {
        let content = this.state.issues.map(issue => {
            const date = new Date(issue.createdAt);

            return <li key={issue.id}>
                    <div className='content'>
                        <div><a href={issue.author.url}><img src={issue.author.avatarUrl}/></a></div>
                        <dl>
                        <dt className='title'><a href={issue.url}><span>{issue.title}</span></a></dt>
                        <dd className='reponame'><a href={issue.repository.url}>{issue.repository.name}</a></dd>
                        <dd className='date'>
                            <FormattedRelative value={date} />
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