var E = "e",
SUPER = "super",
UNDEFINED = "undefined";


/*
 * LEvent
 **/
var LEvent = function (){this.type="LEvent";};
LEvent.INIT = "init",
LEvent.ENTER_FRAME = "enter_frame",
LEvent.addEventListener = function (node, type, fun, boo){
	if(boo==null)boo=false;
	if(node.addEventListener){
		node.addEventListener(type, fun, false);
	}
};

/*
 * LMouseEvent
 **/
var LMouseEvent = function (){this.type="LMouseEvent";};
LMouseEvent.MOUSE_DOWN = "mousedown";
LMouseEvent.MOUSE_OUT = "mouseout";


/*
 * LGlobal
 **/
var LGlobal = function (){};
LGlobal.canvas = null;
LGlobal.width = 0;
LGlobal.height = 0;
LGlobal.speed = 50;
LGlobal.IS_MOUSE_DOWN = false;
LGlobal.objectIndex = 0;
LGlobal.childList = new Array();
LGlobal.buttonList = new Array();


LGlobal.setCanvas = function (id,w,h){
	LGlobal.id = id;
	LGlobal.window = window;
	LGlobal.object = document.getElementById(id);
	LGlobal.object.innerHTML='<div style="position:absolute;margin:0px 0px 0px 0px;width:'+w+'px;height:'+h+'px;z-index:0;"><canvas id="' + LGlobal.id + '_canvas">'+
	'</canvas></div>'+
	'<div id="' + LGlobal.id + '_InputText" style="position:absolute;margin:0px 0px 0px 0px;z-index:10;display:none;"><textarea rows="1" id="' + LGlobal.id + '_InputTextBox" /></div>';
	LGlobal.canvasObj = document.getElementById(LGlobal.id+"_canvas");
	LGlobal._canvas=document.createElement("canvas");
	LGlobal._context=LGlobal._canvas.getContext("2d");
	LGlobal.inputBox = document.getElementById(LGlobal.id + '_InputText');
	LGlobal.inputTextBox = document.getElementById(LGlobal.id + '_InputTextBox');
	LGlobal.inputTextField = null;
	if(w)LGlobal.canvasObj.width = w;
	if(h)LGlobal.canvasObj.height = h;
	LGlobal.width = LGlobal.canvasObj.width;
	LGlobal.height = LGlobal.canvasObj.height;
	LGlobal.canvas = LGlobal.canvasObj.getContext("2d");
	LGlobal.offsetX = 0;
	LGlobal.offsetY = 0;
        LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_DOWN,function(e){
        	if(e.offsetX == null && e.layerX != null){
        		e.offsetX = e.layerX;
        		e.offsetY = e.layerY;
        	}
    		if(LGlobal.inputBox.style.display != "none"){
    			LGlobal.inputTextField.text = LGlobal.inputTextBox.value;
    			LGlobal.inputBox.style.display = "none";
    		}   		
        	LGlobal.mouseEvent(e,LMouseEvent.MOUSE_DOWN);
        	LGlobal.IS_MOUSE_DOWN = true;
        	
    	});
        LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_OUT,function(e){
        	if(e.offsetX == null && e.layerX != null){
        		e.offsetX = e.layerX;
        		e.offsetY = e.layerY;
        	}
        	LGlobal.mouseEvent(e,LMouseEvent.MOUSE_OUT);
        	LGlobal.IS_MOUSE_DOWN = false;
    	});
} ;

LGlobal.mouseEvent = function(e,t){
	var k = null;
	for(k in LGlobal.childList){
		if(LGlobal.childList[k].mouseEvent){
			LGlobal.childList[k].mouseEvent(e,t);
		}
	}
};
LGlobal.onShow = function (){
	if(LGlobal.canvas == null)return;
	LGlobal.buttonShow(LGlobal.buttonList);    
	LGlobal.show(LGlobal.childList);
};
LGlobal.buttonShow = function(b){
	var k = null;
	for(k in b){
		if(b[k].buttonModeChange)b[k].buttonModeChange();
   }
};
LGlobal.show = function(s,cood){
	if(cood==null)cood={x:0,y:0,scaleX:1,scaleY:1,alpha:1,rotate:0};
	var k = null;
	for(k in s){
		if(s[k].show)s[k].show(cood);
	}
};


