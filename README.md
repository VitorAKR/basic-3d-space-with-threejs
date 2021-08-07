# Basic 3D Space using three.js
This repository stores a JS code using three.js library to create a basic 3D space (in this case a plane with a cube in the middle).
### See the final result below:
![Result](/assets/img/img01.png)

## Things you need to know before running
All the code is inside of the "main.js" file, but for the execution it will be necessary to configure a web server to be able to load the import libraries.
```js
//importing modules
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.124/build/three.module.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';
```
Tip: If you use VS Code as a text editor, you can use the Live Server extension to run the index.html file on localhost.

## Creating objects with three.js
With this library it's possible to create geometric shapes inside the scene, adding shape properties, color, position, shadow, etc.
```js
    const box = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 2),
        new THREE.MeshStandardMaterial({
            color: 0x3ba7e5,
        }));
      box.position.set(0, 1, 0);
      box.castShadow = true;
      box.receiveShadow = true;
      this._scene.add(box);
```
### Result
![Result](/assets/img/img02.png)

## Libraries
Below is the list of libraries used in this repository:

| Library/Resource | Link |
| ------ | ------ |
| Three.js – JavaScript 3D Library | https://threejs.org/ |
| Orbit Controls - Allow the camera to orbit around a target | https://sbcode.net/threejs/orbit-controls/ |

## Special thanks
Special thanks to the SimonDev Youtube channel (https://www.youtube.com/channel/UCEwhtpXrg5MmwlH04ANpL8A)
