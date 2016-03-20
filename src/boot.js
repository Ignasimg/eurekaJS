'use strict';

/*
* boot eurekaJS
*/
(function () {
  // Create a namespace chain in the given context
  var namespace = function (context, namespace) {
    context = context || window;
    // Split the namespace into it's parts
    var nsparts = namespace.split(".");
    // If the first part don't exist create it;
    var parent = nsparts[0];
    context[parent] = context[parent] || {};
    parent = context[parent];
    // For all the other parts
    for (var i = 1; i < nsparts.length; i++) {
      // If it doesn't exist, create it
      parent[nsparts[i]] = parent[nsparts[i]] || {};
      // select the new parent element;
      parent = parent[nsparts[i]];
    }
    // return the final part (namespace object)
    return parent;
  }

  // Load a file using ajax.
  var load = function (url) {
    return new Promise(function (resolve, reject) {
      var xhttp = new XMLHttpRequest();
      xhttp.addEventListener('load', function () {
        resolve(xhttp.responseText);
      });
      ['error', 'abort'].forEach(event => 
        xhttp.addEventListener(event, function () {
          reject(xhttp.status+" - "+xhttp.responseText);
        })
      );
      var url_not_from_cache = url + '?' + Math.round(Math.random() * 1000000);
      xhttp.open("GET", url_not_from_cache, true);
      xhttp.send();
    });
  }

  // Dictionary of contexts in which we've loaded urls
  //  together with those and their promises.
  var loadPromise = new WeakMap();

  // Load a file in the given context.
  var loadInContext = function (url, context) {
    // If the url has not been loaded before in this context.
    if (!loadPromise.has(context)) loadPromise.set(context, {});
    if (!(loadPromise.get(context))[url]) {
      // Load the url.
      var p = load(url).then((sourceCode) => run(sourceCode, context, url));
      // Store the promise for the given url in the given context
      loadPromise.get(context)[url] = p;
    }
    // Return the promise
    return loadPromise.get(context)[url];
  }

  // Run file into the framework.
  var run = function (sourceCode, context, fileName) {
    // We parse the sourceCode to extact the imports
    var parsed = parse(sourceCode);
    parsed.debugInfo.fileName = fileName;
    // We require the imports
    return require(parsed.imports, context).then(
      // Upon acomplishment of requirements we eval the sourceCode
      // in the specified context.
      () => runInContext(parsed.sourceCode, context, parsed.debugInfo)
    );
  }

  // Parse the file to extact the imports.
  var parse = function (sourceCode) {
    var re = /^\s*import\s+(\".*\"|\'.*\');?$/gm;
    var parsed = {
      imports: [],
      sourceCode: "",
      debugInfo: {
        lineStart: 0
      }
    }
    
    var tmp = [];
    
    var lastIndex = 0;
    
    while ((tmp = re.exec(sourceCode)) != null) {
      parsed.imports.push(tmp[1].slice(1, -1));
      lastIndex = re.lastIndex;
    }
    
    parsed.sourceCode = sourceCode.substr(lastIndex);
    parsed.debugInfo.lineStart = sourceCode.substr(0, lastIndex).split('\n').length;
    
    return parsed;
  }

  // Run the sourceCode into the given context.
  var runInContext = function (sourceCode, context, debugInfo) {
    // We'd like to access our context as if it was global
    var vars = [];
    for (var property in context) {
      vars.push('var '+property+' = this["'+property+'"];');
    }
    vars = vars.join('\n');

    sourceCode = sourceCode.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
    
    var code = '"use strict";\n'+vars+'\neval("'+sourceCode+'");';

    Function(code).call(context);
    /*
    try {
      // Create a Function which will run our code
      Function (code)
      // Call it into the given context
      .call(context);
    }
    catch (e) {
      parseError(e, debugInfo);
      throw e;
    }
    */
  }

  // Parse an error from the evalInContext to throw a decent feedback.
  var parseError = function (error, debugInfo) {
    var position = /<anonymous>:(\d+):(\d+)/.exec(error.stack.split("\n")[1]);
    var row = (parseInt(position[1]) + debugInfo.lineStart - 1);
    var col = position[2];
    console.error(error.message+"\tat %c"+debugInfo.fileName+":"+row+":"+col,"color:blue;");
  }

  // Require some files.
  var require = function (urls, context) {
    var promises = [];
    for (var i = 0; i < urls.length; ++i) {
      if (urls[i].split('/')[0] == 'eurekaJS') urls[i] = eurekaBaseURL+urls[i];
      promises.push(loadInContext(urls[i], context));
    }

    return Promise.all(promises);
  }

  // Base url for the framework files.
  var eurekaBaseURL = document.currentScript.getAttribute('src').slice(0, -7) || '';

  // Boot init
  var init = function () {
    // Framework base files.
    var eurekaFiles = [
      'eurekaJS/native/NativeCanvas.js', 
      'eurekaJS/display/Stage.js',];

    // Base url of the framework files
    if (eurekaBaseURL.length == 0) eurekaBaseURL = '.';
    if (!eurekaBaseURL.endsWith('/')) eurekaBaseURL = eurekaBaseURL + '/';

    // Get all canvas elements on the page
    var canvasList = document.getElementsByTagName("canvas");

    // For each canvas
    for (var i = 0; i < canvasList.length; ++i) {
      // Check data-src attribute. 
      // If it exists eurekaJS assumes the canvas is to be used as eurekaJS view for the given src file.
      let src = canvasList[i].getAttribute('data-src');
      if (src) {
        let canvas = canvasList[i];

        // Create a eurekaJS context, inside the canvas
        let ns = namespace(canvas, "eurekaJS");

        // Create a playground context, inside eurekaJS.
        // this will be used to load the framework and our apps.
        let playground = namespace(ns, "playground");

        // Give direct access to eurekaJS from playground context.
        playground.eurekaJS = ns;

        // Give direct access to namespace from playground context.
        // in playground context, namespace will take the current canvas as the parent.
        playground.namespace = namespace.bind(null, canvas);

        // Load the framework.
        require(eurekaFiles, playground).then(function() {
            console.info('Boot eurekaJS... %c[ok]', 'color: green;');
            // When executing user code, the base namespace will be the playground
            playground.namespace = namespace.bind(null, playground);

            // Bind the canvas into the framework.
            let nativeCanvas = new playground.eurekaJS.native.NativeCanvas(canvas);
            // Create the stage instance.
            playground.Stage = new playground.eurekaJS.display.Stage(nativeCanvas);

            console.info('Executing ['+src+']');
            require([src], playground);
        });
      }

    }
  }

  init();
})();