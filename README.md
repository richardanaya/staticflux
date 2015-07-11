# StaticFlux

staticflux.js is a very minimalistic unidirectional data flow framework. More specifically it is a wrapper around Rx to provide 
for the metaphors of Store/Action pattern of flux. If you are new to flux, check out: http://fluxxor.com/what-is-flux.html

**Why another flux library?**

Because Rx is powerful and fulfills the essense of unidirectional data flow of flux (and much more), but isn't very explicit for it as a library on its own. I also saw no good libraries out there that really were as minimalistic as it needed to be.

**What is an Store?**

An Store is state that is streamed to listeners within an application. (Examples: a list of records on the screen, a map of friends and their status, etc.)

**What is an Action?**

An Action is an observable subject that processes a stream of values. These values are provided from various points in the application and listened to by Stores to update their state appropriately. (Example: text messages a user is submitting from a text box)

**What makes this all different from just an Observer, Pub/Sub, Notification pattern?**

A very good question. The subtlety of a store is that it has a singular state. When you subscribe to a store of the first thing you will receive through the handler is the current state. Whenever a change occurs in which the state must change (via an action or otherwise), the store will notify its observers of its new state.

**Installing**

```
npm install staticflux --save-dev
```

**Example**

Let's say we need to model a unidirectional dataflow of chat messages being typed in by a user from a view. We need an action to be able to notify all Stores involved that a new message is being added from the view:

```javascript
//chatactions.js

let {Action} = require("staticflux");
exports.sendMessage = Action.create();
```

We need a store to hold the state:

```javascript
//messagestore.js

let ChatActions = require('./chatactions');
let {Store,Singleton} = require("staticflux");

@Singleton
class MessageStore extends Store {
    constructor() {
        super(["This is my initial state"]);
        ChatActions.sendMessage.subscribe(::this.handleMessage)
    }

    handleMessage(message) {
        var newState = this.state;
        newState.push(message);
        this.updateState(newState);
    }
};

module.exports = MessageStore;
```

In the View of our code somewhere we simply use it

```javascript
let ChatActions = require('./chatactions');
let MessageStore = require('./messagestore');

...
MessageStore.instance.subscribe( (message) => {
    //re-render messages to dom
    //Important Note: When we subscribe we will receive the current state ["This my initial state"]
})
...
//Trigger an action of a new message created
ChatAction.sendMessage(newMessage);
...

```



