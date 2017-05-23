/* eslint-env node */

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'ontohub-frontend',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  }

  if (environment === 'development') {
    ENV.host = 'http://localhost:3000'
    ENV['ember-cli-mirage'] = {
      enabled: false
    }
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.versionConfig = {
      tag: '0.0.0',
      commitsSinceTagMin: 65,
      commitsSinceTagMax: null,
      commit: null,
      full: null
    }
    ENV.recaptcha_site_key = '6LewQh8UAAAAAMok-W-6CiQN5buROVD3uRaaKJWU',
    ENV.recaptcha_disable = process.env.DISABLE_CAPTCHA == 'true'
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.host = 'http://localhost:3000'
    ENV.locationType = 'none'

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false
    ENV.APP.LOG_VIEW_LOOKUPS = false

    ENV.APP.rootElement = '#ember-testing'
    ENV.versionConfig = {
      tag: '0.0.0',
      commitsSinceTagMin: 65,
      commitsSinceTagMax: null,
      commit: null,
      full: null
    }
    ENV.recaptcha_disable = true
  }

  if (environment === 'production') {
    ENV.versionConfig = {
      tag: '0.0.0',
      commitsSinceTagMin: null,
      commitsSinceTagMax: null,
      commit: null,
      full: null
    },
    ENV.recaptcha_site_key = '6LdKSR8UAAAAANuiYuJcuJRQm4Go-dQh0he82vpU'
    ENV.recaptcha_disable = false
  }

  ENV['ember-simple-auth-token'] = {
    serverTokenEndpoint: `${ENV.host || ''}/users/sign_in`,
    identificationField: 'name',
    tokenPropertyName: 'data.attributes.token'
  }

  ENV['ember-simple-auth'] = {
    authorizer: 'authorizer:token'
  }

  return ENV
}
