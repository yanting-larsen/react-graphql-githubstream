import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import {IntlProvider} from 'react-intl';

ReactDOM.render(
    <IntlProvider locale='en'>
        <Main limit={20} refreshRate={5000} />
    </IntlProvider>,
    document.getElementById('react')
);  
