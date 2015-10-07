module X3Map {
    export class Event {
        private handlers: Array<EventHandler>;

        constructor() {
            this.handlers = [];
        }

        public Add(handler: EventHandler) {
            this.handlers.push(handler);
        }

        public Remove(handler: EventHandler) {
            var a = this.handlers.indexOf(handler);
            this.handlers.splice(a, 1);
        }

        public Fire(sender: Object, params?: Object) {
            this.handlers.forEach((eh) => {
                eh.Handle(sender, params);
            })
        }
    }
}