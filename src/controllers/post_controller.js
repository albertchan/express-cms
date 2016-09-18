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
