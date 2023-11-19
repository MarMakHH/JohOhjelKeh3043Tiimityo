let arvattava = sanalista[Math.floor(Math.random() * sanalista.length)];

//kun sivu päivittyy --> aktivoi
function sivuLataa() {
    document.getElementById("info").innerHTML = "Sanan pituus: " + arvattava.length;
    console.log(arvattava);
}

//Kun pelaaja tekee arvauksen --> aktivoi
function arvaa() {
    let arvaus = String(document.getElementById("inputw").value);
    arvaus = muokkaaSana(arvaus);
    let arvausL = teeLista(arvaus);
    let arvattavaL = teeLista(arvattava);
    console.log(arvausL);
    tulostaArvaus(arvausL, arvattavaL);
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
        console.log("tosi");
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