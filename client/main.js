import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import { Books } from '../imports/books.js';

Template.body.helpers({
  books() {

    // Code below causes 'Exception in Mongo write: TypeError: callback is not a function [...]'

    // Books.create({title: '0000', author: '0'}, true);


    // Code below causes infinity loop

    /* Books.insert({title: '0000', author: '0'});
    var book1 = Books.findOne(); */

    return Books.find({});
  },
});
