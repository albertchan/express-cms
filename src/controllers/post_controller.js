import Vue from 'vue';
import { createRenderer } from 'vue-server-renderer';
import { Post } from '../models/post';

export function index(req, res) {
  res.render('post/index', {
    title: 'Posts'
  });
}

export function add(req, res) {
  res.render('post/new', {
    title: 'Create a new post'
  });
}

export function create(req, res) {
  if (!req.session.user) return res.status(401);
  if (!req.body) return res.status(400);

  const changeset = req.body;
  changeset.user_id = req.session.user.id;

  Post.add(changeset).then(result => {
    console.log('post create', result);
  });
}

export function read(req, res) {
  res.render('post/show', {
    title: ''
  });
}

export function update(req, res) {
  res.render('post/edit', {
    title: 'Edit post'
  });
}
