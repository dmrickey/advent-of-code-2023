Object.defineProperty(Array.prototype, "log", {
    value(name) {
        name
            ? console.log(name, this)
            : console.log(this);
        return this;
    },
});

Object.defineProperty(String.prototype, "log", {
    value(name) {
        name
            ? console.log(name, this)
            : console.log(this);
        return this;
    },
});

Object.defineProperty(Number.prototype, "log", {
    value(name) {
        name
            ? console.log(name, this)
            : console.log(this);
        return this;
    },
});

Object.defineProperty(Object.prototype, "log", {
    value(name) {
        name
            ? console.log(name, this)
            : console.log(this);
        return this;
    },
});

Object.defineProperty(Array.prototype, "sum", {
    value(name) {
        return this.reduce((x, y) => x + y, 0);
    },
});
Object.defineProperty(Array.prototype, "product", {
    value(name) {
        return this.reduce((x, y) => x * y, 1);
    },
});
