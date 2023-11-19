

function arvaa() {
    console.log(sanalista)
    let arvattava = "testi";
    document.getElementById("info").innerHTML = "Sanan pituus: "+ arvattava.length;
    let arvaus = String(document.getElementById("inputw").value);
    arvaus = muokkaaSana(arvaus);
    let arvausL = teeLista(arvaus);
    let arvattavaL = teeLista(arvattava);
    console.log(arvausL);
    tulostaArvaus(arvaus, arvattavaL);
}

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

function teeLista(sana) {
    let lista = [];
    let tsana = String(sana);
    for (let i = 0; i < sana.length; i++) {
        lista.push(tsana.charAt(i));      
    }
    return lista;
}

function tulostaArvaus(sana, arvattava) {
    let vastaus = "<tr>";
    for (let i = 0; i < sana.length; i++) {
        if (vertaaKirjain(sana[i],arvattava[i])) {
            vastaus += "<th class='oikein'>"+sana[i]+"</th>"
        } else {
            vastaus += "<th class='eiok'>"+sana[i]+"</th>"
        }
        
        
    }
    vastaus += "</tr>"
    document.getElementById("arvaukset").innerHTML += vastaus;
}