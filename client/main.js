import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import { Books } from '../imports/books.js';

Template.body.helpers({
  books() {
    return {}; //Books.find({});
  },
});
