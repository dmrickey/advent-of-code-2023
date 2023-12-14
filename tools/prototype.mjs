Object.defineProperty(Array.prototype, "log", {
    value(name) {
        console.log(name, this);
        return this;
    },
});