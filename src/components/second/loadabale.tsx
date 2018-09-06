import Loadable from 'react-loadable';
import React from 'react';

const LoadableComponent = Loadable({
  loader: () => import('./index'),
  loading: () => <div>loading</div>,
})

export default class LoadableDashboard extends React.Component {
  render() {
    return <LoadableComponent />;
  }
}