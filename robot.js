import * as THREE from "three";
import { X3D } from "./X3D";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";


class GGRobot extends X3D {
  world() {
    this.clock = new THREE.Clock();

    // lights
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3);
    hemiLight.position.set(0, 20, 0);
    this.scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 3);
    dirLight.position.set(0, 20, 10);
    this.scene.add(dirLight);

    const grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000);
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    this.scene.add(grid);

    // model
    this.loader = new GLTFLoader();
    this.loader.load(
      "RobotExpressive.glb",
      (gltf) => {
        const model = gltf.scene; // Declare model with const
        this.scene.add(model); // Use this.scene instead of passing scene as a parameter
      },
      undefined,
      (e) => {
        console.error(e);
      }
    );
  }
  update() {
    const dt = this.clock.getDelta();

    if (this.mixer) mixer.update(dt);

    this.renderer.render(this.scene, this.camera);
  }
}
const robot = new GGRobot(document.getElementById("robot-container"));
robot.load();
robot.animate();
