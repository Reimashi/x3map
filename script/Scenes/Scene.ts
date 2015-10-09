module X3Map {

    /**
     * Representa una escena.
     */
    export abstract class Scene {
        protected domElementContainer: HTMLElement;
        protected domElement: HTMLElement;

        protected autoresize: Boolean;
        protected width: number;
        protected height: number;

        protected renderer: THREE.WebGLRenderer;
        protected scene: THREE.Scene;
        protected camera: THREE.Camera;

        private stopflag: Boolean;

        public constructor(container: HTMLElement, width?: number, height?: number)
        {
            this.domElementContainer = container;

            // Construimos el renderizador
            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setClearColor(0xffffff);
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.setSize((width) ? width : container.offsetWidth, (height) ? height : container.offsetHeight);

            this.domElement = this.renderer.domElement;
            this.domElementContainer.appendChild(this.domElement);

            // Handler para el resize
            container.addEventListener('resize', this.onWindowResize, false);

            this.scene = new THREE.Scene();
        }

        /**
         * Ejecuta el siguiente bucle de la animación.
         */
        private next() {
            if (!this.stopflag) {
                requestAnimationFrame(() => this.next());
                this.Animate();
                this.renderScene();
            }
        }

        private onWindowResize() {
            if (this.autoresize) this.Resize(this.domElementContainer.offsetWidth, this.domElementContainer.offsetHeight);
        }

        public get AutoResize(): Boolean {
            return this.autoresize;
        }

        /**
         * Establece si el control debe cambiar de tamaño con su contenedor.
         */
        public set AutoResize(value: Boolean) {
            this.autoresize = value;

            if (value &&
                    (this.domElementContainer.offsetWidth != this.width ||
                    this.domElementContainer.offsetHeight != this.height)) {
                this.Resize(this.domElementContainer.offsetWidth, this.domElementContainer.offsetHeight);
            }
        }

        /**
         * Anima la escena antes de renderizar el proximo frame.
         */
        protected abstract Animate(): void;

        /**
         * Renderiza el proximo frame.
         */
        protected abstract Render(): void;
        
        /**
         * Renderiza el proximo frame.
         * (Metodo separado de Render() para evitar override).
         */
        private renderScene(): void {
            if (this.scene == null) {
                console.error("Scene object is not instantiated.");
            }
            else if (this.camera == null) {
                console.error("Camera object is not instantiated.");
            }
            else {
                this.Render();
                this.renderer.render(this.scene, this.camera);
            }
        }

        /**
         * Realiza los cambios necesarios para renderizar una escena con la nueva resolución.
         * @param width Nuevo ancho de la pantalla.
         * @param height Nuevo ancho de la pantalla.
         */
        public Resize(width: number, height: number): void {
            // FIXME
            this.renderer.setSize(this.domElementContainer.offsetWidth, this.domElementContainer.offsetHeight);

            this.width = width;
            this.height = height;
        }

        /**
         * Inicia la animación.
         */
        public Start(): void {
            this.stopflag = false;
            this.next();
        }

        /**
         * Para la animación.
         */
        public Stop(): void {
            this.stopflag = true;
        }
    }
}