var LStage = LGlobal;

var LSystem = {
	screenInit:function(){
		var v = "meta[name=viewport]";
		var meta = document.querySelector(v);
		if(!meta){
			meta = document.createElement("meta");
			meta.setAttribute("name", "viewport");
			document.head.appendChild(meta);
		}
		var is,ns,xs,d='';
		is = ns = xs = 1;
		var content =  'width=device-width,initial-scale='+is+', minimum-scale='+ns+', maximum-scale='+xs+',user-scallable=no'+d;
		meta.setAttribute("content", content);
	}
};




/*
* PageProperty
**/

function addChild(o){
	o.parent = "root";
	LGlobal.childList.push(o);
}
function removeChild(o){
	for(var i=0;i<LGlobal.childList.length;i++){
		if(o.objectindex == LGlobal.childList[i].objectindex){
			if(o.die)o.die();
			LGlobal.childList.splice(i,1);
			break;
		}
	}
}
function init(s,c,w,h,f,t){
	LGlobal.speed = s;
	if(t != null && t == LEvent.INITINIT){
		LGlobal.frameRate = setInterval(function(){LGlobal.onShow();}, s);
		LGlobal.setCanvas(c,w,h);
		LSystem.screenInit();
		f();
	}else{
		LEvent.addEventListener(window,"load",function(){
			LGlobal.frameRate = setInterval(function(){LGlobal.onShow();}, s);
			LGlobal.setCanvas(c,w,h);
			LSystem.screenInit();
			f();
		});
	}
}

function base(d,b,a){
	b.apply(d,a);
	var p=null,o;
	for(p in b.prototype){
		o = d.constructor.prototype;
		if(!o[p])o[p] = b.prototype[p];
		o[p][SUPER] = b.prototype;
	}
}


/*
 * LObject
 **/
function LObject(){
	this.objectindex = ++LGlobal.objectIndex;
}
LObject.prototype = {};

/*
 * LDisplayObject
 **/
function LDisplayObject(){
	base(this,LObject,[]);
	this.mouseChildren = true;
}


