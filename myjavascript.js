/**
		
		This file illustrates the functions and events for making game
		interactive.It includes the functons that create the SVG elements 
		on the canvas.It also includes functions to start,stop or to quit
		the game and has a function that animates the background
		of the game.
		
		@Author: Nisarg Nayak
		
	**/

// XML namspace in svg

var svgNS = "http://www.w3.org/2000/svg";

// Declaring and initialising the global variables

var moon = document.createElementNS(svgNS,"circle");	// Create the svg element circle
var object = document.createElementNS(svgNS,"rect");	// Create the svg element rectangle
var object2 = document.createElementNS(svgNS,"circle"); // Create the svg element circle
var clock = document.createElementNS(svgNS,"text");		// Create the svg element text

var textNode;
var cx=550;		// set the x coordinate of circle
var cy=370;		// set the y coordinate of circle
var x=80;		// set the x coordinate of rectangle
var y=320;		// set the y coordinate of rectangle
var t=0;		// set the time to zero
var score=0;	// set the score to zero
var timer;		// declare the timer variable
var running;	// declare the running variable

// Set the all svg elements to the canvas when window loads.

window.addEventListener("load",function(){
	
	// Draw the night sky by setting different attributes of rectangle
	function nightSky(){
		
	sky = document.createElementNS(svgNS,"rect");
	
		sky.setAttribute("id","svgSky");
		sky.setAttribute("class","sky");
		sky.setAttribute("x","0");
		sky.setAttribute("y","0");
		sky.setAttribute("width","600");
		sky.setAttribute("height","400");
		sky.setAttribute("fill","black");
		return sky;
	}
	
	// Draw the grass by setting different attributes of rectangle
	function drawGrass(){
		var grass = document.createElementNS(svgNS,"rect");
		grass.setAttribute( "id", "svgGrass" );
		grass.setAttribute( "class", "grass" );
        grass.setAttribute( "x", "0" );
        grass.setAttribute( "y", "400" );
		grass.setAttribute("width","600");
		grass.setAttribute("height","200");
		grass.setAttribute("fill","green");
		return grass;
	}
	
	// Draw the moon by setting different attributes of circle
	function drawMoon(){
		
		moon.setAttribute("id","svgMoon");
		moon.setAttribute("class","moon");
		moon.setAttribute("cx","80");
		moon.setAttribute("cy","70");
		moon.setAttribute("r","35");
		moon.setAttribute("fill","white");
		moon.setAttribute("stroke","black");
		return moon;
		
	}
	
	// Draw the object by setting different attributes of rectangle
	function setObject(){
		
		object.setAttribute("id","svgObject");
		object.setAttribute("class","object");
		object.setAttribute("x",x);
		object.setAttribute("y",y);
		object.setAttribute("width","50");
		object.setAttribute("height","80");
		object.setAttribute("fill","red");
		return object;
		
	}
	
	// Draw the second object by setting different attributes of circle
	function setObject2(){
		
		object2.setAttribute("id","svgObject2");
		object2.setAttribute("class","object2");
		object2.setAttribute("cx",cx);
		object2.setAttribute("cy",cy);
		object2.setAttribute("r","30");
		object2.setAttribute("fill","grey");
		return object2;
		
	}
	
	// Display the countdown of time
	clock.setAttribute("x","430");
	clock.setAttribute("y","550");
	clock.setAttributeNS(null,"font-size","20");
	clock.setAttribute("fill","black");
	clock.setAttribute("stroke","black");
	t = 30;
	textNode = document.createTextNode("Remaining time: "+parseInt(t));	
	clock.appendChild(textNode);
	
	// Add all the svg elements to the Canvas
	
	svg.appendChild(nightSky());
    svg.appendChild(drawGrass());
    svg.appendChild(drawMoon());
	svg.appendChild(setObject());
	svg.appendChild(setObject2());

});

