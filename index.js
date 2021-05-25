/*
*

patternJs - A basic JS function for detecting repeating strings within a string.

Nick Freese, copyright 2021 

pattternJs.rec(<string>, <randomStringLength>, <minLengthForPattern>);


*/



(function(){
	

	var app = {
        
        s:{
        	test:true
        },

        init:function(s){

        	var _this = this;

            for (key in s) {

            	_this.s[key] = s[key];

            }

            if (_this.s.test === true) {

            	_this.test();

            }
            
            window.pattternJs = _this;

        },


        test:function(){

        	var _this = this;

        	console.log("Patterns in test data string");
        	console.log(_this.rec("123asdfghjklyp1234512", false, 2));

        	console.log("Patterns random string");
        	console.log(_this.rec(false, 500, 3));

        },

        



        rec:function(data = false, len = false, minVariance = false){

        	var _this = this;
            var seenVals = [];//{val:"a", pos:0}
        	var patterns = [];

        	if(!minVariance){
        		minVariance = 2;
        	}

        	if (!len) {

        		len = 50;

        	}

        	if (!data) {

        		data = _this.getTestString(len);

        		console.log(data);

        	}

            var arr = data.split("");
        	//do algorithm
            
            for (let e = 0; e< arr.length;e++) {

            	if ( _this.isInSeenVals(arr[e], seenVals) ) {

            		
                    //begin some checking

                    var originPos = _this.getValuePositions(arr[e], seenVals);

                    for (let p = 0; p < originPos.length; p++) {

                        var pattern = [];

                        var patternStart = e;
                        
                        for (let j = originPos[p]; j < arr.length;j++) {

                    	    if (arr[j] == arr[e+j-originPos[p]]) {

                                pattern.push(arr[j]);
                    	    } else {
                    	    	break;
                    	    }

                        }

                        if (pattern.length >= minVariance) {

                        	patterns.push({pattern:pattern.join(""), secondStart:patternStart, firstStart: originPos[p]});

                        }

                        
                    }
                    

            	}

            	seenVals.push({val:arr[e], pos:e});

            }


            
            return patterns;

        },


        isInSeenVals: function(val, seenVals){

        	var _this = this;

        	for (var i = 0; i < seenVals.length; i++) {
        		if (val == seenVals[i].val) {

        			return true;

        		}
        	} 

        	return false;

        },

        getValuePositions: function (val, seenVals) {

        	var _this = this;

        	var positions = [];

        	for (var i = 0; i < seenVals.length; i++) {
        		if (val == seenVals[i].val) {

        			positions.push(seenVals[i].pos);

        		}
        	}

        	return positions;

        },
        


        getTestString:function(length){

        	var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            	var result = '';
            	for ( var i = 0; i < length; i++ ) {
            	    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
            	}
            	return result;

        }
	};

	return app.init(window.patternJsSettings);
})();
