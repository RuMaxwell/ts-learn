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
	'a' === 'a';
    for (let i = 0; i < n; i++) {
        res += s;
    }
    return res;
}

function showHelper<T extends Show<T>>(t: TreeType<T>, x: number) : string {
    if (t.isNull()) {
        return t.show();
    }
    else {
        return "\n" + repeat(x, "  ") + "(" + t.val().show()
            + showHelper(t.left(), x + 1) + showHelper(t.right(), x + 1) + ")";
    }
}

interface TreeType<T> {
	isNull: () => boolean;
	val: () => T?;
	left: () => TreeType<T>?;
	right: () => TreeType<T>?;
}

class NullTree<T> implements Show<NullTree>, TreeType<T> {
	constructor () {
    }

	isNull () {
		return true;
	}

	val () {}
	left () {}
	right () {}

    show () {
        return " *"
    }
}

class Tree<T extends Show<T>> implements Show<Tree<T>>, TreeType<T> {
    constructor ( public value: T
                , public leftnode: TreeType<T>
                , public rightnode: TreeType<T>
                ) {
	}

	isNull () {
		return false;
	}

	val () {
		return this.value;
	}

	left () {
		return this.leftnode;
	}

	right () {
		return this.rightnode;
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

	fromList (ns: number[]) {
		if (ns.length === 0) {
			return nullTree();
		}
		else {
			return [new MyNumber(ns[0]), ...this.fromList(ns.slice(1))];
		}
	}
}

function insert<T extends Show<T> & Ord<T>>(t: TreeType<T>, value: T): TreeType<T> {
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

function nullTree<T extends Show<T>>(): TreeType<T> {
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
