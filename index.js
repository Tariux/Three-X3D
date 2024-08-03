
import {X3D} from './X3D'
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class theWorldClass extends X3D {
  constructor(container) {
    super(container, theWorldClass.prototype.world, theWorldClass.prototype.update);
  }

  world() {
    // Add a light source
    this.light = new THREE.DirectionalLight(0xffffff, 1);
    this.light.position.set(5, 3, 5).normalize();
    this.scene.add(this.light);

    // Load textures
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('bump.jpg');
    const bumpTexture = textureLoader.load('bump2.jpg');

    // Create Earth sphere
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshPhongMaterial({
        map: earthTexture,
        bumpMap: bumpTexture,
        bumpScale: 0.05,
    });
    this.earth = new THREE.Mesh(geometry, material);
    this.scene.add(this.earth);

    // Camera position
    this.camera.position.z = 3;

    // Orbit controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement); // Instantiate OrbitControls correctly
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;
  }

  update() {
    if (this.scene.children.length > 0) {
        this.earth.rotation.x += 0.001;
        this.earth.rotation.y += 0.001;
        this.earth.rotation.z += 0.005;

    }
  }
}


const mineClass = new theWorldClass(document.getElementById("scene2"));
mineClass.load();
mineClass.animate();
