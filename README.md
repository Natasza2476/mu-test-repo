# Test repo for Meteor Universe Collection

### 1. Exception in Mongo write: TypeError: callback is not a function

Example in client/main.js

Code:
```
Books.create({title: '0000', author: '0'}, true);
```

Result in console:
```
I20200318-14:21:56.804(1)? on insert: { title: '0000', author: '0', _id: 'TpuRCEqpma68RvNRa' }
I20200318-14:21:56.985(1)? Exception in Mongo write: TypeError: callback is not a function
I20200318-14:21:56.986(1)?     at packages/mongo/mongo_driver.js:338:7
I20200318-14:21:56.987(1)?     at runWithEnvironment (packages/meteor.js:1286:24)
```

### 2. 