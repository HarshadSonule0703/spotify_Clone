console.log("let's write javaScript");
let currentSong = new Audio();


async function getSongs(){
    let a = await fetch("http://127.0.0.1:5500/songss/")
    let response = await a.text()
    console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".preview")){
            songs.push(element.href.split("/songss/")[1])
        }  
    }
    return songs;
    
}

const playMusic =(track)=>{
    currentSong.src = "/songss/" + track
    currentSong.play()
    play.src  = "pause.svg"
}

async function main(){


    //get the list of all song
    let songs = await getSongs()
    console.log(songs)
    //show all the songs in the playlist
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML +`<li>
                            <img class="invert" src="music.svg" alt="">
                            <div class="info">
                                <div class="songName"> ${song.replaceAll("%20", " ").replaceAll("/.preview", " ")}</div>
                                <div class="songArtist">Hashad</div>
                            </div>
                            <div class="playnow">
                                <span>Play now</span>
                                <img id="playsvg" src="play.svg" alt=""></div>
                            </div> </li>`;
    }

    //Attach an event listner to each song
   Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
    e.addEventListener("click",element=>{
        console.log(e.querySelector(".info").firstElementChild.innerHTML)
        playMusic(e.querySelector(".info").firstElementChild.innerHTML)
    })
   })

   //attach event listner to play ,next  and previous
   play.addEventListener("click", ()=>{
    if(currentSong.paused){
        currentSong.play()
        play.src  = "pause.svg"
    }
    else{
        currentSong.pause()
        play.src = "play.svg"
    }
   })

}

main()
