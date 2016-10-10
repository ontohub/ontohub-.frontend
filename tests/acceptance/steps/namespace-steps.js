/* eslint-disable no-undef */

import steps from './steps';
import { expect } from 'chai';

// step definitions that are shared between features should be moved to the
// tests/acceptance/steps/steps.js file

export default function() {
  return steps()
    .given('there is a namespace', (next) => {
      server.loadFixtures('namespaces');
      // the data needed are in the fixtures
      next();
    })

    .when('I visit a namespace page', (next) => {
      visit('/freddy-fazbear');
      andThen(() => next());
    })

    .then('I should see the namespace name', (next) => {
      const element = find('.top-route-header h1');
      expect(element.text()).to.equal('Freddy Fazbear');
      next();
    });
}
