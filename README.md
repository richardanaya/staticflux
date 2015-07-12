# StaticFlux

staticflux.js is a microlibrary for creating unidirectional data flow architecture. 

More specifically it is a wrapper around Rx to provide for the metaphors of Store/Action pattern of flux.

**What is unidirectional data architecture and why should I care?**

Unidirectional data architure is a pattern for creating web applications that is simpler and can be more performant with some view technologies (particularly React). This has commonly been called in recent times as flux, if you are new to flux, check out: http://fluxxor.com/what-is-flux.html

**What is Rx and why should I care?**
Rx is a powerful paradigm for performing operations on data streams that are extremely common. It is an attempt to identify extremely common operations that are done all the time and provide a library that can accomplish them easily. (Example: how do you filter down a giant nested dictionary structure into just the data you care about, how do you program autocomplete and all its various states and considerations in a concise manner)

You might imagine Rx as the Observer patter on steroids, but it's augmentations can allow for extremely powerful and concise expressions. If you are new to Rx, check out https://github.com/Reactive-Extensions/RxJS 

**Why another flux library?**

Because I love both flux and Rx. Rx is powerful and fulfills the essense of unidirectional data flow of flux (and much more), but isn't very explicit for it as a library on its own. I also saw no good libraries out there that really were as minimalistic as it needed to be.

# The Basics

**What is an Observable?**

An observable is an object that can handle the publication and notification of messages to listeners. The implementation of the Observer pattern.

**What is a Store?**

A Store is an observable that holds a singular state that has its updates streamed to listeners within an application. (Examples: a list of records on the screen, a map of friends and their status, etc.)

**What is an Action?**

An Action is an observable that streams commands as values to stores or other interested parties that listen. (Examples: deleting a record, removing a friend from your friends list)

**What makes this all different from just an Observer, Pub/Sub, Notification pattern?**

A very good question. The subtlety of a store is that it has a singular state. When you subscribe to a store of the first thing you will receive through the handler is the current state. Whenever a change occurs in which the state must change (via an action or otherwise), the store will notify its listeners of its new state. This state will then trickle down through the application heirarchy. Actions at any point in the view heirarchy will always be sent to the stores.

# Getting Started

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
    //Render messages to dom
    
    //Important Note: When we subscribe we will receive 
    //the current state ["This my initial state"]
})
...
//Trigger an action of a new message created
ChatAction.sendMessage(newMessage);
...

```



