'use strict';

/*
* boot eurekaJS
*/
(function () {
  // Create a namespace chain.
  var namespace = function (namespace) {
    // Split the namespace into it's parts
    var nsparts = namespace.split(".");
    // If the first part don't exist create it;
    var parent = nsparts[0];
    window[parent] = window[parent] || {};
    parent = window[parent];
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

  // Dictionary of the urls we've loaded together with their promise.
  var loadPromise = {};

  // Load a file into the framework.
  var loadIntoFramework = function (url) {
    if (!loadPromise[url]) {
      var context = namespace("eurekaJS.sandbox");
      var p = load(url).then((sourceCode) => run(sourceCode, context, url))
      loadPromise[url] = p;
    }
    return loadPromise[url];
  }

  // Run file into the framework.
  var run = function (sourceCode, context, fileName) {
    // We parse the sourceCode to extact the imports
    var parsed = parse(sourceCode);
    parsed.debugInfo.fileName = fileName;
    // We require the imports
    return require(parsed.imports).then(
      // Upon acomplishment of requirements we eval the sourceCode
      // in the specified context.
      () => evalInContext(parsed.sourceCode, context, parsed.debugInfo)
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

  // Eval the sourceCode into the given context.
  var evalInContext = function (sourceCode, context, debugInfo) {
    try {
      // Create a Function which will evaluate our code
      Function ('"use strict";\n'+sourceCode)
      // Call it into the given context
      .call(context);
    }
    catch (e) {
      parseError(e, debugInfo);
    }
  }

  // Parse an error from the evalInContext to throw a decent feedback.
  var parseError = function (error, debugInfo) {
    var position = /<anonymous>:(\d+):(\d+)/.exec(error.stack.split("\n")[1]);
    var row = (parseInt(position[1]) + debugInfo.lineStart - 1);
    var col = position[2];
    console.error(error.message+"\tat %c"+debugInfo.fileName+":"+row+":"+col,"color:blue;");
  }

  // Require some files.
  var require = function (urls) {
    var promises = [];
    for (var i = 0; i < urls.length; ++i) {
      promises.push(loadIntoFramework(urls[i]));
    }

    return Promise.all(promises);
  }

  require(['test.js']);

})();