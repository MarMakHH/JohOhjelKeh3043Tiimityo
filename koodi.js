let arvattava = [];
//arvattava = "testi";

let arvauksiakpl = 0;
function arvoSana() {
    arvattava = sanalista[Math.floor(Math.random() * sanalista.length)];
    console.log(arvattava);
    arvauksiakpl = arvattava.length + 1;

    document.getElementById("info").innerHTML = "Sanan pituus: " + arvattava.length + "<br>Arvauksia jäljellä: " + arvauksiakpl;
    document.getElementById("pelialue").innerHTML = "<form><label for='inputw'>Input Word:</label><br><input type='text' id='inputw' name='inputw' maxlength='" + arvattava.length + "' onkeydown='return /[a-z]/i.test(event.key)'><br><input type='button' id='submit' value='arvaa' onclick='arvaa()'></form>";
    document.getElementById("arvaukset").innerHTML = "";

}

//Kun pelaaja tekee arvauksen --> aktivoi
function arvaa() {
    let arvaus = String(document.getElementById("inputw").value);
    arvaus = muokkaaSana(arvaus);
    let arvausL = teeLista(arvaus);
    let arvattavaL = teeLista(arvattava);
    console.log(arvausL);
    tulostaArvaus(arvausL, arvattavaL);
    arvauksiakpl--;
    document.getElementById("info").innerHTML = "Sanan pituus: " + arvattava.length + "<br>Arvauksia jäljellä: " + arvauksiakpl;
    if (vertaaSana(arvattava, arvaus)) {
        document.getElementById("pelialue").innerHTML = "VOITIT PELIN";
    } else if (arvauksiakpl == 0) {
        document.getElementById("pelialue").innerHTML = "HÄVISIT PELIN<br>Sana oli: " + arvattava;
    }
    document.getElementById("inputw").value = "";
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