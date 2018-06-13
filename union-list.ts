interface Eq<T> {
    equalTo: (r: T) => boolean;
}

interface Ord<T> extends Eq<T> {
    greaterThan: (r: T) => boolean;
    compareTo?: (r: T) => number;
}

interface Show {
    show: () => string;
}

interface MyIterable<T> {
    isNull: () => boolean;
    car: () => T;
    cdr: () => MyIterable<T>;
}


class List<T extends Eq<T> & Show> implements Eq<List<T>>, Show {
    isNull(): boolean {
        return true;
    }

    car(): T {
        throw new Error("car of null list");
    }

    cdr(): List<T> {
        throw new Error("cdr of null list");
    }

    cons(x: T): List<T> {
        return new Cons<T>(x, this);
    }

    equalTo(r: List<T>): boolean {
        if (this.isNull() && r.isNull()) {
            return true;
        }
        else if (!this.isNull() && !r.isNull()) {
            return this.car().equalTo(r.car()) ? this.cdr().equalTo(r.cdr()) : false;
        }
        else {
            return false;
        }
    }

    protected showHelper(): string {
        if (this.cdr().isNull()) {
            return this.car().show();
        }
        else {
            return this.car().show() + "," + this.cdr().showHelper();
        }
    }
    
    show(): string {
        return "[" + this.showHelper() + "]";
    }
}


class Cons<T extends Eq<T> & Show> extends List<T> {
    constructor ( protected head: T
                , protected tail: List<T>) {
        super();
    }

    car(): T {
        return this.head;
    }

    cdr(): List<T> {
        return this.tail;
    }

    isNull(): boolean {
        return false;
    }
}


class Int implements Ord<Int>, Show {
    constructor ( public value: number ) {
    }

    equalTo(r: Int): boolean {
        return this.value === r.value;
    }

    greaterThan(r: Int): boolean {
        return this.value > r.value;
    }

    show(): string {
        return this.value.toString();
    }
}


function putStrLn(str: string): void {
    console.log(str + "\n");
}

function print_<T extends Show>(o: T): void {
    putStrLn(o.show());
}

function main(args?: string[]) {
    let l = (new List<Int>()).cons(new Int(3)).cons(new Int(2)).cons(new Int(1));
    print_(l);
}

main();
