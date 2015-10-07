module X3Map {
    export class SectorMap extends MapObject {
        private sector_objs: Array<MapObject3D>;

        constructor(name: string) {
            super(name, MapObjectType.SECTOR);
            this.sector_objs = [];
        }

        public get SectorObjects(): Array<MapObject3D> {
            return this.sector_objs;
        }
    }
}