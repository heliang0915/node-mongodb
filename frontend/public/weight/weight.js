/*
 * 组件父类
 */
define(["jquery"], function($) {
	//定义公共 方法
	var Weight = function() {
		return new Weight();
	}
	Weight.fn = Weight.prototype;
	//类方法
	Weight.extend = function(_old, _new) {
			_new = _new == undefined ? {} : _new;
			for (var key in _new) {
				_old[key] = _new[key];
			}
			return _old;
		}
		//实例方法
	Weight.fn.renderCss = function(cssText,styleId) {
		// var style = $('#' + styleId);
		// if (style.length == 0) {
		// 	$('head').append("<style id='" + styleId + "'>" + cssText + "</style>");
		// } 
	}

	//渲染html
	Weight.fn.renderHTML = function(templateHTML,data) {
		var reg = /\{(\w+)\}/g;
		templateHTML = templateHTML.replace(reg, function() {
			var key = arguments[1];
			return data[key];
		});
		var className=$(templateHTML).attr("class");
		var templateDom=$("body").find("."+className);
		if(templateDom.length==0){
			$("body").append(templateHTML);
		}
	}
	return Weight;
});

//create方法兼容
if (typeof Object.create != 'function') {
	// Production steps of ECMA-262, Edition 5, 15.2.3.5
	// Reference: http://es5.github.io/#x15.2.3.5
	Object.create = (function() {
		// To save on memory, use a shared constructor
		function Temp() {}

		// make a safe reference to Object.prototype.hasOwnProperty
		var hasOwn = Object.prototype.hasOwnProperty;

		return function(O) {
			// 1. If Type(O) is not Object or Null throw a TypeError exception.
			if (typeof O != 'object') {
				throw TypeError('Object prototype may only be an Object or null');
			}

			// 2. Let obj be the result of creating a new object as if by the
			//    expression new Object() where Object is the standard built-in
			//    constructor with that name
			// 3. Set the [[Prototype]] internal property of obj to O.
			Temp.prototype = O;
			var obj = new Temp();
			Temp.prototype = null; // Let's not keep a stray reference to O...

			// 4. If the argument Properties is present and not undefined, add
			//    own properties to obj as if by calling the standard built-in
			//    function Object.defineProperties with arguments obj and
			//    Properties.
			if (arguments.length > 1) {
				// Object.defineProperties does ToObject on its first argument.
				var Properties = Object(arguments[1]);
				for (var prop in Properties) {
					if (hasOwn.call(Properties, prop)) {
						obj[prop] = Properties[prop];
					}
				}
			}

			// 5. Return obj
			return obj;
		};
	})();
}