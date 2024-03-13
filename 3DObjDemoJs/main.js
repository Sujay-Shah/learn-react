import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js';

console.clear();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth/window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  antialias:true,
  alpha:true
})

renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

camera.position.z=220;
camera.position.y=100;

const controls = new OrbitControls(camera,renderer.domElement);

const group = new THREE.Group();
scene.add(group);

let sampler = null;
let elephant = null;
let paths = [];

const loader = new OBJLoader();

loader.load(
  './Mesh_Elephant.obj',
  (obj)=>{
    sampler = new MeshSurfaceSampler(obj.children[0]).build();

    for(let i = 0; i<4; i++)
    {
        const path = new Path(i);
        paths.push(path);
        group.add(path.line);
    }
    renderer.setAnimationLoop(render);
  },
  (xhr) => console.log((xhr.loaded/xhr.total) * 100 + "% loaded"),
  (err) => console.error(err)
);

const tempPosition = new THREE.Vector3();
const materials = [new THREE.LineBasicMaterial({color:0xFAAD80, transparent:true, opacity:0.5}),
  new THREE.LineBasicMaterial({color:0xFF6767, transparent:true, opacity:0.5}),
  new THREE.LineBasicMaterial({color:0xFF3D68, transparent:true, opacity:0.5}),
  new THREE.LineBasicMaterial({color:0xA73489, transparent:true, opacity:0.5})
];

class Path{
  constructor(index){
    this.geometry = new THREE.BufferGeometry();
    this.material = materials[index%4];
    this.line = new THREE.Line(this.geometry,this.material);
    this.vertices = [];
    sampler.sample(tempPosition);
    this.prevPoint = tempPosition.clone();

  }

  update(){
    let pointFound = false;
    while(!pointFound){
      sampler.sample(tempPosition);
      if(tempPosition.distanceTo(this.prevPoint) < 30 ){
        this.vertices.push(tempPosition.x,tempPosition.y,tempPosition.z);
        this.prevPoint.copy(tempPosition);//.clone();
        pointFound = true;
      }
    }
    this.geometry.setAttribute("position", new THREE.Float32BufferAttribute(this.vertices,3));
  }
}

function render(a){
  group.rotation.y += 0.002;
  paths.forEach(path => {
    if(path.vertices.length < 10000){
      path.update();
    }
  });

  controls.update();
  renderer.render(scene,camera); 

}

window.addEventListener("resize", onWindowResize,false);

function onWindowResize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
}