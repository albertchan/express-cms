export function index(req, res) {
  res.render('user/index', {
    title: 'Users'
  });
}

export function create(req, res) {
  res.render('user/new', {
    title: 'Users'
  });
}

export function show(req, res) {
  res.render('user/show', {
    title: 'Users'
  });
}

export function update(req, res) {
  res.render('user/edit', {
    title: 'Users'
  });
}
