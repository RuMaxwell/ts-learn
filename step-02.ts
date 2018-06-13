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


interface TreeType<T extends Show<T>> extends Show<TreeType<T>> {
	isNull: boolean;
	value: T;
	leftChild: TreeType<T>;
	rightChild: TreeType<T>;
}


class Tree<T extends Show<T>> implements TreeType<T> {
    public isNull: boolean = true;
    public value: T;
    public leftChild: TreeType<T>;
    public rightChild: TreeType<T>;

    constructor ( creator: { new (...args: any[]): T }      // A constructor of T, used to initialize this.value when no value is passed in
                , value?: T                                 // The node value
                , leftnode?: TreeType<T>                    // Left subtree
                , rightnode?: TreeType<T>                   // Right subtree
                , ...args: any[]                            // The constructor parameters of T
                ) {
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

    show (): string {
        return showHelper(this, 0);
    }
}

function showHelper<T extends Show<T>>(t: TreeType<T>, x: number) : string {
    if (t.isNull) {
        return t.show();
    }
    else {
        return "\n" + repeat(x, "  ") + "(" + t.value.show()
            + showHelper(t.leftChild, x + 1) + showHelper(t.rightChild, x + 1) + ")";
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

	fromList (ns: number[]): MyNumber[] {
		if (ns.length === 0) {
			return [];
		}
		else {
			return [new MyNumber(ns[0]), ...this.fromList(ns.slice(1))];
		}
	}
}


function insert<T extends Show<T> & Ord<T>>(creator: { new (...args: any[]): T }, t: TreeType<T>, value: T): TreeType<T> {
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

function nullTree<T extends Show<T>>(creator: { new (...args: any[]): T }): TreeType<T> {
    return new Tree<T>(creator);
}

function singleton<T extends Show<T>>(creator: { new (...args: any[]): T }, value: T) {
    return new Tree<T>(creator, value, nullTree(creator), nullTree(creator));
}

function putStrLn(s: string): void {
    console.log(s + "\n");
}

function print_<T extends Show<T>>(o: T) {
    putStrLn(o.show());
}

function main(args?: string[]) {
    let t = nullTree(MyNumber);
    print_(t);
}

main();
