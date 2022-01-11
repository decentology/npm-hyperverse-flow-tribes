import React from 'react';

import { useFlow } from '@decentology/hyperverse-flow';

import { useEnvironment } from './environment.js';

import * as actions from './actions';
import * as bundle from './bundle';

const Context = React.createContext({});

function Provider(props) {
  const environment = useEnvironment();
  const flow = useFlow();

  const boundActions = {};
  for (const actionName in actions) {
    boundActions[actionName] = actions[actionName].bind(
      null,
      {
        environment,
        flow,
        account: flow.state.user.addr
      }
    );
  }

  const boundBundle = {};
  for (const actionName in bundle) {
    boundBundle[actionName] = bundle[actionName].bind(
      null,
      {
        environment,
        flow,
        account: flow.state.user.addr
      }
    );
  }

  return (
    <Context.Provider
      value={{
        bundle: {
          ...boundBundle
        },
        ...boundActions
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export {
  Context,
  Provider
};