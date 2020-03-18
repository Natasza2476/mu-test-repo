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


  