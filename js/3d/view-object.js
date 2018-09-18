var camera, scene, renderer;
var mouseX = 0, mouseY = 0;
var OBJ;
var w_container = 0;
var h_container = 0;

window.onload = function () {

    init();
    animate();

    function init() {

        w_container = $obj3D.width();
        h_container = $obj3D.height();

        camera = new THREE.PerspectiveCamera(45, w_container / h_container, 1, 2000);
        camera.position.z = 130;

        // scene
        scene = new THREE.Scene();

        //mio
        controls = new THREE.OrbitControls(camera, $obj3D[0]);
        controls.enableDamping = true;
        controls.enablePan = false;
        controls.dampingFactor = 0.08;
        controls.rotateSpeed = 0.03;
        controls.enableZoom = true;
        controls.zoomSpeed = 0.5;
        controls.minDistance = 30;  //arriva a 30 nel massimo zoom
        controls.maxDistance = 230;
        controls.maxPolarAngle = Math.PI / 2;
        controls.screenSpacePanning = false;
        //

        var ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
        scene.add(ambientLight);

        var pointLight = new THREE.PointLight(0x5a5a5a, .7);
        pointLight.power = .6;
        pointLight.position.set(50, 50, 50);
        camera.add(pointLight);

        scene.add(camera);

        // model
        var onProgress = function (xhr) {
            if (xhr.lengthComputable) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log(Math.round(percentComplete, 2) + '% downloaded');
            }
        };

        var onError = function (xhr) {
            console.dir(xhr)
        };

        THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());

        new THREE.MTLLoader()
                .setPath('models/packagin/')
                .setMaterialOptions({side: THREE.DoubleSide})
                .load('oggetto.mtl', function (materials) {

                    materials.preload();

                    new THREE.OBJLoader()
                            .setMaterials(materials)
                            .setPath('models/packagin/')
                            .load('oggetto.obj', function (object) {

                                //aggiunto per test smooth shading - TEST
                                object.traverse(function (child) {

                                    if (child instanceof THREE.Mesh) {
//                                        console.log(child.material)

//                                        child.material.FlatShading = true;
//                                        child.geometry.computeFaceNormals();
                                        child.geometry.computeVertexNormals();
//                                        child.material.shading = THREE.SmoothShading;
                                    }
                                });

                                //object.scale.set(.2,.2,.2);
                                //object.position.x = 0;
                                object.position.y = -28;

                                OBJ = object;

                                scene.add(object);

                            }, onProgress, onError);

                });

        renderer = new THREE.WebGLRenderer();

        //sfondo bianco
        renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
        //
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(w_container, h_container);
        $obj3D[0].appendChild(renderer.domElement);

        window.addEventListener('resize', canvasResize, false);
    }

    function update() {
	    controls.update();
	    renderer.render(scene, camera);
    }

    function animate() {
        renderer.setAnimationLoop(update);
    }
};

function canvasResize() {
    if (!MENU_OPEN) {
        w_container = w_window;
    } else {
        w_container = w_window - w_menu_sx;
    }
    h_container = h_window - h_detail;
    camera.aspect = w_container / h_container;
    camera.updateProjectionMatrix();
    renderer.setSize(w_container, h_container);
}