/*
* LGraphics
**/
function LGraphics(){
	base(this,LDisplayObject,[]);
	var s = this;
	s.type = "LGraphics";
	s.color = "#000";
	s.alpha = 1;
	s.setList = new Array();
	s.showList = new Array();
}
p = {
	show:function (cood){
		if(cood==null)cood={x:0,y:0,scaleX:1,scaleY:1,alpha:1,rotate:0};
		var s = this,k=null;
		if(s.setList.length == 0)return;
		for(k in s.setList){
			s.setList[k](cood);
		}
	},
	lineWidth:function (t){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.lineWidth = t;});
	},
	strokeStyle:function (co){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.strokeStyle = co;});
	},
	stroke:function (){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.stroke();});
	},
	beginPath:function (){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.beginPath();});
	},
	closePath:function (){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.closePath();});
	},
	moveTo:function (x,y){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.moveTo(x,y);});
	},
	lineTo:function (x,y){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.lineTo(x,y);});
	},
	clear:function (){
		var s = this;
		s.bitmap = null;
		s.setList.splice(0,s.setList.length);
		s.showList.splice(0,s.showList.length);
	},
	rect:function (x,y,w,h){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.rect(x, y, w, h);});
		s.showList.push({type:"rect",value:[x,y,w,h]});
	},
	fillStyle:function (co){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.fillStyle = co;});
	},
	fill:function (){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.fill();});
	},
	arc:function(x,y,r,sa,ea,aw){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.arc(x,y,r,sa,ea,aw);});
	},

	drawArc:function(tn,lco,pa,isf,co){
		var s = this,c=LGlobal.canvas;
		s.setList.push(function(cood){
			var cx=cood.x,cy=cood.y;
			s.save = false;
			if(cood.alpha < 1){
				c.save();
				s.save = true;
				c.globalAlpha = cood.alpha;
			}
			if(cood.scaleX != 1 || cood.scaleY != 1){
				if(!s.save)c.save();
				s.save = true;
				c.scale(cood.scaleX,cood.scaleY);
			}
			c.beginPath();
			c.arc(pa[0]+cx,pa[1]+cy,pa[2],pa[3],pa[4],pa[5]);
			
			if(isf){
				c.fillStyle = co;
				c.fill();
			}
			if(tn>0){
				c.lineWidth = tn;
				c.strokeStyle = lco;
				c.stroke();
			}
			if(s.save)c.restore();
		});
		s.showList.push({type:"arc",value:pa});
	},
	drawRect:function (tn,lco,pa,isf,co){
		var s = this,c=LGlobal.canvas;
		s.setList.push(function(cood){
			s.save = false;
			if(cood.alpha < 1){
				c.save();
				s.save = true;
				c.globalAlpha = cood.alpha;
			}
			if(cood.scaleX != 1 || cood.scaleY != 1){
				if(!s.save)c.save();
				s.save = true;
				c.scale(cood.scaleX,cood.scaleY);
			}
			var cx=cood.x,cy=cood.y;
			c.beginPath();
			c.rect((pa[0]+cx),(pa[1]+cy),pa[2],pa[3]);
			
			if(isf){
				c.fillStyle = co;
				c.fill();
			}
			if(tn>0){
				c.lineWidth = tn;
				c.strokeStyle = lco;
				c.stroke();
			}
			if(s.save)c.restore(); 
		});
		s.showList.push({type:"rect",value:pa});
	},
	drawVertices:function(tn,lco,v,isf,co){
		var s = this,c=LGlobal.canvas;
		if(v.length < 3)return;
		s.setList.push(function(cood){
			s.save = false;
			if(cood.alpha < 1){
				c.save();
				s.save = true;
				c.globalAlpha = cood.alpha;
			}
			if(cood.scaleX != 1 || cood.scaleY != 1){
				if(!s.save)c.save();
				s.save = true;
				c.scale(cood.scaleX,cood.scaleY);
			}
			var cx=cood.x,cy=cood.y;
			c.beginPath();
			c.moveTo(v[0][0]+cx,v[0][1]+cy);
			var i,l = v.length;
			for(i=1;i<l;i++){
				var pa = v[i];
				c.lineTo(pa[0]+cx,pa[1]+cy);
			};
			c.lineTo(v[0][0]+cx,v[0][1]+cy);
			
			if(isf){
				c.fillStyle = co;
				c.fill();
			}
			if(tn>0){
				c.lineWidth = tn;
				c.strokeStyle = lco;
				c.closePath();
				c.stroke();
			}
			if(s.save)c.restore(); 
		});
		s.showList.push({type:"vertices",value:v});
	},

	drawLine:function (tn,lco,pa){
		var s = this,c=LGlobal.canvas;
		s.setList.push(function(cood){
			var cx=cood.x,cy=cood.y;
			c.beginPath();
			c.moveTo(pa[0]+cx,pa[1]+cy);
			c.lineTo(pa[2]+cx,pa[3]+cy);
			c.lineWidth = tn;
			c.strokeStyle = lco;
			c.closePath();
			c.stroke();
		});
	},
	lineStyle:function (tn,co,a){
		var s = this,c=LGlobal.canvas;
		if(color==null)co=s.color;
		if(alpha==null)a=s.alpha;
		s.color = co;
		s.alpha = a;
		s.setList.push(function(){
			c.lineWidth = tn;
			c.strokeStyle = co;
		});
	},
	add:function (f){
		this.setList.push(f);
	},
	ismouseon:function(e,co){
		var s = this;
		var k = null;
		if(e==null || e == UNDEFINED)return false;
		if(co==null)co={x:0,y:0,scaleX:1,scaleY:1,alpha:1,rotate:0};
		var ox,oy;
		if(e.offsetX == UNDEFINED){
			ox = e.touches[0].pageX;
			oy = e.touches[0].pageY;
		}else{
			ox = e.offsetX;
			oy = e.offsetY;
		}
		for(k in s.showList){
			if(s.showList[k].type == "rect"){
				if(ox >= s.showList[k].value[0] + co.x && ox <= s.showList[k].value[0] + co.x + s.showList[k].value[2] && 
					oy >= s.showList[k].value[1] + co.y && oy <= s.showList[k].value[1] + co.y + s.showList[k].value[3]){
					return true;
				}
			}else if(s.showList[k].type == "arc"){
				var xl = s.showList[k].value[0] + co.x - ox;
				var yl = s.showList[k].value[1] + co.y - oy;
				return xl*xl+yl*yl <= s.showList[k].value[2]*s.showList[k].value[2];
			}
		}		
		return false;
	},
	getWidth:function(){
		var s = this;
		var k = null,k1=null;
		var min = 0,max = 0,v;
		for(k in s.showList){
			if(s.showList[k].type == "rect"){
				if(min > s.showList[k].value[0])min = s.showList[k].value[0];
				if(max < s.showList[k].value[0] + s.showList[k].value[2])max = s.showList[k].value[0] + s.showList[k].value[2];
			}else if(s.showList[k].type == "arc"){
				if(min > s.showList[k].value[0] - s.showList[k].value[2])min = s.showList[k].value[0] - s.showList[k].value[2];
				if(max < s.showList[k].value[0] + s.showList[k].value[2])max = s.showList[k].value[0] + s.showList[k].value[2];
			}else if(s.showList[k].type == "vertices"){
				for(k1 in s.showList[k].value){
					v = s.showList[k].value[k1];
					if(min > v[0])min = v[0];
					if(max < v[0])max = v[0];
				}
			}
		}		
		return max - min;
	},
	getHeight:function(){
		var s = this;
		var k = null,k1=null;
		var min = 0,max = 0,v;
		for(k in s.showList){
			if(s.showList[k].type == "rect"){
				if(min > s.showList[k].value[1])min = s.showList[k].value[1];
				if(max < s.showList[k].value[1] + s.showList[k].value[3])max = s.showList[k].value[1] + s.showList[k].value[3];
			}else if(s.showList[k].type == "arc"){
				if(min > s.showList[k].value[1] - s.showList[k].value[2])min = s.showList[k].value[1] - s.showList[k].value[2];
				if(max < s.showList[k].value[1] + s.showList[k].value[2])max = s.showList[k].value[1] + s.showList[k].value[2];
			}else if(s.showList[k].type == "vertices"){
				for(k1 in s.showList[k].value){
					v = s.showList[k].value[k1];
					if(min > v[1])min = v[1];
					if(max < v[1])max = v[1];
				}
			}
		}		
		return max - min;
	},
	startX:function(){
		var s=this;
		var k = null,k1=null;
		var v = 0,ve;
		for(k in s.showList){
			if(s.showList[k].type == "rect"){
				if(v > s.showList[k].value[0])v = s.showList[k].value[0];
			}else if(s.showList[k].type == "arc"){
				if(v > s.showList[k].value[0] - s.showList[k].value[2])v = s.showList[k].value[0] - s.showList[k].value[2];
			}else if(s.showList[k].type == "vertices"){
				for(k1 in s.showList[k].value){
					ve = s.showList[k].value[k1];
					if(v > ve[0])v = ve[0];
				}
			}
		}		
		return v;
	},
	startY:function(){
		var s=this;
		var k = null,k1=null;
		var v = 0,ve;
		for(k in s.showList){
			if(s.showList[k].type == "rect"){
				if(v > s.showList[k].value[1])v = s.showList[k].value[1];
			}else if(s.showList[k].type == "arc"){
				if(v > s.showList[k].value[1] - s.showList[k].value[2])v = s.showList[k].value[1] - s.showList[k].value[2];
			}else if(s.showList[k].type == "vertices"){
				for(k1 in s.showList[k].value){
					ve = s.showList[k].value[k1];
					if(v > ve[1])v = ve[1];
				}
			}
		}		
		return v;
	}
};
for(var k in p)LGraphics.prototype[k]=p[k];


