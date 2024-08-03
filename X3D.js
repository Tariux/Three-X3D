import * as THREE from "three";

class X3D {
  constructor(container, world = false, update = false) {
    this.scene = new THREE.Scene();
    this.container = container;
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.25,
      100
    );
    this.camera.position.set(-5, 3, 10);
    this.camera.lookAt(0, 2, 0);

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); // Set alpha to true for transparent background
    if (typeof world === "function") {
      this.world = world;
    }
    if (typeof update === "function") {
      this.update = update;
    }
  }
  generate() {
    this.container.appendChild(this.renderer.domElement);
  }
  resize() {
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.camera.aspect =
      this.container.clientWidth / this.container.clientHeight; // Corrected the aspect ratio calculation

    this.camera.updateProjectionMatrix();

    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    ); // Use clientWidth and clientHeight instead of innerWidth and innerHeight
    window.onresize = () => {
      // Changed to arrow function to maintain 'this' context

      this.camera.aspect =
        this.container.clientWidth / this.container.clientHeight; // Corrected the aspect ratio calculation
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(
        this.container.clientWidth,
        this.container.clientHeight
      ); // Corrected the renderer size calculation
    };
  }
  animate() {
    const animateFrame = () => {
      requestAnimationFrame(animateFrame);
      if (typeof this.update === "function") {
        this.update();
      }
      this.renderer.render(this.scene, this.camera);
    };
    animateFrame();
  }
  load() {
    this.resize();
    this.generate();
    if (typeof this.world === "function") {
      this.world(this.scene, this.camera);
    }
  }

  update() {
    if (this.scene.children.length > 0) {
      this.scene.children.forEach((child) => {
        if (child.isMesh) {
          child.rotation.x += 0.01;
          child.rotation.y += 0.01;
        }
      });
    }
  }
}
export { X3D };
