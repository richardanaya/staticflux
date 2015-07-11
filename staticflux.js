var Rx = require('rx');

function Singleton(o) {
    o.__defineGetter__('instance', function() {
        if(!o._instance){
            o._instance = new o();
        }
        return o._instance;
    });
    
}

class Action {
    static create(){
        var subject = new Rx.Subject();
        var fn = function(value) {
            subject.onNext(value)
        }
        Object.setPrototypeOf(fn,subject);
        return fn;
    }
}

class Store {
    constructor(state){
        this.subject = new Rx.ReplaySubject(1);
        this.updateState(state);
    }

    updateState(state){
        this.state = state;
        this.subject.onNext(state);
    }

    subscribe(handler){
        this.subject.subscribe(handler);
    }
}

module.exports.Action = Action;
module.exports.Store = Store;
