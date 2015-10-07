module X3Map {
    export abstract class MapObject3D extends MapObject {
        private posx: number;
        private posy: number;
        private posz: number;

        private onposchange: Event;

        constructor(name: string, type: MapObjectType, posx: number, posy: number, posz: number) {
            super(name, type);
            this.posx = posx;
            this.posy = posy;
            this.posz = posz;

            this.onposchange = new Event();
        }

        public get X(): number {
            return this.posx;
        }

        public get Y(): number {
            return this.posy;
        }

        public get Z(): number {
            return this.posz;
        }

        public set X(value: number) {
            if (value != this.posx) {
                this.posx = value;
                this.onposchange.Fire(this, { x: this.posx, y: this.posy, z: this.posz });
            }
        }

        public set Y(value: number) {
            if (value != this.posy) {
                this.posy = value;
                this.onposchange.Fire(this, { x: this.posx, y: this.posy, z: this.posz });
            }
        }

        public set Z(value: number) {
            if (value != this.posz) {
                this.posz = value;
                this.onposchange.Fire(this, { x: this.posx, y: this.posy, z: this.posz });
            }
        }

        public get OnPositionChanged(): Event {
            return this.onposchange;
        }
    }
}