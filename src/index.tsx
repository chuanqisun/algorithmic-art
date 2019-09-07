import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ExperimentHost } from './facility/experiment-host/experiment-host';
import { ExperimentList } from './facility/experiment-list/experiment-list';
import { ExperimentBrowser } from './facility/experiment-browser/experiment-browser';

function AppRoot() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/host" component={ExperimentHost} />
        <Route path="/exp" component={ExperimentBrowser} />
        <Route path="/" component={ExperimentList} />
      </Switch>
    </BrowserRouter>
  );
}

const mountNode = document.getElementById('app');
ReactDOM.render(<AppRoot />, mountNode);
