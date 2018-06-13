var Ordering;
(function (Ordering) {
    Ordering[Ordering["LT"] = -1] = "LT";
    Ordering[Ordering["EQ"] = 0] = "EQ";
    Ordering[Ordering["GT"] = 1] = "GT";
})(Ordering || (Ordering = {}));
function repeat(n, s) {
    var res = "";
    for (var i = 0; i < n; i++) {
        res += s;
    }
    return res;
}
var Tree = /** @class */ (function () {
    function Tree(creator // A constructor of T, used to initialize this.value when no value is passed in
    , value // The node value
    , leftnode // Left subtree
    , rightnode // Right subtree
    ) {
        var args = []; // The constructor parameters of T
        for (var _i = 4 // The constructor parameters of T
        ; _i < arguments.length // The constructor parameters of T
        ; _i++ // The constructor parameters of T
        ) {
            args[_i - 4] = arguments[_i]; // The constructor parameters of T
        }
        this.isNull = true;
        if (value !== undefined) {
            this.isNull = false;
            this.value = value;
        }
        else {
            this.value = new creator(args);
        }
        if (leftnode !== undefined) {
            this.leftChild = leftnode;
        }
        else {
            this.leftChild = nullTree(creator);
        }
        if (rightnode !== undefined) {
            this.rightChild = rightnode;
        }
        else {
            this.rightChild = nullTree(creator);
        }
    }
    Tree.prototype.show = function () {
        return showHelper(this, 0);
    };
    return Tree;
}());
function showHelper(t, x) {
    if (t.isNull) {
        return t.show();
    }
    else {
        return "\n" + repeat(x, "  ") + "(" + t.value.show()
            + showHelper(t.leftChild, x + 1) + showHelper(t.rightChild, x + 1) + ")";
    }
}
var MyNumber = /** @class */ (function () {
    function MyNumber(value) {
        this.value = value;
    }
    MyNumber.prototype.equalTo = function (r) {
        return this.value === r.value;
    };
    MyNumber.prototype.greaterThan = function (r) {
        return this.value > r.value;
    };
    MyNumber.prototype.show = function () {
        return this.value.toString();
    };
    MyNumber.prototype.fromList = function (ns) {
        if (ns.length === 0) {
            return [];
        }
        else {
            return [new MyNumber(ns[0])].concat(this.fromList(ns.slice(1)));
        }
    };
    return MyNumber;
}());
function insert(creator, t, value) {
    if (t.isNull) {
        return singleton(creator, value);
    }
    else {
        if (value.equalTo(t.value)) {
            return t;
        }
        else if (value.greaterThan(t.value)) {
            return insert(creator, t.rightChild, value);
        }
        else {
            return insert(creator, t.leftChild, value);
        }
    }
}
function nullTree(creator) {
    return new Tree(creator);
}
function singleton(creator, value) {
    return new Tree(creator, value, nullTree(creator), nullTree(creator));
}
function putStrLn(s) {
    console.log(s + "\n");
}
function print_(o) {
    putStrLn(o.show());
}
function main(args) {
    var t = nullTree(MyNumber);
    print_(t);
}
main();
