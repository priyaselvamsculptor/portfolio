import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

const modelPaths = {
  Jacob: 'assets/3d_models/opt_Jacob.glb',
  Juliette: 'assets/3d_models/opt_Juliette.glb',
  Thyro: 'assets/3d_models/opt_Thyro.glb'
};

class ModelViewer {
  constructor(container) {
    this.container = container;
    this.modelName = container.dataset.model;
    this.modelPath = modelPaths[this.modelName];

    this.loaderElement = container.querySelector('.canvas-loader');
    this.hintElement = container.parentElement.querySelector('.canvas-hint');

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.model = null;

    this.autoRotate = true;
    this.isIntersecting = false;
    this.animationFrameId = null;

    this.init();
  }

  init() {
    // 1. Create Scene
    this.scene = new THREE.Scene();

    // 2. Create Camera
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 10);
    this.camera.position.set(0, 0.5, 2);

    // 3. Create Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    this.container.appendChild(this.renderer.domElement);

    // 4. Create OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.minDistance = 1.5;
    this.controls.maxDistance = 4;
    this.controls.maxPolarAngle = Math.PI / 2 + 0.1;
    this.controls.minPolarAngle = 0.1;
    this.controls.target.set(0, 0.1, 0);

    // 5. Setup Lighting (Studio setup)
    this.setupLighting();

    // 6. Setup Shadow Catcher Floor
    this.setupFloor();

    // 7. Load GLB Model
    this.loadModel();

    // 8. Setup Observers and Listeners
    this.setupListeners();
  }

  setupLighting() {
    // Soft base ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    this.scene.add(ambientLight);

    // Main spotlight casting shadows
    const keyLight = new THREE.DirectionalLight(0xfffbf4, 0.85);
    keyLight.position.set(3, 4, 3);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 10;
    const d = 1.5;
    keyLight.shadow.camera.left = -d;
    keyLight.shadow.camera.right = d;
    keyLight.shadow.camera.top = d;
    keyLight.shadow.camera.bottom = -d;
    keyLight.shadow.bias = -0.0005;
    this.scene.add(keyLight);

    // Soft cool fill light
    const fillLight = new THREE.DirectionalLight(0xddeeff, 0.3);
    fillLight.position.set(-3, 2, 1);
    this.scene.add(fillLight);

    // Subtle backlight/rimlight
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.4);
    rimLight.position.set(0, 3, -3);
    this.scene.add(rimLight);
  }

  setupFloor() {
    const floorGeo = new THREE.PlaneGeometry(5, 5);
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.35 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.55; // sitting below the model bottom
    floor.receiveShadow = true;
    this.scene.add(floor);
  }

  loadModel() {
    const loader = new GLTFLoader();

    // Configure DRACO Loader for loading Draco-compressed optimized GLBs
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      this.modelPath,
      (gltf) => {
        this.model = gltf.scene;

        // Setup shadows and details
        this.model.traverse((node) => {
          if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
            if (node.material) {
              node.material.shadowSide = THREE.DoubleSide;
              if (node.material.roughness !== undefined) {
                node.material.roughness = Math.max(node.material.roughness, 0.3);
              }
            }
          }
        });

        // Auto Scale and Center
        const box = new THREE.Box3().setFromObject(this.model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 1.2 / maxDim; // fits standard size
        this.model.scale.set(scale, scale, scale);

        box.setFromObject(this.model);
        box.getCenter(center);

        this.model.position.sub(center);
        this.model.position.y += 0.05; // center in viewer frame

        this.scene.add(this.model);

        // Hide loader spinner
        if (this.loaderElement) {
          this.loaderElement.classList.add('hidden');
        }
      },
      undefined,
      (error) => {
        console.error(`Error loading model ${this.modelName}:`, error);
        if (this.loaderElement) {
          this.loaderElement.innerHTML = `<span style="color:var(--accent); font-family:var(--font-heading); font-size:0.95rem; text-align:center; padding:15px; display:block;">Error: ${error.message || error}</span>`;
        }
      }
    );
  }

  setupListeners() {
    // Detect user interactions to disable auto-rotation
    const stopAutoRotate = () => {
      if (this.autoRotate) {
        this.autoRotate = false;
        // Fade out hint badge
        if (this.hintElement) {
          this.hintElement.classList.add('hidden');
        }
      }
    };

    this.container.addEventListener('pointerdown', stopAutoRotate);
    this.container.addEventListener('wheel', stopAutoRotate, { passive: true });

    // Window Resize
    window.addEventListener('resize', () => {
      const width = this.container.clientWidth;
      const height = this.container.clientHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    });

    // Intersection Observer to pause rendering when canvas is offscreen
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.isIntersecting = entry.isIntersecting;
        if (this.isIntersecting) {
          this.startLoop();
        } else {
          this.stopLoop();
        }
      });
    }, { threshold: 0.05 });

    observer.observe(this.container);
  }

  startLoop() {
    if (!this.animationFrameId) {
      this.animate();
    }
  }

  stopLoop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    let needsRender = this.autoRotate;

    if (this.autoRotate && this.model) {
      this.model.rotation.y += 0.005;
    }

    const controlsUpdated = this.controls.update();
    if (controlsUpdated) {
      needsRender = true;
    }

    if (needsRender) {
      this.renderer.render(this.scene, this.camera);
    }
  }
}

// Initialize for each container
window.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.interactive-canvas-container');
  containers.forEach(container => {
    new ModelViewer(container);
  });
});
