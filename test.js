console.log("hell")

async function getSongs(){
    let a = await fetch("/songss/")
    let response = await a.text()
    console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".preview")){
            songs.push(element.split("/songss/")[1])
        }  
    }
    // return songs;
    
}

getSongs();
console.log(songs)


// let testAudio = new Audio("songss/00-saravanan-meenatchi-2640.mp3");
// testAudio.play().catch(err => console.error("Audio Error:", err));
