/* JS type wrappers */
///<reference path="./typings/tsd.d.ts"/>

/* X3Map references */
///<reference path="./Lang/EventHandler.ts"/>
///<reference path="./Lang/Event.ts"/>

///<reference path="./Scenes/Scene.ts"/>
///<reference path="./Scenes/SectorScene.ts"/>

///<reference path="./Data/MapObjectType.ts"/>
///<reference path="./Data/MapObject.ts"/>
///<reference path="./Data/MapObject3D.ts"/>
///<reference path="./Data/UniverseMap.ts"/>
///<reference path="./Data/SectorMap.ts"/>
///<reference path="./Data/Asteroid.ts"/>

module X3Map {
    export class X3Map {
        private htmlcontainer: HTMLElement;

        private renderer: THREE.WebGLRenderer;

        private scene: Scene;

        constructor(container: HTMLElement) {
            this.htmlcontainer = container;

            // Construimos el renderizador
            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setClearColor(0xffffff);
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.setSize(this.htmlcontainer.offsetWidth, this.htmlcontainer.offsetHeight);

            this.htmlcontainer.appendChild(this.renderer.domElement);

            // Handler para el resize
            container.addEventListener('resize', this.onWindowResize, false);

            // Mapa del sector
            var smap = new SectorMap("Example Sector");
            smap.SectorObjects.push(new Asteroid("Asteroid Silicon", AsteroidType.SILICON, 23, 34, 65, 12));
            smap.SectorObjects.push(new Asteroid("Asteroid Silicon", AsteroidType.SILICON, 12, 34, 2, 12));
            smap.SectorObjects.push(new Asteroid("Asteroid Silicon", AsteroidType.SILICON, 14, 54, 3, 12));
            smap.SectorObjects.push(new Asteroid("Asteroid Silicon", AsteroidType.SILICON, 53, 23, 9, 12));

            // Cargamos la escena
            this.scene = new SectorScene(this.renderer, smap);
        }

        private onWindowResize() {
            this.scene.resize(this.htmlcontainer.offsetWidth, this.htmlcontainer.offsetHeight);
            this.renderer.setSize(this.htmlcontainer.offsetWidth, this.htmlcontainer.offsetHeight);
        }

        private next() {
            requestAnimationFrame(() => this.next());
            this.scene.animate();
            this.scene.render();
        }

        public start() {
            this.next();
        }
    }
}
