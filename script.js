const myYear = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"]

function showMeteo(data, index, nb) {
    document.getElementById("morning").src = `http://openweathermap.org/img/wn/${data.list[index].weather[0].icon}@2x.png`
    document.getElementById("afternoon").src = `http://openweathermap.org/img/wn/${data.list[index].weather[0].icon}@2x.png`
    document.getElementById("evening").src = `http://openweathermap.org/img/wn/${data.list[index].weather[0].icon}@2x.png`
    document.getElementById("tempMorning").innerHTML = data.list[index].main.temp_min + "°"
    document.getElementById("tempAfternoon").innerHTML = data.list[index].main.temp_max + "°"
    document.getElementById("tempEvening").innerHTML = data.list[index].main.temp + "°"
    document.getElementById("windMorning").innerHTML = `<img class="miniLogo" src="img/wind.png" alt="logo vent"> ${Math.round(data.list[index].wind.speed * 3.6)}km/h`
    document.getElementById("windAfternoon").innerHTML = `<img class="miniLogo" src="img/wind.png" alt="logo vent"> ${Math.round(data.list[index].wind.speed * 3.6)}km/h`
    document.getElementById("windEvening").innerHTML = `<img class="miniLogo" src="img/wind.png" alt="logo vent"> ${Math.round(data.list[index].wind.speed * 3.6)}km/h`
    document.getElementById("humidMorning").innerHTML = `<img class="miniLogo" src="img/humidite.png" alt="logo humidité"> ${data.list[index].main.humidity}%`
    document.getElementById("humidAfternoon").innerHTML = `<img class="miniLogo" src="img/humidite.png" alt="logo humidité"> ${data.list[index].main.humidity}%`
    document.getElementById("humidEvening").innerHTML = `<img class="miniLogo" src="img/humidite.png" alt="logo humidité"> ${data.list[index].main.humidity}%`
    document.getElementById("doPrev").innerHTML = ""
    let count = 7
    for(let i = 1; i <= nb; i++){
        document.getElementById("doPrev").innerHTML +=   `<div class="row backG m-auto mb-3">
                                                            <div class="col-lg-3 col-5 h5 fw-bold text-white m-auto">
                                                                ${data.list[count].dt_txt.split(" ").shift()}
                                                            </div>
                                                            <div class="col-lg-6 col-3 h3 fw-bold text-white m-auto">
                                                                <img class="img-fluid" src="http://openweathermap.org/img/wn/${data.list[count].weather[0].icon}@2x.png" alt="Neige">
                                                            </div>
                                                            <div class="col-lg-2 col-4 fw-bold text-white text-center m-auto">
                                                                <ul class="p-0 mb-0">
                                                                    <li class="m-auto"><span class="text-info">${Math.round(data.list[count].main.temp_min)}°</span> | <span class="text-danger">${Math.round(data.list[count].main.temp_max)}°</span>
                                                                    </li>
                                                                    <li><img class="miniLogo" src="img/humidite.png" alt="logo humidité"> ${data.list[count].main.humidity}%</li>
                                                                </ul>
                                                            </div>
                                                            <div class="d-none d-lg-block col-lg-1 m-auto">
                                                                <img class="img-fluid" src="img/backArrow.png" alt="flèche vers la droite">
                                                            </div>
                                                        </div>

                                                        <div class="d-none d-lg-block line mt-3 mb-3"></div>`
        count= count + 8
        
    }
}

fetch("https://api.openweathermap.org/data/2.5/forecast?q=le%20havre&appid=6f1e6825452718c3e88507a2f82ee389&units=metric&lang=fr")
.then(response => response.json())
.then(data => {
    let j = 0
    for(let i = 0; i <= 4; i++){
        let myDate = data.list[j].dt_txt.split(" ").shift()
        document.getElementById("myDates")[i].innerHTML = myDate
        j = j + 8
    }
    showMeteo(data,0,3)
    
    document.getElementById("searchButton").addEventListener("click", () => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${document.getElementById("searchWord").value}&appid=6f1e6825452718c3e88507a2f82ee389&units=metric&lang=fr`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("myCity").innerHTML = document.getElementById("searchWord").value
            showMeteo(data,0,3)

            document.getElementById("myDates").addEventListener("click", () => {
                showMeteo(data, (Number(document.getElementById("myDates").value) - 1) * 8,3);
            })
        
            document.getElementById("myPrev").addEventListener("click", () => {
                if(document.getElementById("myPrev").value == 1)
                    showMeteo(data,0,3)
                else if(document.getElementById("myPrev"))
                    showMeteo(data,0,5)
            })
        })
    })

    document.getElementById("myDates").addEventListener("change", () => {
        showMeteo(data, (Number(document.getElementById("myDates").value) - 1) * 8,3);
    })

    document.getElementById("myPrev").addEventListener("change", () => {
        if(document.getElementById("myPrev").value == 1)
            showMeteo(data,0,3)
        else if(document.getElementById("myPrev"))
            showMeteo(data,0,5)
    })

})