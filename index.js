var points = 0;
var hz = 1;
var hp = 1;

function start(){
    document.getElementById('start').style.display = 'none';
    setInterval(game, 1000 / hz);
    setInterval(health, 25 / hp);
}

function game(){
    let element = createBall();
    let vector = direction();
    setInterval(moveBall, 0.1, element, vector);
}

function health(){
    let style = window.getComputedStyle(document.getElementsByClassName('bar')[0]);
    let value = style.getPropertyValue("right").replace("px", "");
    document.getElementsByClassName('bar')[0].style.right = (Number(value) + 1) + "px";
    if (value > 400){
        window.location.href = "lose.html";
    }
}

function createBall(){
    let createdElement = document.createElement("div");
    createdElement.style.left = Math.floor(Math.random() * 800) + 350 + "px";
    createdElement.classList.add("ball");
    createdElement.style.background = "#" + ((1<<24)*Math.random() | 0).toString(16);
    document.getElementsByClassName('container')[0].appendChild(createdElement);
    createdElement.addEventListener("click", function (){shoot(createdElement)});
    return createdElement;
}

function shoot(element) {
    element.remove();
    points++;
    document.getElementsByClassName('points')[0].innerHTML = "Score: " + points;
    let style = window.getComputedStyle(document.getElementsByClassName('bar')[0]);
    let value = style.getPropertyValue("right").replace("px", "");
    document.getElementsByClassName('bar')[0].style.right = (Number(value) - 40) + "px";
    if (value < 0){
        document.getElementsByClassName('bar')[0].style.right = "0px";
    }


}
function moveBall(element, vector){
    let style = window.getComputedStyle(element);
    let y = style.getPropertyValue("bottom").replace("px", "");
    let x = style.getPropertyValue("left").replace("px", "");
    if ((Number(y) < -1)||(Number(y) > 700)){
        vector['y'] *= -1;
    }
    if ((Number(x) < 0)||(Number(x) > 1400)){
        vector['x'] *= -1;
    }
    element.style.bottom = (Number(y) + vector['y']) + "px";
    element.style.left = (Number(x) + vector['x']) + "px";
}

function direction(){
    let deg = Math.floor(Math.random() * 7);
    let vector = {
        x: 0,
        y: 1
    };
    if (deg === 0){
        vector['x'] = -1;
        vector['y'] = 0.5;
    }
    else if (deg === 1){
        vector['x'] = -1;
    }
    else if (deg === 2){
        vector['x'] = -0.5;
        vector['y'] = 1;
    }
    else if (deg === 3){
        vector['x'] = 0 ;
    }
    else if (deg === 4){
        vector['x'] = 0.5;
        vector['y'] = 1;
    }
    else if (deg === 5){
        vector['x'] = 1;
    }
    else if (deg === 6){
        vector['x'] = 1;
        vector['y'] = 0.5;
    }
    return vector;
}

function lost(){
    window.location.href = "floating-balls.html";
}

function openClose(){
    let ele = document.getElementsByClassName('options')[0];
    if (ele.style.display === "none"){
        ele.style.display = 'block';
    } else  {
        ele.style.display = 'none';
    }
}

function save(){
    hz = document.getElementById('hz').value;
    hp = document.getElementById('hp').value;
}

function home(){
    window.location.replace("index.html");
}