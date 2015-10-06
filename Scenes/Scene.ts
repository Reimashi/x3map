module X3Map {
      
    /**
     * Representa una escena.
     */
    export interface Scene {
        /**
         * Anima la escena antes de renderizar el proximo frame.
         */
        animate(): void;
        
        /**
         * Renderiza el proximo frame.
         */
        render(): void;
        
        /**
         * Realiza los cambios necesarios para renderizar una escena con la nueva resolución.
         * @param width Nuevo ancho de la pantalla.
         * @param height Nuevo ancho de la pantalla.
         */
        resize(width: number, height: number) : void;
    }
}