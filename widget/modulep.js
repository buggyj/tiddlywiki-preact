/*\
title: $:/plugins/bj/unchane/modulep.js
type: application/javascript
module-type: library

facilitate hot reload
\*/

const createModuleLoader=require("$:/plugins/bj/unchane/moduleloader.js").createModuleLoader;
let mod=null
exports.getModuleP = () => { 
	return mod
}

exports.setModuleP = (inmod) => { 
	mod=inmod
}