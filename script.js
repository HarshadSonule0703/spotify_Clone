console.log("let's write javaScript");
let currentSong = new Audio();

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

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
            songs.push(element.href.split("/songss/")[1])
        }  
    }
    return songs;
    
}

const playMusic =(track, pause = false)=>{
    currentSong.src = "songss/" + track
    if(!pause){
        currentSong.play().catch(err => console.error("Audio Error:", err));
         play.src  = "pause.svg"
    }
   
    document.querySelector(".songinfo").innerHTML = decodeURI(track); 
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
    // console.log(track)
    // console.log(document.querySelector("songtime").innerHTML = "00:00 / 00:00")
}

async function main(){
   

    //get the list of all song
    let songs = await getSongs()
    playMusic(songs[0])
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
    playMusic(songs[0], true)

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
   //listen for time update
   currentSong.addEventListener("timeupdate", ()=>{
    console.log(currentSong.currentSong , currentSong.duration);
    document.querySelector(".songtime").innerHTML =
     `${secondsToMinutesSeconds(currentSong.currentTime)}/${
        secondsToMinutesSeconds(currentSong.duration)}`

        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 +"%";
   })
   
   //add an event listner to seekbar
   document.querySelector(".seekbar").addEventListener("click", e => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = ((currentSong.duration) * percent) / 100
   })

   //add an event listner for hamburger
   document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0"

   })

}

main()
