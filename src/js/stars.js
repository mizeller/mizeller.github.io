class Starfield {
    constructor() {
        this.canvas = document.querySelector('.starfield');
        if (!this.canvas) return;
        
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / 300, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: this.canvas, 
            alpha: true,
            antialias: true 
        });
        
        this.stars = new THREE.Group();
        this.scene.add(this.stars);
        
        this.camera.position.z = 5;
        
        this.init();
        this.resize();
        this.boundResize = () => this.resize();
        window.addEventListener('resize', this.boundResize);
    }

    init() {
        const starGeometry = new THREE.BufferGeometry();
        // const starMaterial = new THREE.PointsMaterial({
        //     color: 0xFFFFFF,
        //     size: 0.05,
        //     sizeAttenuation: true
        // });

        const starMaterial = new THREE.PointsMaterial({
            color: 0xFFFFFF,
            size: 0.1,  // Increased size
            sizeAttenuation: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending  // Makes stars glow
        });

        const positions = new Float32Array(2000 * 3);
        for(let i = 0; i < positions.length; i += 3) {
            positions[i] = (Math.random() - 0.5) * 10;
            positions[i + 1] = (Math.random() - 0.5) * 10;
            positions[i + 2] = (Math.random() - 0.5) * 10;
        }

        starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        this.starField = new THREE.Points(starGeometry, starMaterial);
        this.scene.add(this.starField);
    }

    resize() {
        const container = this.canvas.parentElement;
        const width = container.offsetWidth;
        const height = container.offsetHeight || 300;
        
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }

    update() {
        if (!this.starField) return;

        this.starField.rotation.z += 0.0005;
        this.starField.rotation.x += 0.0002;

        const positions = this.starField.geometry.attributes.position.array;
        for(let i = 0; i < positions.length; i += 3) {
            positions[i + 2] += 0.01;
            if(positions[i + 2] > 5) {
                positions[i + 2] = -5;
            }
        }
        this.starField.geometry.attributes.position.needsUpdate = true;

        this.renderer.render(this.scene, this.camera);
        this.animationFrame = requestAnimationFrame(() => this.update());
    }

    destroy() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        window.removeEventListener('resize', this.boundResize);
        if (this.renderer) {
            this.renderer.dispose();
        }
        if (this.starField) {
            this.starField.geometry.dispose();
            this.starField.material.dispose();
        }
    }
}

// Initialize when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const starfield = new Starfield();
    if (starfield.canvas) {
        starfield.update();
        
        // Optional: Add to window for external access
        window.starfield = starfield;
    }
});