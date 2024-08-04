import * as THREE from "three";
import { X3D } from "./X3D";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

  // Robot Class:

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

    // const grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000);
    // grid.material.opacity = 0.2;
    // grid.material.transparent = true;
    // this.scene.add(grid);

    // model
    this.robot = null;
    this.loader = new GLTFLoader();
    this.loader.load("RobotExpressive.glb", (gltf) => {
      const model = gltf.scene; // Declare model with const
      this.scene.add(model); // Use this.scene instead of passing scene as a parameter
      this.robot = gltf; // Set this.robot to the loaded glTF object
      this.mixer = new THREE.AnimationMixer(this.robot.scene); // Initialize mixer with the model's scene
      this.clips = this.robot.animations; // Access animations from the loaded model
    });
  }
  update() {
    const dt = this.clock.getDelta();

    if (this.mixer) this.mixer.update(dt);

    this.renderer.render(this.scene, this.camera);
  }
  events(act = "Death") {
    this.clip = THREE.AnimationClip.findByName(this.clips, act);
    this.action = this.mixer.clipAction(this.clip);
    this.action.play();

    // this.mixer.addEventListener("loop", this.stopAct.bind(this));
  }
  stopAct() {
    this.action.stop();
  }
}

const robot = new GGRobot(document.getElementById("robot-container"));
robot.load();
robot.animate();

  // Acts down:

document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username !== "admin" || password !== "password123") {
      document.getElementById("error-message").textContent =
        "Incorrect username or password.";
      document.getElementById("username").value = "";
      document.getElementById("password").value = "";
      robot.stopAct();

      robot.events("Death");
    } else {
      robot.stopAct();
      robot.events("Yes");
    }
  });
setTimeout(() => {
  robot.events("Idle");
}, 500);
document.addEventListener("mousemove", function (e) {
  const follower = document.querySelector("#robot-container");
  follower.style.left = `${e.clientX - 50}px`;
  follower.style.top = `${e.clientY}px`;

  if (robot.clip && robot.clip.name !== "Walking") {
    console.log(robot);
    robot.stopAct();
    robot.events("Walking");
  }
});
