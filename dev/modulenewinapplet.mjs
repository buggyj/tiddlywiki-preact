
const {html, useState} = await import ("$:/plugins/bj/tiddlywiki-preact/preactsignal.mjs")

const {getTiddler, addTiddler, Tiddler, parseJSONSafe} = await import ("$:/plugins/bj/tiddlywiki-preact/storeutils.js")

function newInApplet(title,name){

	if (!title) return false
	// Get the plugin tiddler
	var pluginTiddler = getTiddler(title);
	if(!pluginTiddler) {
		console.log("plugintiddler");return false;
	}

	var jsonPluginTiddler = parseJSONSafe(pluginTiddler.fields.text,null);
	if(!jsonPluginTiddler) {
		console.log("jsonPluginTiddler");return false
	}
	//console.log(jsonPluginTiddler)
	
	// Get the list of tiddlers
	var tiddlers = jsonPluginTiddler.tiddlers
	
	if (!!tiddlers[title+"/"+name+".mjs"]) {console.log("exits");return false;}
	tiddlers[title+"/"+name+".mjs"]={title: title+"/"+name+".mjs", text: "", type: "application/javascript"};

	// Save the tiddler
	addTiddler(new Tiddler(pluginTiddler,{text: JSON.stringify({tiddlers: tiddlers},null,4), version: version, list:"log"}));
	return true;

}


const {setTextReference} = await import ('$:/plugins/bj/tiddlywiki-preact/store.js')
 
const handleButtonClick = (title,name) => {
	if(newInApplet(title,name)) setTextReference("$:/status/RequireReloadDueToPluginChange","yes")
}
export function addInApplet({title}){
	const [name,setName]= useState("")

	return html`
	<button onClick=${()=>{if (!!title)handleButtonClick(title,name);else alert("add title and new mjs")}}>
         add to Applet
    </button><br/>
	${title}/<input type="text" value=${name} onInput=${(e) => {setName( e.target.value);}} /> name
	`
}