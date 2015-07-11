'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Rx = require('rx');

function Singleton(o) {
    o.__defineGetter__('instance', function () {
        if (!o._instance) {
            o._instance = new o();
        }
        return o._instance;
    });
}

var Action = (function () {
    function Action() {
        _classCallCheck(this, Action);
    }

    _createClass(Action, null, [{
        key: 'create',
        value: function create() {
            var subject = new Rx.Subject();
            var fn = function fn(value) {
                subject.onNext(value);
            };
            Object.setPrototypeOf(fn, subject);
            return fn;
        }
    }]);

    return Action;
})();

var Store = (function () {
    function Store(state) {
        _classCallCheck(this, Store);

        this.subject = new Rx.ReplaySubject(1);
        this.updateState(state);
    }

    _createClass(Store, [{
        key: 'updateState',
        value: function updateState(state) {
            this.state = state;
            this.subject.onNext(state);
        }
    }, {
        key: 'subscribe',
        value: function subscribe(handler) {
            this.subject.subscribe(handler);
        }
    }]);

    return Store;
})();

module.exports.Action = Action;
module.exports.Store = Store;