/*
* LSprite
**/
function LSprite(){
	base(this,LDisplayObject,[]);
	var s = this;
	s.type = "LSprite";
	s.x = 0;
	s.y = 0;
	s.rotatex;
	s.rotatey;
	s.rotate = 0;
	s.alpha = 1;
	s.visible=true;
	s.childList = new Array();
	s.frameList = new Array();
	s.mouseList = new Array();
	s.graphics = new LGraphics();
	s.graphics.parent = s;
	s.width = 0;
	s.height = 0;
	s.scaleX=1;
	s.scaleY=1;
	s.mask = null;
}
p = {
	show:function (cood){
		var s = this,rotateFlag = Math.PI / 180,c = LGlobal.canvas;
		if(cood==null)cood={x:0,y:0,scaleX:1,scaleY:1,alpha:1,rotate:0};
		if(!s.visible)return;
		s.save = false;		
		if(s.rotate != 0){
			if(typeof(s.rotatex) == "undefined"){
				s.getRotateXY();
			}
			c.translate(cood.x + s.x + s.rotatex, cood.y + s.y + s.rotatey);
			c.rotate(s.rotate * rotateFlag);
			c.translate(-(cood.x + s.x + s.rotatex), -(cood.y + s.y + s.rotatey));
		}
		s.graphics.show({x:s.x+cood.x,y:s.y+cood.y,scaleX:cood.scaleX*s.scaleX,scaleY:cood.scaleY*s.scaleY,alpha:cood.alpha*s.alpha});
		LGlobal.show(s.childList,{x:s.x+cood.x,y:s.y+cood.y,scaleX:cood.scaleX*s.scaleX,scaleY:cood.scaleY*s.scaleY,alpha:cood.alpha*s.alpha});
		if(s.save)c.restore();
		s.loopframe();
	},
	getRotateXY:function(w,h){
		var s = this;
		if(w!=null && h!=null){
			s.rotatex = w/2;
			s.rotatey = h/2;
			return;
		}
		w=0;
		h=0;
		var k=null,w1,h1;
		for(k in s.childList){
			if(s.childList[k].getWidth){
				w1=s.childList[k].getWidth();
				w = w < w1?w1:w;
			}
			if(s.childList[k].getHeight){
				h1=s.childList[k].getHeight();
				h = h < h1?h1:h;
			}
		}
		s.rotatex = w/2;
		s.rotatey = h/2;
	},
	getWidth:function(){
		var s=this;
		var v=s.graphics.getWidth(),v1=0,k=null;
		for(k in s.childList){
			if(s.childList[k].getWidth){
				v1=s.childList[k].getWidth();
				v = v < v1?v1:v;
			}
		}
		return v;
	},
	getHeight:function(){
		var s=this;
		var v=s.graphics.getHeight(),v1=0,k=null;
		for(k in s.childList){
			if(s.childList[k].getHeight){
				v1=s.childList[k].getHeight();
				v = v < v1?v1:v;
			}
		}
		return v;
	},
	startX:function(){
		var s=this;
		var v=s.x + s.graphics.startX(),v1;
		for(k in s.childList){
			if(s.childList[k].startX){
				v1=s.x + s.childList[k].startX();
				v = v > v1?v1:v;
			}
		}
		return v;
	},
	startY:function(){
		var s=this;
		var v=s.y + s.graphics.startY(),v1;
		for(k in s.childList){
			if(s.childList[k].startY){
				v1=s.y + s.childList[k].startY();
				v = v > v1?v1:v;
			}
		}
		return v;
	},
	
	loopframe:function (){
		var s = this;
		var k = null;
		for(k in s.frameList){
			s.frameList[k]();
		}
	},
	addChild:function (d){
		var s  = this;
		d.parent = s;
		s.childList.push(d);
		s.resize();
	},
	removeChild:function(d){
		var s  = this;
		for(var i=0;i<s.childList.length;i++){
			if(d.objectindex == s.childList[i].objectindex){
				if(d.die)d.die();
				s.childList.splice(i,1);
				break;
			}
		}
		s.resize();
	},
	getChildAt:function(i){
		var s  = this;
		if(s.childList.length == 0 || s.childList.length <= i)return null;
		return s.childList[i];
	},
	removeChildAt:function(i){
		var s  = this;
		if(s.childList.length >= i)return;
		s.childList[i].die();
		s.childList.splice(i,1);
		s.resize();
	},
	resize:function(){
		var s  = this;
		var sx = 0,sy = 0,ex = 0,ey = 0;
		for(var i=0;i<s.childList.length;i++){
			if(sx > s.childList[i].x){
				sx = s.childList[i].x;
			}
			if(ex < s.childList[i].width + s.childList[i].x){
				ex = s.childList[i].width + s.childList[i].x;
			}
			if(sy > s.childList[i].y){
				sy = s.childList[i].y;
			}
			if(ey < s.childList[i].height + s.childList[i].y){
				ey = s.childList[i].height + s.childList[i].y;
			}
		}
		s.width = ex - sx;
		s.height = ey - sy;
	},
	removeAllChild:function(){
		var s  = this;
		for(var i=0;i<s.childList.length;i++){
			if(s.childList[i].die)s.childList[i].die();
		}
		s.childList.splice(0,s.childList.length);
		s.width = 0;
		s.height = 0;
	},
	addEventListener:function (type,listener){
		var s = this;
		if(type == LEvent.ENTER_FRAME){
			s.frameList.push(listener);
		}else if(type.indexOf("mouse")>=0){
			s.mouseList.push({listener:listener,type:type});
		}
	},
	removeEventListener:function (type,listener){
		var s = this;
		var i,length = s.frameList.length;
		for(i=0;i<length;i++){
			if(type == LEvent.ENTER_FRAME && s.frameList[i] == listener){
				s.frameList.splice(i,1);
				break;
			}
		}
		length = s.mouseList.length;
		for(i=0;i<length;i++){
			if(type == s.mouseList[i].type && s.mouseList[i].listener == listener){
				s.mouseList.splice(i,1);
				break;
			}
		}
	},
	mouseEvent:function (e,type,cd){
		if(e==null || e == UNDEFINED)return false;
		if(cd==null)cd={x:0,y:0,scaleX:1,scaleY:1,alpha:1,rotate:0};
		var s = this;
		if(!s.mouseChildren)return false;
		var i,k,ox,oy;
		if(e.offsetX == UNDEFINED){
			ox = e.touches[0].pageX;
			oy = e.touches[0].pageY;
		}else{
			ox = e.offsetX;
			oy = e.offsetY;
		}
		for(k=s.childList.length-1;k>=0;k--){
			if(s.childList[k].mouseEvent){
				i = s.childList[k].mouseEvent(e,type,{x:s.x+cd.x,y:s.y+cd.y,scaleX:cd.scaleX*s.scaleX,scaleY:cd.scaleY*s.scaleY,alpha:cd.alpha*s.alpha});
				if(i)return true;
			}
		}
		if(s.mouseList.length == 0){
			return false;
		}
		var i = s.ismouseon(e, cd);
		if(i){
			for(k in s.mouseList){
				var o = s.mouseList[k];
				if(o.type == type){
					e.selfX = ox - (s.x+cd.x);
					e.selfY = oy - (s.y+cd.y);
					e.clickTarget = s;
					o.listener(e,s);
					return true;
				}
			}
			return false;
		}else{
			return false;
		}
	},
	ismouseon:function(e,cd){
		var s = this;
		if(!s.visible || e==null)return false;
		var k = null,i=false,l=s.childList;
		var sc={x:s.x+cd.x,y:s.y+cd.y,scaleX:cd.scaleX*s.scaleX,scaleY:cd.scaleY*s.scaleY,alpha:cd.alpha*s.alpha};
		for(k=l.length-1;k>=0;k--){
			if(l[k].ismouseon)i = l[k].ismouseon(e,sc);
			if(i)break;
		}
		if(!i && s.graphics)i = s.graphics.ismouseon(e,sc);
		return i;
	},
	die:function (){
		var s = this;
		s.graphics.clear();
		s.frameList.splice(0,s.frameList.length);
		s.mouseList.splice(0,s.mouseList.length);
		var k = null,l=s.childList;
		for(k in l){
			if(l[k].die)l[k].die();
		}
	},

};
for(var k in p)LSprite.prototype[k]=p[k];


