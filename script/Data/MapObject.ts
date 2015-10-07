module X3Map {
    export abstract class MapObject {
        private name: string;
        private objecttype: MapObjectType;

        constructor(name: string, type: MapObjectType) {
            this.name = name;
            this.objecttype = type;
        }

        public get Name(): string {
            return this.name;
        }

        public get MapObjectType(): MapObjectType {
            return this.objecttype;
        }
    }
}