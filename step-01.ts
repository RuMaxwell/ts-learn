class MyRecord {
    constructor(public username?: string, public password?: string) {
    }

    public show() {
        return `username: ${this.username}\npassword: ${this.password}\n`;
    }
}

function main(argv?: string[]): void {
    let x = new MyRecord("admin", "verydummy");
    console.log(x.show());
}

main();
