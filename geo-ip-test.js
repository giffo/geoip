// simple test file showing the module's usage


var util = require("util");
console.log("empty");
console.dir(util.inspect(process.memoryUsage()));
var geo = require("./index.js"); 
// var geo = require("giffo-geoip"); 

console.log("loaded");
console.dir(util.inspect(process.memoryUsage()));


console.log(geo.country("213.212.20.1") +" is finland?");
console.log(geo.region("213.212.20.1") +" is europe?");
console.log(geo.country("176.56.129.23") +" is switzerland?");
console.log(geo.country("216.72.67.255") +" merica");



function rn() {
	return ~~(Math.random()*(255));
}
// produces random ips
function rip() {
	return ""+rn()+"."+rn()+"."+rn()+"."+rn();
}

var t = rip(); // assigns a random ip address
console.log("single test");
//console.dir(util.inspect(process.memoryUsage()));
console.time("t");
geo.country(t);
console.timeEnd("t");
//console.dir(util.inspect(process.memoryUsage()));
var a;

var r;
const LOOPS = 500000;
// 500k per second on this pc
console.time("a");
for(var i=0;i<LOOPS;i++) {
	
	r = rip();
	a = geo.country(r);
	
}
console.log("tested "+LOOPS+" random ips (aswell as random ip generation) in");
console.timeEnd("a");



console.log("after "+LOOPS+" ips tested");
console.dir(util.inspect(process.memoryUsage()));

