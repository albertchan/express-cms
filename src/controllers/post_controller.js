import Vue from 'vue';
import { createRenderer } from 'vue-server-renderer';
import { Post } from '../models/post';
import { postsList } from '../components/browse_posts';

export function index(req, res) {
  Post.findPage().then(result => {
    const renderer = createRenderer();
    const vm = postsList;
    vm.items = result.posts.length > 0 ? result.posts : [];

    renderer.renderToString(vm, (err, html) => {
      res.render('post/index', {
        title: 'Posts',
        postsList: html
      });
    });
  });
}

export function add(req, res) {
  res.render('post/new', {
    title: 'Create a new post',
    changeset: {}
  });
}

export function create(req, res) {
  if (!req.session.user) return res.status(401);
  if (!req.body) return res.status(400);

  const changeset = req.body;
  changeset.user_id = req.session.user.id;

  Post.add(changeset).then(result => {
    res.render('post/edit', {
      action: '/posts/edit',
      title: 'Edit post',
      changeset: result.toJSON()
    });
  }).catch(err => {
    console.log(err);

    const errors = [
      {
        code: 400,
        message: err.message
      }
    ];

    res.render('post/new', {
      title: 'Oops, there are errors with your inputs!',
      changeset: changeset,
      errors: errors
    });
  });
}

export function read(req, res) {
  let data;
  const id = req.params.id;

  if (isNaN(id)) {
    data = {slug: id};
  } else {
    data = {id: validator.toInt(id)};
  }

  Post.findOne(data).then(post => {
    const postData = post.toJSON();

    res.render('post/show', {
      title: '',
      item: postData
    });
  }).catch(err => {
    console.error(err);
    res.status(404).render('error');
  });
}

export function update(req, res) {
  res.render('post/edit', {
    title: 'Edit post'
  });
}
