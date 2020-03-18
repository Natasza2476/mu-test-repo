# Test repo for Meteor Universe Collection

### 1. Exception in Mongo write: TypeError: callback is not a function


### 2. Infinity loop

Example: client/main.js
Code:
```
Books.insert({title: '0000', author: '0'});
var book1 = Books.findOne();
```
Result in console:
```
I20200318-14:02:56.102(1)? on insert: { title: '0000', author: '0', _id: 'wrcPviKrp55yDRe87' }
I20200318-14:02:56.232(1)? on insert: { title: '0000', author: '0', _id: 'y6cyfSzCHehBeR5wA' }
I20200318-14:02:56.272(1)? on insert: { title: '0000', author: '0', _id: 'KHAX7cxEJyt64dzRe' }
I20200318-14:02:56.312(1)? on insert: { title: '0000', author: '0', _id: 'zuuvasdRXr24xHoap' }
I20200318-14:02:56.342(1)? on insert: { title: '0000', author: '0', _id: 'hE3W4RZd82LJ6th3K' }
I20200318-14:02:56.363(1)? on insert: { title: '0000', author: '0', _id: 'Sua22hgXTxCQCJNeg' }
I20200318-14:02:56.383(1)? on insert: { title: '0000', author: '0', _id: 'QdQwdHcttZXDBf2qn' }
I20200318-14:02:56.400(1)? on insert: { title: '0000', author: '0', _id: 'bKgDCPNsqF9S3S9zo' }
I20200318-14:02:56.415(1)? on insert: { title: '0000', author: '0', _id: 'y4QieQK3b2ec8WkK7' }
I20200318-14:02:56.433(1)? on insert: { title: '0000', author: '0', _id: 'yzu5q3efcL8YezQwZ' }
I20200318-14:02:56.451(1)? on insert: { title: '0000', author: '0', _id: 'LJGr2TirRzFpK3vS4' }
I20200318-14:02:56.463(1)? on insert: { title: '0000', author: '0', _id: 'QJzHHuGLkbAieudCz' }
I20200318-14:02:56.484(1)? on insert: { title: '0000', author: '0', _id: 'E3tsQpATeYhhiHCch' }
```
