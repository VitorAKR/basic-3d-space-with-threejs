//importing modules
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.124/build/three.module.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';

let _APP = null;

window.addEventListener('DOMContentLoaded', () => {
    _APP = new Basic3DWorld();
});

class Basic3DWorld{
    constructor(){
        this._Initialize();
    }

    _Initialize(){
        //the WebGLRenderer renders what it should be displayed on the screen
        //antialias setted to true, render the stuffs without black background 
        this._threejs = new THREE.WebGLRenderer({
            antialias : true,
        });
        this._threejs.shadowMap.enabled = true;
        this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
        this._threejs.setPixelRatio(window.devicePixelRatio);
        this._threejs.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(this._threejs.domElement);
        
        window.addEventListener('resize', () => {
            this._OnWindowResize();
        }, false);
        //set a camera aspect parameters
        const fov = 60;
        const aspect = 1920 / 1080;
        const near = 1.0;
        const far = 1000.0;
        this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this._camera.position.set(75, 20, 0);

        //create a scene
        this._scene = new THREE.Scene();
        //add some light to the scene
        let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
        light.position.set(20, 100, 10);
        light.target.position.set(0, 0, 0);
        light.castShadow = true;
        light.shadow.bias = -0.001;
        light.shadow.mapSize.width = 2048;
        light.shadow.mapSize.height = 2048;
        light.shadow.camera.near = 0.1;
        light.shadow.camera.far = 500.0;
        light.shadow.camera.near = 0.5;
        light.shadow.camera.far = 500.0;
        light.shadow.camera.left = 100;
        light.shadow.camera.right = -100;
        light.shadow.camera.top = 100;
        light.shadow.camera.bottom = -100;
        this._scene.add(light);
    
        light = new THREE.AmbientLight(0x101010);
        this._scene.add(light);

        //this manipulates the camera created
        const controls = new OrbitControls(
            this._camera, this._threejs.domElement);
          controls.target.set(0, 20, 0);
          controls.update();      
        
        //this creates a plane 
        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100, 10, 10),
            new THREE.MeshStandardMaterial({
                color: 0xB4b7b4,
              }));
        plane.castShadow = false;
        plane.receiveShadow = true;
        plane.rotation.x = -Math.PI / 2;
        this._scene.add(plane);
        
        //this creates a box in the middle of the scene
        const box = new THREE.Mesh(
            new THREE.BoxGeometry(2, 2, 2),
            new THREE.MeshStandardMaterial({
                color: 0x3ba7e5,
            }));
          box.position.set(0, 1, 0);
          box.castShadow = true;
          box.receiveShadow = true;
          this._scene.add(box);

        //last thing is to call the requestAnimationFrame
        //just to be able to process the stuffs in each frame
        this._RAF();
    }

    _OnWindowResize(){
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
        this._threejs.setSize(window.innerWidth, window.innerHeight);
    }

    _RAF(){
        requestAnimationFrame(() => {
          this._threejs.render(this._scene, this._camera);
          this._RAF();
        });
    }
    
}