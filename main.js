function switchshop(shop) {
    if (shop == "shop") {
        document.getElementById('SpezialShop').style.display = 'block';
        document.getElementById('Shop').style.display = 'none';
    } else {
        document.getElementById('SpezialShop').style.display = 'none';
        document.getElementById('Shop').style.display = 'block';
    }

}

let cookieclicks = 0;
let clicker = 0;
let Omas = 0;
let Autoclickercost = 10;
let Omacost = 60;

let multicost = 100000;
let nummutli = 0;

if (localStorage.getItem("Autoclickercost") <= 10) {
    Autoclickercost = 10;
}
if (localStorage.getItem("Omacost") <= 60) {
    Omacost = 60;
}




function check() {
    if (cookieclicks >= Autoclickercost) {
        document.getElementById('clicker').style.backgroundColor = "red";
    } else {
        document.getElementById('clicker').style.backgroundColor = "grey";
    }
    if (cookieclicks >= Omacost) {
        document.getElementById('oma').style.backgroundColor = "red";
    } else {
        document.getElementById('oma').style.backgroundColor = "grey";
    }
    if (nummutli < 1024) {
        if (cookieclicks >= multicost) {
            document.getElementById('multi').style.backgroundColor = "red";
        } else {
            document.getElementById('multi').style.backgroundColor = "grey";
        }
    }
}

function getcookies() {
    if (nummutli == 0) {
        cookieclicks++;
    } else { //multi upgrade
        cookieclicks = cookieclicks + 1 * nummutli;
    }
    if (cookieclicks == 1) {
        document.getElementById('clicks').innerHTML = cookieclicks + ' Cookie';
    } else {
        document.getElementById('clicks').innerHTML = cookieclicks + ' Cookies';
    }

    localStorage.setItem("Cookies", cookieclicks);
    check();

}

function buyone(item) {
    if (item == 'clicker') {
        if (cookieclicks >= Autoclickercost) {
            clicker++;
            cookieclicks -= Autoclickercost;
            if (Autoclickercost < 100) {
                Autoclickercost = Autoclickercost + 10;

            } else {
                Autoclickercost = Autoclickercost + 100;

            }
            document.getElementById(item).innerHTML = clicker + ' Autoclicker' + ' <br> cost: ' + Autoclickercost;
            localStorage.setItem("Autoclicker", clicker);

            document.getElementById('clicks').innerHTML = cookieclicks + ' Cookies';
            localStorage.setItem("Cookies", cookieclicks);
            localStorage.setItem("Autoclickercost", Autoclickercost);
        }

    }
    if (item == 'oma') {
        if (cookieclicks >= Omacost) {
            Omas++;
            cookieclicks -= Omacost;
            if (Omacost < 100) {
                Omacost = Omacost + 10;

            } else {
                Omacost = Omacost + 100;

            }
            document.getElementById(item).innerHTML = Omas + ' Oma' + ' <br> cost: ' + Omacost;
            localStorage.setItem("Omas", Omas);

            document.getElementById('clicks').innerHTML = cookieclicks + ' Cookies';
            localStorage.setItem("Cookies", cookieclicks);
            localStorage.setItem("Omacost", Omacost);
        }
    }
    if (item == "multi") {
        if (nummutli < 1024) {
            if (cookieclicks >= multicost) {
                if (nummutli == 0) {
                    nummutli = 2;
                } else {
                    nummutli = nummutli * 2;
                }
                cookieclicks -= multicost
                multicost = multicost * 10
                document.getElementById(item).innerHTML = 'Klick Multiplikator x' + nummutli * 2 + ' <br> cost: ' + multicost;
                if (nummutli == 1024) {
                    document.getElementById(item).innerHTML = 'Klick Multiplikator x1024' + ' <br> cost: Maximum';
                    document.getElementById('multi').style.backgroundColor = "lime";

                }
                localStorage.setItem("multi", nummutli);

                document.getElementById('clicks').innerHTML = cookieclicks + ' Cookies';
                localStorage.setItem("Cookies", cookieclicks);
                localStorage.setItem("multicost", multicost);
            }
        }
    }
    check();

}

function Autoclickerupdate() {
    cookieclicks = parseInt(cookieclicks) + parseInt(clicker); //Cookies plus anzahl der Autoclicker alle 10 Sekunden
    document.getElementById('clicks').innerHTML = cookieclicks + ' Cookies';
    localStorage.setItem("Cookies", cookieclicks);
    check();
    setInterval(Autoclickerupdate, 10000)
}

function Omaupgrade() {
    cookieclicks = parseInt(cookieclicks) + parseInt(Omas) * 2; //Cookies mal anzahl der Omas alle 20 Sekunden
    document.getElementById('clicks').innerHTML = cookieclicks + ' Cookies';
    localStorage.setItem("Cookies", cookieclicks);
    check();
    setInterval(Omaupgrade, 20000)
}

