module X3Map {
    export class SectorScene implements Scene {
        private renderer: THREE.WebGLRenderer;

        private scene: THREE.Scene;
        private camera: THREE.Camera;
        private controls: THREE.OrbitControls;

        private data: SectorMap;

        constructor(render: THREE.WebGLRenderer, map: SectorMap) {
            this.data = map;
            this.renderer = render;

            this.scene = new THREE.Scene();

            this.camera = new THREE.PerspectiveCamera(60, 1, 1, 1000); // FIXME?
            this.camera.position.z = 500;

            this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
            this.controls.maxAzimuthAngle = 10;

            // Pintamos la escena
            this.addAxes();
            // Pintamos los objetos
            this.data.SectorObjects.forEach((sobj: MapObject3D) => {
                this.addMapObject(sobj);
            });
        }

        public animate() {
        }

        public render() {
            this.renderer.render(this.scene, this.camera);
        }

        public resize(width: number, height: number) {
            this.camera.updateMatrix();
        }

        private addMapObject(obj: MapObject3D) {
            var radius = 3, segments = 6, rings = 6;

            var sphereMaterial = new THREE.MeshLambertMaterial({
                    color: 0xCC0000
                });

            var sphere = new THREE.Mesh(
                    new THREE.SphereGeometry(radius, segments, rings),
                    sphereMaterial
            );

            sphere.position.set(obj.X, obj.Y, obj.Z);
            console.log("Añadiendo el objeto " + obj.Name + " en (" + obj.X + ", " + obj.Y + ", " + obj.Z + ").");

            this.scene.add(sphere);
        }

        private addAxes() {
            var material = new THREE.LineBasicMaterial({
                color: 0x0000ff
            });

            var geometryx = new THREE.Geometry();
            geometryx.vertices.push(
                new THREE.Vector3(-100, 0, 0),
                new THREE.Vector3(100, 0, 0)
            );

            var geometryy = new THREE.Geometry();
            geometryy.vertices.push(
                new THREE.Vector3(0, -100, 0),
                new THREE.Vector3(0, 100, 0)
            );

            var geometryz = new THREE.Geometry();
            geometryz.vertices.push(
                new THREE.Vector3(0, 0, -100),
                new THREE.Vector3(0, 0, 100)
            );

            this.scene.add(new THREE.Line(geometryx, material));
            this.scene.add(new THREE.Line(geometryy, material));
            this.scene.add(new THREE.Line(geometryz, material));

            var textpos = 92;

            var textShapes = THREE.FontUtils.generateShapes("Z", { font: "droid sans", size: 5 });
            var text = new THREE.ShapeGeometry(textShapes);
            var textMesh = new THREE.Mesh(text, material);
            textMesh.position.set(0, 0, textpos);
            this.scene.add(textMesh);

            var textShapes = THREE.FontUtils.generateShapes("Y", { font: "droid sans", size: 5 });
            var text = new THREE.ShapeGeometry(textShapes);
            var textMesh = new THREE.Mesh(text, material);
            textMesh.position.set(0, textpos, 0);
            this.scene.add(textMesh);

            var textShapes = THREE.FontUtils.generateShapes("X", { font: "droid sans", size: 5 });
            var text = new THREE.ShapeGeometry(textShapes);
            var textMesh = new THREE.Mesh(text, material);
            textMesh.position.set(textpos, 0, 0);
            this.scene.add(textMesh);
        }
    }
}