/*
* LTextFieldType
**/
var LTextFieldType = function (){};
LTextFieldType.type = "LTextFieldType";
LTextFieldType.INPUT = "input";


/*
* LTextField
**/
function LTextField(){
	base(this,LDisplayObject,[]);
	var s = this;
	s.type = "LTextField";
	s.texttype = null;
	s.x = 0;
	s.y = 0;
	s.text = "";
	s.font = "utf-8";
	s.size = "11";
	s.color = "#000000";
	s.weight = "normal";
	s.textAlign = "left";
	s.textBaseline = "top";
	s.lineWidth = 1;
	s.width = 150;
	s.height = 20;
	s.stroke = false;
	s.visible=true;
	s.scaleX=1;
	s.sclaeY=1;
	s.alpha=1;
	s.rotate=0;
}

p = {
	show:function (cood){
		if(cood==null)cood={x:0,y:0,scaleX:1,scaleY:1,alpha:1,rotate:0};
		var s = this,c = LGlobal.canvas,rotateFlag = Math.PI / 180;
		if(!s.visible)return;
		s.save = false;
		if(s.alpha*cood.alpha < 1){
			c.save();
			s.save = true;
			c.globalAlpha = s.alpha*cood.alpha;
		}
		c.font = s.weight + " " + s.size+"pt "+s.font;  
		c.textAlign = s.textAlign;
		c.textBaseline = s.textBaseline;
		c.lineWidth = s.lineWidth;  
		if(s.filters){
			if(!s.save)c.save();
			s.save = true;
			s.setShadow();
		}

		if(s.scaleX*cood.scaleX != 1 || s.scaleY*cood.scaleY != 1){
			if(!s.save)c.save();
			s.save = true;
			c.translate(cood.x + s.x + c.measureText(s.text).width*0.5, cood.y + s.y + s.size*0.5);
			c.scale(s.scaleX*cood.scaleX,s.scaleY*cood.scaleY);
			c.translate(-(cood.x + s.x + c.measureText(s.text).width*0.5), -(cood.y + s.y + s.size*0.5));
		}
	    if(s.stroke){
		    c.strokeStyle = s.color;
	    	c.strokeText(s.text,parseFloat(cood.x) + parseFloat(s.x),
	    		parseFloat(cood.y) + parseFloat(s.y),
	    		c.measureText(s.text).width);  
	    }else{
		    c.fillStyle = s.color;
	    	c.fillText(s.text,parseFloat(cood.x) + parseFloat(s.x),
		    		parseFloat(cood.y) + parseFloat(s.y),
		    		c.measureText(s.text).width);
	    }
		if(s.save){
			c.restore();
		}
	},	
	mouseEvent:function (event,type,cood){
		if(cood==null)cood={x:0,y:0};
		var s = this;
		if(s.inputBackLayer == null)return;
		s.inputBackLayer.mouseEvent(event,type,{x:s.x+cood.x,y:s.y+cood.y});
	},
	getWidth:function(){
		var s = this;
	    LGlobal.canvas.font = s.size+"pt "+s.font;
		return LGlobal.canvas.measureText(s.text).width;
	},
	callParent:function(function_name,args){
		args.callee[SUPER][function_name].call(this);
	}
};
for(var k in p)LTextField.prototype[k]=p[k];


/*
* LLabel
**/
function LLabel(){
	var s = this;
	base(s,LTextField,[]);
	s.width = LGlobal.width;
}



