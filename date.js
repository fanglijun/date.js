
module.exports = (function(){
	// Example: 2013-02-05 07:08:09
	// Y->2013  y->13
	// m->02 	n->2
	// d->05 	j->5
	// H->07	G->7 // 24h
	// i->08
	// s->09
	// Escaping letters: date("[Yes, today is: ]Y-m-d \\H:i:s") or date("\\Ye\\s, to\\da\\y \\i\\s: Y-m-d H:i:s")
	var tokenPatten = /(?:\[([^\[]*)\])|(\\)?([YyMmdjHhGgis])/g;
	var tokenFunctions = {
		Y: function(date){
			return date.getFullYear();
		},
		y: function(date){
			return date.getFullYear().toString().substr(2);
		},
		m: function(date){
			var m = date.getMonth() + 1;
			return m > 9 ? m : '0' + m;
		},
		n: function(date){
			return date.getMonth() + 1;
		},
		d: function(date){
			var d = date.getDate();
			return d > 9 ? d : '0' + d;
		},
		j: function(date){
			return date.getDate();
		},
		H: function(date){
			var h = date.getHours();
			return h > 9 ? h : '0' + h;
		},
		G: function(date){
			return date.getHours();
		},
		i: function(date){
			var i = date.getMinutes();
			return i > 9 ? i : '0' + i;
		},
		s: function(date){
			var s = date.getSeconds();
			return s > 9 ? s : '0' + s;
		}
	};

	return function(format, time){
		format = format || 'Y-m-d H:i:s';
		var date;
		switch (typeof time) {
			case 'undefined':
				date = new Date();
				break;
			case 'string':
				date = new Date(string);
				break;
			case 'object':
				if (time instanceof Date) {
					date = time;
				}else{
					date = new Date(time);
				};
				break;
			default:
				date = new Date();
		}
		date.toString = function(formatStr){
			formatStr = formatStr || format;
			var that = this;
			return formatStr.replace(tokenPatten, function(match, escaped, slash, token){
				return (escaped || '') + (slash ? (token || '') : (token ? tokenFunctions[token](that) : ''));
			});
		}
		return date;
	}
})();