Object.defineProperty(Array.prototype, "log", {
    value(name) {
        if (name === false) return this;
        name
            ? console.log(name, this)
            : console.log(this);
        return this;
    },
});

Object.defineProperty(Array.prototype, 'multiIndexOf', {
    value(el) {
        var idxs = [];
        for (var i = this.length - 1; i >= 0; i--) {
            if (this[i] === el) {
                idxs.unshift(i);
            }
        }
        return idxs;
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
