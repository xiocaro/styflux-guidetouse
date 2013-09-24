#!/usr/bin/env node

var styflux=require('styflux'),
	fs=require('fs'),
	config=JSON.parse(fs.readFileSync(__dirname + "/config/config.json")), //Obtiene los parametros del config
	compile=config.compile || {"ext":".styl","cmd":"stylus -c"}, //Almacenando configuracion del compilador
	layout=config.layouts || {}, //Almacenando configuracion de layout
	views=config.views || {}, //Almacenando configuracion de views
	globals=config.vars || {}, //Almacenando las variables globales
	ignore=config.ignore || {}, //Almacenando las rutas ignora por el compilador
	routes={}; //Almacenador de rutas

//Almacenando las rutas

if(Object.keys(layout).length>=1&&layout.active){
	routes["layout"]={"path":layout.path,"imports":(typeof layout.compile!="undefined")?layout.compile:{},"ignore":(ignore["layouts"]||[])};
}
if(Object.keys(views).length>=1){
	routes["views"]={"path":views.path,"imports":(typeof views.compile!="undefined")?views.compile:{},"ignore":(ignore["views"]||[])};
}

//Recorriendo y Compilando

styflux.compileProject(routes,globals,compile);