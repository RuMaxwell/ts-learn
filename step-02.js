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
function showHelper(t, x) {
    if (typeof t === "NullTree") {
        return t.show();
    }
    else {
        return "\n" + repeat(x, "  ") + "(" + t.value.show()
            + showHelper(t.leftnode, x + 1) + showHelper(t.rightnode, x + 1) + ")";
    }
}
var NullTree = /** @class */ (function () {
    function NullTree() {
    }
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
    return MyNumber;
}());
function insert(t, value) {
    if (typeof t === "NullTree") {
        return singleton(value);
    }
    else {
        if (value.equalTo(t.value)) {
            return t;
        }
        else if (value.greaterThan(t.value)) {
            return insert(t.rightnode, value);
        }
        else {
            return insert(t.leftnode, value);
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
