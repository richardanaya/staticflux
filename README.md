# StaticFlux

staticflux.js is a very minimalistic unidirectional data flow framework. More specifically it is a wrapper around Rx to provide 
for the metaphors of Store/Action pattern of flux. 

**Why another flux library?**

Because Rx is powerful and fulfills the essense of unidirectional data flow of flux (and much more), but isn't very explicit for it as a library on its own. I also saw no good libraries out there that really were as minimalistic as it needed to be.

**What is an Action?**

An Store is state that is streamed to listeners within an application. (Examples: a list of records on the screen, a map of friends and their status, etc.)

**What is an Action?**

An Action is an observable subject that processes a stream of values. These values are provided from various points in the application and listened to by Stores to update their state appropriately. (Example: text messages a user is submitting from a text box)

**Installing**

```
npm install staticflux --save-dev
```

**Example**

Let's say we need to model a unidirectional dataflow of chat messages being typed in by a user from a view. We need an action to be able to notify all Stores involved that a new message is being added from the view:

```javascript
//chatactions.js
let {Action,Store,Singleton} = require("staticflux");

exports.sendMessage = Action.create();
```

We need a store to hold the state:

```javascript
//messagestore.js
let ChatActions = require('./chatactions');
let {Action,Store,Singleton} = require("staticflux");

@Singleton
class MessageStore extends Store {
    constructor() {
        //Our starting state of our store is an empty array
        super([]);
        
        //Let's listen for actions from sendMessage action
        ChatActions.sendMessage.subscribe(this.handleMessage.bind(this))
    }

    handleMessage(message) {
        //Add a new message to the current value
        var newMessages = this.value.push(message);
        
        //Set it as the observers new value and notify all listeners
        this.setValue(newMessages);
    }
};

module.exports = MessageStore;
```

