var Ordering;
(function (Ordering) {
    Ordering[Ordering["LT"] = -1] = "LT";
    Ordering[Ordering["EQ"] = 0] = "EQ";
    Ordering[Ordering["GT"] = 1] = "GT";
})(Ordering || (Ordering = {}));
function repeat(n, s) {
    var res = "";
    'a' === 'a';
    for (var i = 0; i < n; i++) {
        res += s;
    }
    return res;
}
function showHelper(t, x) {
    if (t.isNull()) {
        return t.show();
    }
    else {
        return "\n" + repeat(x, "  ") + "(" + t.val().show()
            + showHelper(t.left(), x + 1) + showHelper(t.right(), x + 1) + ")";
    }
}
var NullTree = /** @class */ (function () {
    function NullTree() {
    }
    NullTree.prototype.isNull = function () {
        return true;
    };
    NullTree.prototype.val = function () { };
    NullTree.prototype.left = function () { };
    NullTree.prototype.right = function () { };
    NullTree.prototype.show = function () {
        return " *";
    };
    return NullTree;
}());
var Tree = /** @class */ (function () {
    function Tree(value, leftnode, rightnode) {
        this.value = value;
        this.leftnode = leftnode;
        this.rightnode = rightnode;
    }
    Tree.prototype.isNull = function () {
        return false;
    };
    Tree.prototype.val = function () {
        return this.value;
    };
    Tree.prototype.left = function () {
        return this.leftnode;
    };
    Tree.prototype.right = function () {
        return this.rightnode;
    };
    Tree.prototype.show = function () {
        return showHelper(this, 0);
    };
    return Tree;
}());
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
            return nullTree();
        }
        else {
            return [new MyNumber(ns[0])].concat(this.fromList(ns.slice(1)));
        }
    };
    return MyNumber;
}());
function insert(t, value) {
    if (t.isNull()) {
        return singleton(value);
    }
    else {
        if (value.equalTo(t.val())) {
            return t;
        }
        else if (value.greaterThan(t.val())) {
            return insert(t.right(), value);
        }
        else {
            return insert(t.left(), value);
        }
    }
}
function nullTree() {
    return new NullTree();
}
function singleton(value) {
    return new Tree(value, nullTree(), nullTree());
}
function putStrLn(s) {
    console.log(s + "\n");
}
function print(o) {
    putStrLn(o.show());
}
function main(args) {
    var t = insert(nullTree(), new MyNumber(5));
    print(t);
}
main();
