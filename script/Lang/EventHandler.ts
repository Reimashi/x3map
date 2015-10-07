module X3Map {
    export class EventHandler {
        private cb: (sender: Object, params?: Object) => void;

        constructor(cb: (sender: Object, params?: Object) => void) {
            this.cb = cb;
        }

        public Handle(sender: Object, params?: Object) {
            return this.cb(sender, params);
        }
    }
}