"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var apollo_link_1 = require("apollo-link");
var QueueLink = /** @class */ (function (_super) {
    __extends(QueueLink, _super);
    function QueueLink() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.operationQueue = [];
        return _this;
    }
    QueueLink.prototype.request = function (operation, forward) {
        var _this = this;
        if (operation.getContext().queueResponse) {
            return new apollo_link_1.Observable(function (observer) {
                var operationEntry = { operation: operation, forward: forward, observer: observer };
                _this.enqueue(operationEntry);
                return function () { return _this.cancelOperation(operationEntry); };
            });
        }
        return forward(operation);
    };
    QueueLink.prototype.cancelOperation = function (entry) {
        this.operationQueue = this.operationQueue.filter(function (e) { return e !== entry; });
    };
    QueueLink.prototype.enqueue = function (entry) {
        this.operationQueue.push(entry);
    };
    return QueueLink;
}(apollo_link_1.ApolloLink));
exports["default"] = QueueLink;
