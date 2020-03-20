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

/* Single insert. Result: */
/*
I20200319-13:00:21.718(1)? on insert: { title: '1', author: '1', _id: '6TKdooPw7wdQsCgHD' }
*/

// ---------------------------------------------------------------------------------------------

// var book1 = Books.findOne();

/* On empty collection. Result: */
/*
I20200319-12:59:08.395(1)? on findOne
*/

/* After insert by 'Books.insert({title: '1', author: '1'});', result: */
/*
I20200319-13:01:36.310(1)? on findOne         
I20200319-13:01:36.315(1)? on create { _id: '6TKdooPw7wdQsCgHD', title: '1', author: '1' }
*/

// ---------------------------------------------------------------------------------------------

// Books.create({title: '0000', author: '0'}, true);

/* Create single document. Result: */

/*
I20200319-13:02:38.731(1)? on create { title: '0000', author: '0' }
I20200319-13:02:38.733(1)? on insert: { title: '0000', author: '0', _id: 'WZ7rSgF3436eSD92n' }
*/

// ---------------------------------------------------------------------------------------------

// Books.insert({title: 'Just a title'});
// Books.update({title: 'Just a title'}, {$set: {title: 'Updated title'}});

/* Insert, then update. Result: */
/*
I20200319-13:18:48.289(1)? on insert: { title: 'Just a title', _id: 'XLZNW8iyZZep6pssm' }
I20200319-13:18:48.324(1)? on update { title: 'Just a title' }
*/

// ---------------------------------------------------------------------------------------------

// Books.upsert({title: 'Upserted when collection is empty'}, {$set: {title: 'It should be upserted now'}});

/* Call upsert on empty collection. Result: */
/*
I20200319-13:49:23.103(1)? on update { title: 'Upserted when collection is empty' }
*/

// ---------------------------------------------------------------------------------------------

// Books.insert({title: 'Some title'});
// Books.upsert({title: 'Not in collection yet'}, {$set: {title: 'In collection now'}});

/* Insert something, then upsert nonexistent document. Result: */
/*
I20200319-13:53:38.819(1)? on insert: { title: 'Some title', _id: '4SWbw2Cm3Df2bsWT9' }
I20200319-13:53:38.827(1)? on update { title: 'Not in collection yet' }
*/

// ---------------------------------------------------------------------------------------------

// Books.insert({title: 'To update by upsert'});
// Books.upsert({title: 'To update by upsert'}, {$set: {title: 'New title, by upsert'}});

/* Insert something, then update it via upsert. Result: */
/*
I20200319-14:09:00.203(1)? on insert: { title: 'To update by upsert', _id: 'LKubN9mZguhEjaCKD' }
I20200319-14:09:00.212(1)? on update { title: 'To update by upsert' }
*/

// ---------------------------------------------------------------------------------------------
