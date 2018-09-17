
//eventi

$('.button_color').bind('click', function (e) {
    e.preventDefault();

    if (__CARICATO) {

        //qua leggo l'immagine convertita da pdf a immagine
        var image = new Image();
        image.src = __CANVAS.toDataURL();
        
        //check dpi
//        console.log(image.width)
//        console.log(image.height)

        var texture = new THREE.Texture();
        texture.image = image;
        image.onload = function () {
            texture.needsUpdate = true;
        };

        //var texture = textureLoader.load('models/packagin/3.jpg');
        texture.offset.x = 0;
        texture.offset.y = 0;

        //var material = new THREE.MeshBasicMaterial({color: button_color});

        OBJ.traverse(function (child) {

            if (child.name !== '') {
                //console.log(child.name)
                var clone_material = child.material.clone();
                clone_material.map = texture;
                child.material = clone_material;
            }
        });

        scene.add(OBJ);
        render();
    }
});

//var keyLight = new THREE.PointLight(0xaaaaaa);
//keyLight.position.x = 15;
//keyLight.position.y = -10;
//keyLight.position.z = 35;
//scene.add(keyLight);
//
//var rimLight = new THREE.PointLight(0x888888);
//rimLight.position.x = 100;
//rimLight.position.y = 100;
//rimLight.position.z = -50;
//scene.add(rimLight);