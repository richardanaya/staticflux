var Rx = require('rx');

function Singleton(){

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
    constructor(value){
        this.subject = new Rx.ReplaySubject(1);
        this.setValue(value);
    }

    setValue(value){
        this.value = value;
        this.subject.onNext(value);
    }

    subscribe(handler){
        this.subject.subscribe(handler);
    }
}

module.exports.Action = Action;
module.exports.Store = Store;