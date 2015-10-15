var fs = require("fs");
var path = require("path");
var sep = path.sep;

//author ~ giffo, dated: 10/10/2013


/**
 * just load the files, parse the data and then use a simple binary search to fetch the country
 */



var GeoIP = module.exports = (function(dir) {

	if(!dir)
		dir = __dirname;
	

	// read from file sync
	var countryNames = {}; // use code to return country
	var world = [];
	var region = {};
	
	
	// reads file and returns an array of string lines
	function readFile(fname) {
		var filename = path.resolve(dir, fname);
		if(!fs.existsSync(filename)) {
			console.log("your precious file does not exist: "+filename);
			console.error(filename + " was not found, it is dearly needed my friend.\nExiting.");
			process.exit(1);
			return;
		} 
		
		var filedata = fs.readFileSync(filename).toString("utf8");
		return filedata.split("\n");
	}
	
	
	
	(function loadFiles(dir) {
		var line, i, len;
		var lines = readFile("geoip.dat");		
		// lines.length-1 is because the last split is nothingness
		for(i=0, len = lines.length-1;i<len;i++) {
			line = lines[i].split(",");
			world.push(new IPBlock(line[0],line[1],line[2].trim()));
		}
		lines = "";
		path.resolve()
		lines = readFile("geoip-countries.dat");
		for(i=0, len = lines.length-1;i<len;i++) {
			line = lines[i].split(",");
			countryNames[line[0]] = line[1];
		}
		lines = "";
		lines = readFile("geoip-region.dat");		
		for(i=0, len = lines.length-1;i<len;i++) {
			line = lines[i].split(",");
			region[line[0]] = line[1];
		}
	})(dir);
	
	
	function ipValue(ip) {
		var n = ip.split(".");
		//if(n.length !==4) {return 0;}
		return (16777216*+n[0])+(65536*+n[1])+(256*+n[2])+(parseInt(n[3],10));
	}
	
	
	
	function bsearch(ipAddrValue, to, from) {
		
		var pivot = ~~((from-to)/2)+to;
				
		var current = world[pivot];
	
		if(ipAddrValue < current.fromValue) {
			return bsearch(ipAddrValue, to, pivot);
		} else if(ipAddrValue > current.fromValue + current.range) {
			return bsearch(ipAddrValue, pivot, from);
		}
		
		return current.code; // if its not less than nor greater than, we have found our match
	}
	
	return {
		country:function(ip) {
			var c = bsearch(ipValue(ip),0,world.length);
			return c?countryNames[c]:"unknownland";
		},
		region:function(ip) {
			var c = bsearch(ipValue(ip),0,world.length);
			return c?region[c]:"somewhere";
		}		
	}
})()


// this is how the ip's are stored
function IPBlock(fromVal, range, countryCode) {
	this.fromValue = +fromVal;
	this.range = +range;
	this.code = countryCode;//.toLowerCase();
}

