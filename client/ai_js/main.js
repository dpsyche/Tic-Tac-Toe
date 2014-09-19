init(30,"ttt",390,420,main);
var backLayer,chessLayer,overLayer;
var matrix = [
	[0,0,0],
	[0,0,0],
	[0,0,0]
];
var usersTurn = true;
var step = 0;


function main(){
	gameInit();
	addBoard();	
}
function gameInit(){
	initLayer();
	addEvent();
}
function initLayer(){
	backLayer = new LSprite();
	addChild(backLayer);

	chessLayer = new LSprite();
	backLayer.addChild(chessLayer);

	overLayer = new LSprite();
	backLayer.addChild(overLayer);
}
function addEvent(){
	backLayer.addEventListener(LMouseEvent.MOUSE_DOWN,onDown);
}
function onDown(){
	var mouseX,mouseY;
	mouseX = event.offsetX;
	mouseY = event.offsetY;

	var partX = Math.floor(mouseX/130);
	var partY = Math.floor(mouseY/130);
	if(matrix[partX][partY]==0){
		usersTurn=false;
		matrix[partX][partY]=-1;
		step++;
		update(partX,partY);
		
		if(win(partX,partY)){
			gameover();
			alert("Congratulations, you win!");
		}else if(isEnd()){
			gameover();
			alert("It's a tie.");
		}else{
			computerThink();
		}
	}
}

function addBoard(){
	backLayer.graphics.drawRect(10,"#303030",[0,0,390,390],true,"white");
	for(var i=0;i<3;i++){
		backLayer.graphics.drawLine(3,"#303030",[130*i,0,130*i,390]);
	}
	for(var i=0;i<3;i++){
		backLayer.graphics.drawLine(3,"#303030",[0,130*i,390,130*i]);
	}
}
function update(x,y){
	var v = matrix[x][y];
	if(v>0){
		chessLayer.graphics.drawArc(8,"#9999FF",[x*130+65,y*130+65,40,0,2*Math.PI]);
	}else if(v<0){
		chessLayer.graphics.drawLine(10,"#FF9999",[130*x+30,130*y+30,130*(x+1)-30,130*(y+1)-30]);
		chessLayer.graphics.drawLine(10,"#FF9999",[130*(x+1)-30,130*y+30,130*x+30,130*(y+1)-30]);
	}
}
function computerThink(){
	var b = best();
	var x = b.x;
	var y = b.y;
	matrix[x][y]=1;
	step++;
	update(x,y);
	
	if(win(x,y)){
		gameover();
		alert("You lost!");
	}else if(isEnd()){
		gameover();
		alert("It's a tie.");
	}
}
function isEnd(){
	return step>=9;
}
function win(x,y){
	if(Math.abs(matrix[x][0]+matrix[x][1]+matrix[x][2])==3){
		return true;
	}
	if(Math.abs(matrix[0][y]+matrix[1][y]+matrix[2][y])==3){
		return true;
	}
	if(Math.abs(matrix[0][0]+matrix[1][1]+matrix[2][2])==3){
		return true;
	}
	if(Math.abs(matrix[2][0]+matrix[1][1]+matrix[0][2])==3){
		return true;
	}
	return false;
}

function best(){
	var bestx;
	var besty;
	var bestv=0;
	for(var x=0;x<3;x++){
		for(var y=0;y<3;y++){
			if(matrix[x][y]==0){
				matrix[x][y] = 1;
				step++;
				if(win(x,y)){
					step--;
					matrix[x][y] = 0;	
					return {'x':x,'y':y,'v':1000};
				}else if(isEnd()){
					step--;
					matrix[x][y]=0;	
					return {'x':x,'y':y,'v':0};
				}else{
					var v=second().v;
					step--;
					matrix[x][y]=0;
					if(bestx==null || v>=bestv){
						bestx=x;
						besty=y;
						bestv=v;
					}
				}
			}
		}
	}
	return {'x':bestx,'y':besty,'v':bestv};
}

function second(){
	var bestx;
	var besty;
	var bestv = 0;
	for(var x=0;x<3;x++){
		for(var y=0;y<3;y++){
			if(matrix[x][y] == 0){
				matrix[x][y] = -1;
				step++;
				if(win(x,y)){
					step--;
					matrix[x][y] = 0;	
					return {'x':x,'y':y,'v':-1000};
				}else if(isEnd()){
					step--;
					matrix[x][y]=0;	
					return {'x':x,'y':y,'v':0};;
				}else{
					var v=best().v;
					step--;
					matrix[x][y]=0;
					if(bestx==null || v<=bestv){
						bestx=x;
						besty=y;
						bestv=v;
					}
				}
				
			}
		}
	}
	return {'x':bestx,'y':besty,'v':bestv};
}

function gameover(){
	backLayer.removeEventListener(LMouseEvent.MOUSE_DOWN,onDown);
	backLayer.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		chessLayer.removeAllChild();
		backLayer.removeChild(chessLayer);
		backLayer.removeChild(overLayer);
		removeChild(backLayer);
		matrix = [
			[0,0,0],
			[0,0,0],
			[0,0,0]
		];
		step = 0;
		main();
	});
}