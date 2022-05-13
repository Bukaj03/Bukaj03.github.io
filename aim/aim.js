var points = 0;
function start(){
    document.getElementsByClassName('start')[0].style.display = 'none';
    setInterval(hp, 15);
    createRandomBall();
}

function createRandomBall(){
    let createdElement = document.createElement("div");
    createdElement.classList.add("ball");
    createdElement.style.left = Math.floor(Math.random() * 1440) + 30 + "px";
    createdElement.style.bottom = Math.floor(Math.random() * 650) + 30 + "px";
    createdElement.style.background = "#" + ((1<<24)*Math.random() | 0).toString(16);
    document.getElementsByClassName('container')[0].appendChild(createdElement);
    createdElement.addEventListener("click", function (){shoot(createdElement)});
    return createdElement;
}

function shoot(element){
    points ++;
    element.remove();
    createRandomBall();
    document.getElementsByClassName('points')[0].innerHTML = "Score: " + points;
    let style = window.getComputedStyle(document.getElementsByClassName('bar')[0]);
    let value = style.getPropertyValue("right").replace("px", "");
    document.getElementsByClassName('bar')[0].style.right = (Number(value) - 40) + "px";
    if (value < 0){
        document.getElementsByClassName('bar')[0].style.right = "0px";
    }
}

function hp(){
    let style = window.getComputedStyle(document.getElementsByClassName('bar')[0]);
    let value = style.getPropertyValue("right").replace("px", "");
    document.getElementsByClassName('bar')[0].style.right = (Number(value) + 1) + "px";
    if (value > 400){
        location.reload();
    }
}

function home() {
    window.location.replace("../index.html");
}