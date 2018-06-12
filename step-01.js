var MyRecord = /** @class */ (function () {
    function MyRecord(username, password) {
        this.username = username;
        this.password = password;
    }
    MyRecord.prototype.show = function () {
        return "username: " + this.username + "\npassword: " + this.password + "\n";
    };
    return MyRecord;
}());
function main(argv) {
    var x = new MyRecord("admin", "verydummy");
    console.log(x.show());
}
main();
