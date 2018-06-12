enum Ordering {
    LT = -1,
    EQ,
    GT
}

interface Eq<T> {
    equalTo: (r: T) => boolean;
}

interface Ord<T> extends Eq<T> {
    compareTo?: (r: T) => Ordering;
    greaterThan: (r: T) => boolean;
    lowerThan?: (r: T) => boolean;
}

interface Show<T> {
    show: () => string;
}

function repeat(n: number, s: string) : string {
    let res = "";
    for (let i = 0; i < n; i++) {
        res += s;
    }
    return res;
}

type TreeType<T extends Show<T>> = NullTree | Tree<T>;

function showHelper<T extends Show<T>>(t: TreeType<T>, x: number) : string {
    if (typeof t === "NullTree") {
        return t.show();
    }
    else {
        return "\n" + repeat(x, "  ") + "(" + t.value.show()
            + showHelper(t.leftnode, x + 1) + showHelper(t.rightnode, x + 1) + ")";
    }
}

class NullTree implements Show<NullTree> {
    constructor () {
    }

    show () {
        return " *"
    }
}

class Tree<T extends Show<T>> implements Show<Tree<T>> {
    constructor ( public value: T
                , public leftnode: TreeType<T>
                , public rightnode: TreeType<T>
                ) {
    }

    show (): string {
        return showHelper(this, 0);
    }
}

class MyNumber implements Ord<MyNumber>, Show<MyNumber> {
    constructor ( public value: number ) {
    }

    equalTo (r: MyNumber) {
        return this.value === r.value;
    }

    greaterThan (r: MyNumber) {
        return this.value > r.value;
    }

    show () {
        return this.value.toString();
    }
}

function insert<T extends Show<T> & Ord<T>>(t: TreeType<T>, value: T): TreeType<T> {
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

function nullTree<T extends Show<T>>() : TreeType<T> {
    return new NullTree();
}

function singleton<T extends Show<T>>(value: T) {
    return new Tree<T>(value, nullTree(), nullTree());
}

function putStrLn(s: string): void {
    console.log(s + "\n");
}

function print<T extends Show<T>>(o: T) {
    putStrLn(o.show());
}

function main(args: string[]) {
    let t = insert(nullTree<MyNumber>(), new MyNumber(5));
    print(t);
}

main();
