import yadda from '../../helpers/yadda';

export default function() {
  return yadda.localisation.English.library()
    .given('I am not logged in', (next) => {
      // TODO: Fill step when authentication is in place
      andThen(() => next());
    })
    .given('I type "Ember g feature make-feature"', (next) => {
      visit('/');
      // Add your own assert library
      andThen(() => next());
    })
    .when('I look in the folder', (next) => {
      // Add your own assert library
      next();
    });
}
