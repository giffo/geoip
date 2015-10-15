###giffo-geoip


A basic geoip for node.js, initially focused on a small memory footprint, sadly 2 years since I wrote this the footprint does not seem so small, at the time it was lower I do not believe that is the case now from inspecting memory usage.


###install
	
	npm install giffo-geoip

###usage

	var geo = require("giffo-geoip");
	
	// get country

	var country = geo.country(ip);

	// get region - aka europe or asia etc
	var region = geo.region(ip);

as simple as that.

both methods .country(ip) and .region(ip) take an ip address in the form of a string "12.32.45.56" etc.

