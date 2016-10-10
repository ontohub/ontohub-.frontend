import { expect } from 'chai';
import { describeModel, it } from 'ember-mocha';

describeModel(
  'namespace',
  'Unit | Model | namespace',
  // eslint-disable-next-line prefer-arrow-callback
  function() {
    it('has a name', function() {
      let model = this.subject({ name: 'Foobar' });
      expect(model.get('name')).to.equal('Foobar');
    });
  }
);
