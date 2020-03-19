import { UniCollection } from 'meteor/universe:collection';

export const Books = new UniCollection('Books');

// sync hooks:

Books.onBeforeCall('find', 'myFind', function(){
  console.log('on find');
});

Books.onBeforeCall('findOne', 'myFindOne', function(){
  console.log('on findOne');
});

Books.onBeforeCall('setSchema', 'mySetSchema', function(){
  console.log('on setSchema');
});

Books.onBeforeCall('create', 'myCreate', function(doc){
  console.log('on create', doc);
});

// async support:

Books.onBeforeCall('insert', 'myInsert', function(doc){
  console.log('on insert:', doc);
});

Books.onBeforeCall('upsert', 'myUpsert', function(doc){
  console.log('on upsert', doc);
});

Books.onBeforeCall('update', 'myUpdate', function(doc){
  console.log('on update', doc);
});

Books.onBeforeCall('remove', 'myRemove', function(doc){
  console.log('on remove', doc);
});

// tests

// ---------------------------------------------------------------------------------------------

// Books.insert({title: '1', author: '1'});

/* One insert causes insertion of two similar documents, only with different id. */
/*
=> Meteor server restarted
I20200319-13:00:21.718(1)? on insert: { title: '1', author: '1', _id: '6TKdooPw7wdQsCgHD' }
=> Meteor server restarted
I20200319-13:00:25.324(1)? on insert: { title: '1', author: '1', _id: '39Xg4oQbjnjGXRYug' }
*/

// ---------------------------------------------------------------------------------------------


// var book1 = Books.findOne();

/* On empty collection */
/*
I20200319-12:59:08.395(1)? on findOne         
=> Meteor server restarted
*/

/* After insert by 'Books.insert({title: '1', author: '1'});' */
/*
I20200319-13:01:36.310(1)? on findOne         
I20200319-13:01:36.315(1)? on create { _id: '6TKdooPw7wdQsCgHD', title: '1', author: '1' }
=> Meteor server restarted
*/

// ---------------------------------------------------------------------------------------------

// Books.create({title: '0000', author: '0'}, true);

// Collection.create causes 'Exception in Mongo write: TypeError: callback is not a function [...]'

/*
I20200319-13:02:38.731(1)? on create { title: '0000', author: '0' }
I20200319-13:02:38.733(1)? on insert: { title: '0000', author: '0', _id: 'WZ7rSgF3436eSD92n' }
=> Meteor server restarted
I20200319-13:02:42.352(1)? on insert: { title: '0000', author: '0', _id: 'aBQM6REZqFPhaFwwp' }
I20200319-13:02:42.461(1)? Exception in Mongo write: TypeError: callback is not a function
I20200319-13:02:42.461(1)?     at packages/mongo/mongo_driver.js:338:7
I20200319-13:02:42.461(1)?     at runWithEnvironment (packages/meteor.js:1286:24)
*/

// ---------------------------------------------------------------------------------------------

