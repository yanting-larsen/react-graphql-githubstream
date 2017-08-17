import React from 'react';
import {shallow} from 'enzyme';
import Main from './Main';

test('Main displays issues', () => {
    const issue = {
        id: 'MDU6SXNzdWUyNTEwNzA4MTQ=',
        createdAt: '2017-08-17T21:00:02Z',
        title: 'reduce equal code lines in spec files',
        bodyText: 'hello world',
        url: 'https://github.com/Ks89/My-MEAN-website-server/issues/96',
        repository: {
            name: 'My-MEAN-website-server',
            url: 'https://github.com/Ks89/My-MEAN-website-server'
        },
        author: {
            avatarUrl: 'https://avatars3.githubusercontent.com/u/6057207?v=4',
            url: 'https://github.com/Ks89'
        }
    };
    const main = shallow(
        <Main limit={1} refreshRate={10000} />
    );

    main.setState({ issues: [issue] });

    expect(main.find('ol li')).toHaveLength(1);

    const issueEl = main.find('ol li').first();

    expect(issueEl.find('dd.date FormattedDate').prop('value')).toEqual(new Date(issue.createdAt));
    expect(issueEl.find('dt').text()).toEqual(issue.title);
    expect(issueEl.find('dd.text').text()).toEqual(issue.bodyText);
    expect(issueEl.find('dt a').prop('href')).toEqual(issue.url);
    expect(issueEl.find('dd.reponame').text()).toEqual(issue.repository.name);
    expect(issueEl.find('dd.reponame a').prop('href')).toEqual(issue.repository.url);
    expect(issueEl.find('.author a').prop('href')).toEqual(issue.author.url);
    expect(issueEl.find('.author img').prop('src')).toEqual(issue.author.avatarUrl);
});

