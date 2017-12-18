THREE.WOOLoader = function (manager) {
    this.manager = (manager !== undefined) ? manager : THREE.DefaultLoadingManager;

    this.propertyNameMapping = {};
};

THREE.WOOLoader.prototype = {
    constructor: THREE.WOOLoader,
    load: function (url, onLoad, onProgress, onError) {
        // var scope = this;

        var loader = new THREE.FileLoader(this.manager);
        loader.setResponseType('arraybuffer');
        loader.load(url, function (data) {

            function bin2str(buf) {

                var array_buffer = new Uint8Array(buf);

                if (window.TextDecoder !== undefined) {
                    return new TextDecoder().decode(array_buffer);
                }

                var str = '';

                for (var i = 0, il = buf.byteLength; i < il; i++) {

                    str += String.fromCharCode(array_buffer[i]); // implicitly assumes little-endian

                }

                return str;

            }

            if (data instanceof ArrayBuffer) {
                onLoad(
                    bin2str(data).split('\n').map(function (v) {
                        var vv = v.split(' ');

                        return {
                            x: vv[0],
                            y: vv[1],
                            z: vv[2],
                            r: vv[3],
                            g: vv[4],
                            b: vv[5]
                        }

                    })
                )


            } else {
                onError(new Error('file not compatible'))
            }


        }, onProgress, onError);
    },
    parse: function (data) {

    }
};