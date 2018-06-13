var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var List = /** @class */ (function () {
    function List() {
    }
    List.prototype.isNull = function () {
        return true;
    };
    List.prototype.car = function () {
        throw new Error("car of null list");
    };
    List.prototype.cdr = function () {
        throw new Error("cdr of null list");
    };
    List.prototype.cons = function (x) {
        return new Cons(x, this);
    };
    List.prototype.equalTo = function (r) {
        if (this.isNull() && r.isNull()) {
            return true;
        }
        else if (!this.isNull() && !r.isNull()) {
            return this.car().equalTo(r.car()) ? this.cdr().equalTo(r.cdr()) : false;
        }
        else {
            return false;
        }
    };
    List.prototype.showHelper = function () {
        if (this.cdr().isNull()) {
            return this.car().show();
        }
        else {
            return this.car().show() + "," + this.cdr().showHelper();
        }
    };
    List.prototype.show = function () {
        return "[" + this.showHelper() + "]";
    };
    return List;
}());
var Cons = /** @class */ (function (_super) {
    __extends(Cons, _super);
    function Cons(head, tail) {
        var _this = _super.call(this) || this;
        _this.head = head;
        _this.tail = tail;
        return _this;
    }
    Cons.prototype.car = function () {
        return this.head;
    };
    Cons.prototype.cdr = function () {
        return this.tail;
    };
    Cons.prototype.isNull = function () {
        return false;
    };
    return Cons;
}(List));
var Int = /** @class */ (function () {
    function Int(value) {
        this.value = value;
    }
    Int.prototype.equalTo = function (r) {
        return this.value === r.value;
    };
    Int.prototype.greaterThan = function (r) {
        return this.value > r.value;
    };
    Int.prototype.show = function () {
        return this.value.toString();
    };
    return Int;
}());
function putStrLn(str) {
    console.log(str + "\n");
}
function print_(o) {
    putStrLn(o.show());
}
function main(args) {
    var l = (new List()).cons(new Int(3)).cons(new Int(2)).cons(new Int(1));
    print_(l);
}
main();
