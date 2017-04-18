export default function() {

  this.passthrough('/write-coverage');

  this.urlPrefix = 'http://localhost:3000';

  // this.namespace = '';
  // this.timing = 400;

  this.get('/organizational_units/:id', (schema, request) => {
    let user = schema.users.find(request.params.id),
        organization = schema.organizations.find(request.params.id);

    return (organization || user);
  });

  this.get('/version', () =>
    ({
      data: {
        attributes: {
          commit: '21e9779',
          commits_since_tag: 65,
          full: '0.0.0-65-g21e9779',
          tag: '0.0.0'
        },
        id: 'version',
        type: 'versions'
      }
    })
  )

  this.post('/users');
  this.post('/users/sign_in', (schema, request) => {
    return {
      "data": {
        "attributes": {
          "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJ1c2VyX2lkIjoiYWRhIiwiZXhwIjoxNDkyNjAwOTkxfQ.fepsfgUuzVhCYRoqD25AjnoD1Hj96WvF1B35-w2jEt7iONi-k7mk-YXhSaXOUiVMQGLT4Xl22Dlekf-STxLz3A"
        },
        "id": "authenticationtoken",
        "type": "authentication_tokens"
      },
      "jsonapi": {
        "version": "1.0"
      }
    };
  });
  this.get('/users/:id');
  this.del('/users/:id');
  this.put('/users/:id');

  this.post('/organizations');
  this.get('/organizations/:id');
  this.del('/organizations/:id');
  this.put('/organizations/:id');

  this.post('/repositories', (schema, request) => function() {
    console.log(request);
    let attrs = this.normalizedRequestAttrs(),
    //     slug = attrs.name.split(' ').join('-');
    // attrs['id'] = slug;

    return schema.repositories.create(attrs);
    // return new Mirage.Response(500, {}, {});
    // return { "hello": "test" };
  });
  this.get('/repositories/:orgUnit/:id', (schema, request) => {
    let repoId = [request.params.orgUnit, request.params.id].join('/'),
        repository = schema.repositories.find(repoId);

    return repository;
  });
  this.del('/repositories/:orgUnit/:id', (schema, request) => {
    let repoId = [request.params.orgUnit, request.params.id].join('/');
    schema.repositories.find(repoId).destroy();
  });
  this.put('/repositories/:orgUnit/id');

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.2.x/shorthands/
  */
}
