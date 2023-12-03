let arvattava = "";
//arvattava = "testi";

let arvauksiakpl = 0;
function arvoSana(vaikeus) {
    if (vaikeus == 3) {
        while (true) {
            arvattava = sanalista[Math.floor(Math.random() * sanalista.length)];
            if (arvattava.length > 7) {
                break;
            }
        }
    } else if (vaikeus == 2) {
        while (true) {
            arvattava = sanalista[Math.floor(Math.random() * sanalista.length)];
            if (arvattava.length > 4 && arvattava.length < 8) {
                break;
            }
        }
    } else if (vaikeus == 1) {
        while (true) {
            arvattava = sanalista[Math.floor(Math.random() * sanalista.length)];
            if (arvattava.length > 0 && arvattava.length < 5) {
                break;
            }
        }
    } else {
        arvattava = sanalista[Math.floor(Math.random() * sanalista.length)];
    }

    console.log(arvattava);
    arvauksiakpl = arvattava.length + 1;

    document.getElementById("info").innerHTML = "Word length: " + arvattava.length + "<br>Guesses left: " + arvauksiakpl;
    document.getElementById("pelialue").innerHTML = "<form><label for='inputw'>Input Word:</label><br><input type='text' id='inputw' name='inputw' maxlength='" + arvattava.length + "' onkeydown='return /[a-z]/i.test(event.key)'><br><input type='button' id='submit' value='Guess word' onclick='arvaa()'></form>";
    document.getElementById("arvaukset").innerHTML = "";

}

//Kun pelaaja tekee arvauksen --> aktivoi
function arvaa() {
    let arvaus = String(document.getElementById("inputw").value);
    document.getElementById("inputw").value = "";
    arvaus = muokkaaSana(arvaus);
    if (arvaus.length == arvattava.length) {
        let arvausL = teeLista(arvaus);
        let arvattavaL = teeLista(arvattava);
        console.log(arvausL);
        tulostaArvausv2(arvausL, arvattavaL);
        arvauksiakpl--;
        document.getElementById("info").innerHTML = "Word length: " + arvattava.length + "<br>Guesses left: " + arvauksiakpl;
        if (vertaaSana(arvattava, arvaus)) {
            document.getElementById("pelialue").innerHTML = "<div class='won'> YOU WON! </div>";
        } else if (arvauksiakpl == 0) {
            document.getElementById("pelialue").innerHTML = "<div class='lost'> YOU LOST! </div> <br>The world was: " + arvattava;
        }

    }
    

}

//siistii sanan, jotta se on samassa muodossa kuin wordlist.js
function muokkaaSana(sana) {
    let tsana = String(sana);
    tsana = tsana.trim();
    tsana.toLowerCase();
    return tsana;
}

function vertaaKirjain(kirjain1, kirjain2) {
    if (kirjain1 == kirjain2) {
        return true;
    } else {
        return false;
    }
}

function vertaaSanaJaKirjain(sana, kirjain) {
    if (sana.includes(kirjain)) {
        return true;
    } else {
        return false;
    }
}

function vertaaSana(sana1, sana2) {
    if (sana1 == sana2) {
        return true;
    } else {
        return false;
    }
}

//tekee sanan kirjaimista listan tulostusta varten
function teeLista(sana) {
    let lista = [];
    let tsana = String(sana);
    for (let i = 0; i < sana.length; i++) {
        lista.push(tsana.charAt(i));
    }
    return lista;
}

function teeString(lista) {
    let sana = lista.toString();
    for (let i = 0; i < sana.length; i++) {
        sana = sana.replace(",", "");
    }
    return sana;
}

//luo taulukon ja vertaa kirjaimet ja/tai sanat. Class kertoo vertauksen tuloksen 
function tulostaArvaus(arvausSana, arvattavaSana) {
    let vastaus = "<tr>";
    for (let i = 0; i < arvausSana.length; i++) {
        if (vertaaKirjain(arvausSana[i], arvattavaSana[i])) {
            vastaus += "<th class='oikein'>" + arvausSana[i] + "</th>";
        } else if (vertaaSanaJaKirjain(arvattava, arvausSana[i])) {
            vastaus += "<th class='melkein'>" + arvausSana[i] + "</th>";
        } else {
            vastaus += "<th class='eiok'>" + arvausSana[i] + "</th>";
        }
    }
    vastaus += "</tr>"
    document.getElementById("arvaukset").innerHTML += vastaus;
}

function tulostaArvausv2(arvausSana, arvattavaSana) {
    let vastausL = [];
    let vertailuArvattava = teeString(arvattavaSana);
    let vastaus = "<tr>";
    for (let i = 0; i < arvausSana.length; i++) {
        if (vertaaKirjain(arvausSana[i], arvattavaSana[i])) {
            vastausL.push(2);
            vertailuArvattava = vertailuArvattava.replace(arvausSana[i], "");
        } else if (vertaaSanaJaKirjain(arvattava, arvausSana[i])) {
            vastausL.push(1);
        } else {
            vastausL.push(0);
        }
    }
    for (let i = 0; i < arvausSana.length; i++) {
        if (vastausL[i] == 2) {
            vastaus += "<th class='oikein'>" + arvausSana[i] + "</th>";
        } else if (vastausL[i] == 1) {
            if (vertaaSanaJaKirjain(vertailuArvattava, arvausSana[i])) {
                vastaus += "<th class='melkein'>" + arvausSana[i] + "</th>";
                vertailuArvattava = vertailuArvattava.replace(arvausSana[i], "");
            } else {
                vastaus += "<th class='eiok'>" + arvausSana[i] + "</th>";
            }

        } else {
            vastaus += "<th class='eiok'>" + arvausSana[i] + "</th>";
        }
    }
    vastaus += "</tr>"
    document.getElementById("arvaukset").innerHTML += vastaus;
}
