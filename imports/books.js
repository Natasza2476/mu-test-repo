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

// Books.insert({title: 'Just a title'});
// Books.update({title: 'Just a title'}, {$set: {title: 'Updated title'}})

/* Causes insert, update, then insert again. */
/*
I20200319-13:18:48.289(1)? on insert: { title: 'Just a title', _id: 'XLZNW8iyZZep6pssm' }
I20200319-13:18:48.324(1)? on update { title: 'Just a title' }
=> Meteor server restarted
I20200319-13:18:52.342(1)? on insert: { title: 'Just a title', _id: 'oebCfLYhDJAxika2R' }
*/

/* Documents in collection Books are now:
{
  "_id" : "XLZNW8iyZZep6pssm",
  "title" : "Updated title"
}
{
  "_id" : "oebCfLYhDJAxika2R",
  "title" : "Just a title"
}
*/

// ---------------------------------------------------------------------------------------------

// Books.upsert({title: 'Upserted when collection is empty'}, {$set: {title: 'Upserted when collection is empty'}});

/* Called on empty collection, everything is OK */
/*
I20200319-13:49:23.103(1)? on update { title: 'Upserted when collection is empty' }
=> Meteor server restarted
*/

// ---------------------------------------------------------------------------------------------

// Books.insert({title: 'Some title'});
// Books.upsert({title: 'Not in collection yet'}, {$set: {title: 'In collection now'}});

/* Insert something, upsert nonexistent document. Insertion was made twice (not OK), upsert causes one update (OK) */
/*
I20200319-13:53:38.819(1)? on insert: { title: 'Some title', _id: '4SWbw2Cm3Df2bsWT9' }
I20200319-13:53:38.827(1)? on update { title: 'Not in collection yet' }
=> Meteor server restarted
I20200319-13:53:42.353(1)? on insert: { title: 'Some title', _id: 'Y4fEsLJuGhnH5659h' }
*/

// ---------------------------------------------------------------------------------------------

