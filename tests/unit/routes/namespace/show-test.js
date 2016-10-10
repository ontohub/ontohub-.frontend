/* jshint expr:true */
import { expect } from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';

describeModule(
  'route:namespace/show',
  'NamespaceShowRoute',
  {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  },
  // eslint-disable-next-line prefer-arrow-callback
  function() {
    it('exists', function() {
      let route = this.subject();
      expect(route).to.be.ok;
    });
  }
);
