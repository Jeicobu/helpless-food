import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { routes, onAuthChange} from '../imports/routes/routes';
import '../imports/startup/simple-schema-config';
import { Session } from 'meteor/session';

Tracker.autorun(() => {
  const isAuthentificated = !!Meteor.userId();
  onAuthChange(isAuthentificated);
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
