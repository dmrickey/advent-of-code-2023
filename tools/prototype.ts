export {};

declare global {
    interface Object {
        log(name?: string): void;
    }

    interface Array<T> {
        sum(): number;
        product(): number;
    }
}
