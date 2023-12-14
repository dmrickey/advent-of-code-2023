Object.defineProperty(Array.prototype, "log", {
    value(name) {
        console.log(name, this);
        return this;
    },
});
Object.defineProperty(Array.prototype, "sum", {
    value(name) {
        return this.reduce((x, y) => x + y, 0);
    },
});