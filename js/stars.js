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
        
        // Set up lights
        const directionalLight = new THREE.DirectionalLight('#ffffff', 1);
        directionalLight.position.set(1, 1, 0);
        this.scene.add(directionalLight);
        const ambientLight = new THREE.AmbientLight('#ffffff', 0.5);
        this.scene.add(ambientLight);
        
        // Set up avatar properties
        this.avatar = null;
        this.modelPath = '../models/michel.obj';
        this.texturePath = '../models/texture.png';
        
        // Initialize both starfield and avatar
        // this.initStarfield();
        this.initAvatar();
        this.resize();
        this.boundResize = () => this.resize();
        window.addEventListener('resize', this.boundResize);
        
        // Optional: Add controls
        this.setupControls();
    }

    initStarfield() {
        const starGeometry = new THREE.BufferGeometry();
        const starMaterial = new THREE.PointsMaterial({
            color: 0xFFFFFF,
            size: 0.1,
            sizeAttenuation: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
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
    
    initAvatar() {
        // Load avatar texture and model
        const textureLoader = new THREE.TextureLoader();
        const avatarTexture = textureLoader.load(this.texturePath);
        const avatarMaterial = new THREE.MeshBasicMaterial({
            map: avatarTexture,
        });
        
        const objLoader = new THREE.OBJLoader();
        objLoader.load(
            this.modelPath,
            (object) => {
                console.log('Successfully loaded 3D model:', this.modelPath);
                object.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                        child.material = avatarMaterial;
                    }
                });
                
                object.scale.set(0.02, 0.02, 0.02);
                object.position.set(0.0, -2.0, 0.0);
                
                this.scene.add(object);
                this.avatar = object;
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            (error) => {
                console.error('Error loading 3D model:', error);
                console.error('Attempted to load from path:', this.modelPath);
            }
        );
        
        // Also log texture loading results
        textureLoader.load(
            this.texturePath,
            (texture) => {
                console.log('Successfully loaded texture:', this.texturePath);
            },
            (xhr) => {
                // Progress callback
            },
            (error) => {
                console.error('Error loading texture:', error);
                console.error('Attempted to load from path:', this.texturePath);
            }
        );
    }
    
    setupControls() {
        // Optional: Add OrbitControls
        this.controls = new THREE.OrbitControls(this.camera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = true;
        this.controls.minDistance = 2;
        this.controls.maxDistance = 10;
        this.controls.enablePan = true;
        this.controls.dampingFactor = 0.05;
        
        // Disable controls by default
        this.controls.enabled = false;
        
        // Add event listeners for CTRL key
        document.addEventListener('keydown', (event) => {
            if (event.ctrlKey) {
                this.controls.enabled = true;
            }
        });
        
        document.addEventListener('keyup', (event) => {
            if (!event.ctrlKey) {
                this.controls.enabled = false;
            }
        });
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
        if (!this.canvas) return;
        
        // Update starfield
        if (this.starField) {
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
        }
        
        // Update avatar rotation
        if (this.avatar) {
            this.avatar.rotation.y += 0.01;
        }
        
        // Update controls if they exist
        if (this.controls) {
            this.controls.update();
        }

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
        // Clean up avatar if it exists
        if (this.avatar) {
            this.avatar.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    if (child.geometry) child.geometry.dispose();
                    if (child.material) {
                        if (Array.isArray(child.material)) {
                            child.material.forEach(material => material.dispose());
                        } else {
                            child.material.dispose();
                        }
                    }
                }
            });
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