// Start the game		
function startGame(){
		
	// Start timer
	function startTimer(){
		
		let getscore = document.getElementById("scoring");
		
		timer = setInterval(function(){
			object.addEventListener("click",jump);
			t=t-1;
			textNode.textContent="Remaining time: "+t;	
			if(t<28 && t>24){
				toDay();
			}
			if(t<0){	
				
				showCustomAlert("Time Out \nYour score is: " + score);
				clearInterval(running);
				object2.setAttribute("cx","550");
				t = 30;
				score = 0;
				textNode.textContent="Remaining time: "+t;
				getscore.innerHTML=score;
				clearInterval(timer);	
			}	
		},500);
		
		return clock;		
	}
	
	// Run the object2 from right to left
	
	function run(){
		
		let getscore = document.getElementById("scoring");
		let color = document.getElementById("setcolor");
		running = setInterval(function(){
	
			distance = parseInt(object2.getAttribute("cx"))-4.5;
			object2.setAttribute("cx",distance);
			object2.setAttribute("fill",color.value);
		
			// When objects collide to each other
			
			if((object.getAttribute("y")==320)&& (object2.getAttribute("cx")==155.5)){
				
				//alert("Collission detected \n"+"Your score is: "+score);
				// Use it instead of alert
				showCustomAlert("Collision detected \nYour score is: " + score);
				resetGame();
				
			}
			
			// When player successfully jump and avoid the collission
			
			if((object.getAttribute("y") == 210) && (object2.getAttribute("cx")==105.5)){
				
				score = score +1;
				getscore.innerHTML=score;
				
			}
			
			if(distance<-20){
				
				distance = object2.setAttribute("cx",600);
			
			}
			
		},20);	
	}
	
	svg.style.display="block";
	svg.appendChild(startTimer());
	run();
}

// Make animation night to twilight to morning to evening
function toDay(){
	
	let dayToNight = setInterval(function(){
		
		// Twilight
		sky.setAttribute("fill","#8a496b");
		moon.setAttribute("fill","orange");
		
		walk = parseInt(moon.getAttribute("cx"))+5.5;
		moon.setAttribute("cx",walk);
		
		// morning
		if(walk>200 && walk<=400){
			sky.setAttribute("fill","white");
			moon.setAttribute("fill","yellow");
		}
		
		// Evening
		if(walk>400 && walk<500){
			sky.setAttribute("fill","orange");
			moon.setAttribute("fill","yellow");
		}
		
		// Night
		if(walk>500){
			moon.setAttribute("cx","80");
			sky.setAttribute("fill","black");
		}	
	},500);
} 

// make object jumped when clicked
function jump(){
	object.setAttribute("y","210");
	setTimeout(function(){
		object.setAttribute("y","320");
	},500);
}

// resets everything when two objects collide
function resetGame(){
	
	let getscore = document.getElementById("scoring");

	distance = object2.setAttribute("cx",cx);
	clearInterval(running);
	
	t=30;
	score = 0;
	getscore.innerHTML=score;
	textNode.textContent="Remaining time: "+t;
	clearInterval(timer);
	moon.setAttribute("cx",80);
}

// Stop the game at the moment
function stopGame(){
	
	clearInterval(running);
	clearInterval(timer);
	
}
function showCustomAlert(message) {
    const alertBox = document.createElement("div");
    alertBox.style.position = "fixed";
    alertBox.style.top = "40px";
    alertBox.style.left = "50%";
    alertBox.style.transform = "translate(-50%)";
    alertBox.style.backgroundColor = "white";
    alertBox.style.border = "2px solid black";
    alertBox.style.padding = "30px";
    alertBox.innerHTML = `<p>${message}</p><button onclick="this.parentElement.remove()">OK</button>`;
    document.body.appendChild(alertBox);
}

function totalExit(){
	let getscore = document.getElementById("scoring");
	distance = object2.setAttribute("cx",cx);
	clearInterval(running);
	t=30;
	textNode.textContent="Remaining time: "+t;
	clearInterval(timer);
	score = 0;
	getscore.innerHTML=score;	
	svg.style.display="none";
	
	alert("You Exit \n"+"Thanks for playing!");
}