function resetscreen() {
    resetload = document.getElementById('resetload')
    resetload.style.display = 'block'
    eat = document.getElementById('eating')

    const bing = new Audio("bite.mp3");
    const yay = new Audio("yay.mp3")

    setTimeout(function() {
        bing.play()
        eat.style.display = 'block'
        eat.innerHTML = 'Der erste Cookie wurde <br> gegessen'
    }, 3000)
    setTimeout(function() {
        bing.play()
        eat.innerHTML = 'Die Cookie werden <br> gegessen'
        setTimeout(function() {
            eat.innerHTML = 'Die Cookie werden <br> gegessen.'
        }, 500)
        setTimeout(function() {
            eat.innerHTML = 'Die Cookie werden <br> gegessen..'
        }, 1000)
        setTimeout(function() {
            eat.innerHTML = 'Die Cookie werden <br> gegessen...'
        }, 1500)
    }, 6000)
    setTimeout(function() {
        yay.play()
        eat.innerHTML = 'Der letzte Cookie wurde <br> gegessen'
    }, 9000)
    setTimeout(function() {

        location.reload()
    }, 14000)
}

function reset() {
    document.getElementById('resetbutton').style.display = 'none'
    document.getElementById('question').style.display = 'block'
}

function choose(anwser) {
    if (anwser == "yes") {
        if (typeof localStorage.getItem("Cookies") !== 'undefined' && localStorage.getItem("Cookies") !== null && isNaN(localStorage.getItem("Cookies")) === false) {
            cookieclicks = localStorage.setItem("Cookies", 0);
        }
        if (typeof localStorage.getItem("Autoclicker") !== 'undefined' && localStorage.getItem("Autoclicker") !== null && isNaN(localStorage.getItem("Autoclicker")) === false) {
            clicker = localStorage.setItem("Autoclicker", 0);
        }

        if (typeof localStorage.getItem("Autoclickercost") !== 'undefined' && localStorage.getItem("Autoclickercost") !== null && isNaN(localStorage.getItem("Autoclickercost")) === false) {
            Autoclickercost = localStorage.setItem("Autoclickercost", 10);
        }
        if (typeof localStorage.getItem("Omas") !== 'undefined' && localStorage.getItem("Omas") !== null && isNaN(localStorage.getItem("Omas")) === false) {
            Autoclickercost = localStorage.setItem("Omas", 0);
        }
        if (typeof localStorage.getItem("Omacost") !== 'undefined' && localStorage.getItem("Omacost") !== null && isNaN(localStorage.getItem("Omacost")) === false) {
            Omacost = localStorage.setItem("Omacost", 60);
        }
        if (typeof localStorage.getItem("multi") !== 'undefined' && localStorage.getItem("multi") !== null && isNaN(localStorage.getItem("multi")) === false) {
            nummutli = localStorage.setItem("multi", 0);
        }
        if (typeof localStorage.getItem("multicost") !== 'undefined' && localStorage.getItem("multicost") !== null && isNaN(localStorage.getItem("multicost")) === false) {
            multicost = localStorage.setItem("multicost", 100000);
        }
        resetscreen()
    } else {
        document.getElementById('question').style.display = 'none'
        document.getElementById('resetbutton').style.display = 'block'

    }
}



function load() {
    if (typeof localStorage.getItem("Cookies") !== 'undefined' && localStorage.getItem("Cookies") !== null && isNaN(localStorage.getItem("Cookies")) === false) {
        cookieclicks = localStorage.getItem("Cookies");
    }
    if (typeof localStorage.getItem("Autoclicker") !== 'undefined' && localStorage.getItem("Autoclicker") !== null && isNaN(localStorage.getItem("Autoclicker")) === false) {
        clicker = localStorage.getItem("Autoclicker");
    }
    if (typeof localStorage.getItem("Omas") !== 'undefined' && localStorage.getItem("Omas") !== null && isNaN(localStorage.getItem("Omas")) === false) {
        Autoclickercost = localStorage.getItem("Autoclickercost");
    }
    if (typeof localStorage.getItem("Omacost") !== 'undefined' && localStorage.getItem("Omacost") !== null && isNaN(localStorage.getItem("Omacost")) === false) {
        Omacost = localStorage.getItem("Omacost");
    }
    if (typeof localStorage.getItem("multi") !== 'undefined' && localStorage.getItem("multi") !== null && isNaN(localStorage.getItem("multi")) === false) {
        nummutli = localStorage.getItem("multi");
    }
    if (typeof localStorage.getItem("multicost") !== 'undefined' && localStorage.getItem("multicost") !== null && isNaN(localStorage.getItem("multicost")) === false) {
        multicost = localStorage.getItem("multicost");
    }
    cookieclicks = parseInt(cookieclicks)
    clicker = parseInt(clicker)
    Autoclickercost = parseInt(Autoclickercost)
    Omacost = parseInt(Omacost)
    nummutli = parseInt(nummutli)
    multicost = parseInt(multicost)
    document.getElementById('clicks').innerHTML = cookieclicks + ' Cookies';
    document.getElementById('clicker').innerHTML = clicker + ' Autoclicker' + ' <br> cost: ' + Autoclickercost;
    document.getElementById('oma').innerHTML = Omas + ' Oma' + ' <br> cost: ' + Omacost;
    document.getElementById('multi').innerHTML = 'Klick Multiplikator x' + nummutli * 2 + ' <br> cost: ' + multicost;
    Autoclickerupdate();
    Omaupgrade();



}