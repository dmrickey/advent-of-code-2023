export {};

declare global {
    interface Object {
        log(name?: any): this;
    }

    interface Array<T> {
        log(name?: any): this;
        sum(): number;
        product(): number;
        multiIndexOf(el: T): number[];
    }
}
