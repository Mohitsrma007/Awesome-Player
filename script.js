console.log("welcome to spotify");

let songs = [
    {songName: "Agar Tum Mil Jao", filePath: "1.mp3", coverPath: "covers/1.jpg", index: "1"},
    {songName: "Aaye Ho Meri Zindagi Mein ", filePath: "2.mp3", coverPath: "covers/2.jpg", index: "2"},
    {songName: "Aayega maza ab barsaat ka", filePath: "3.mp3", coverPath: "covers/3.jpg", index: "3"},
    {songName: "Ab Tere Dil Mein Hum", filePath: "4.mp3", coverPath: "covers/4.jpg", index: "4"},
    {songName: "Dekha Jo Tumko[2001]", filePath: "5.mp3", coverPath: "covers/5.jpg", index: "5"},
    {songName: "Sajan Tumse Pyar", filePath: "6.mp3", coverPath: "covers/6.jpg", index: "6"},
    {songName: "Hum Tumko Nigahon Mein ", filePath: "7.mp3", coverPath: "covers/7.jpg", index: "7"},
    {songName: "Tumse Milna Baatein Karna", filePath: "8.mp3", coverPath: "covers/8.jpg", index: "8"},
    {songName: "Yeh Dua Hai Meri Rab Se", filePath: "9.mp3", coverPath: "covers/9.jpg", index: "9"},
    {songName: "Zindagi Ban Gaye Ho Tum ", filePath: "10.mp3", coverPath: "covers/10.jpg", index: "10"},
]
//INITIALIZE VARIABLES
let songIndex = 0;
let audioElement = new Audio(songs[songIndex].filePath);
let masterPlay = document.getElementById('masterPlay');
let myprogressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');



songItems.forEach((e,i)=>{
    
    e.getElementsByTagName('img')[0].src = songs[i].coverPath;
    e.getElementsByClassName('songName')[0].innerText = songs[i].songName;
    
})

const updateCurrentSongPlayButton = ()=>{
    const currentSongPlayButton = document.getElementById(`${songIndex}`);
    if(audioElement.paused){
        currentSongPlayButton.classList.add('fa-play-circle');
        currentSongPlayButton.classList.remove('fa-pause-circle');
    }else{
        currentSongPlayButton.classList.add('fa-pause-circle');
        currentSongPlayButton.classList.remove('fa-play-circle');
    }
}

//play/pause
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        updateCurrentSongPlayButton();
    }else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((e)=>{
            e.classList.remove('fa-pause-circle');
            e.classList.add('fa-play-circle');
        })
        gif.style.opacity = 0;
        updateCurrentSongPlayButton();
    }
})

audioElement.addEventListener('timeupdate',()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myprogressBar.value = progress; 
})

myprogressBar.addEventListener('change',()=>{
    audioElement.currentTime = (myprogressBar.value * audioElement.duration)/100;
})

const makeallPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((e)=>{
        e.classList.add('fa-play-circle');
        e.classList.remove('fa-pause-circle');
    })
}


Array.from(document.getElementsByClassName('songItemPlay')).forEach((e) => {
    e.addEventListener('click', (event) => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            // Play the song
            makeallPlays();
            songIndex = parseInt(event.target.id);
            event.target.classList.remove('fa-play-circle');
            event.target.classList.add('fa-pause-circle');
            audioElement.src = `${songIndex + 1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
        } else {
            // Pause the song
            
            event.target.classList.add('fa-play-circle');
            event.target.classList.remove('fa-pause-circle');
            audioElement.pause();
            masterPlay.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            gif.style.opacity = 0;
        }
    });
});


document.getElementById('next').addEventListener('click',()=>{
    if(songIndex >= 9){
        songIndex = 0;
    }else{
        songIndex += 1;
    }

    let getid = songIndex.toString();
    masterSongName.innerText = songs[songIndex].songName;
    makeallPlays();
    document.getElementById(`${getid}`).classList.remove('fa-play-circle');
    document.getElementById(`${getid}`).classList.add('fa-pause-circle');
    audioElement.src = `${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;     
    
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex <= 0){
        songIndex = 9;
    }else{
        songIndex -= 1;
    }
    let getid = songIndex.toString();
    masterSongName.innerText = songs[songIndex].songName;
    makeallPlays();
    document.getElementById(`${getid}`).classList.remove('fa-play-circle');
    document.getElementById(`${getid}`).classList.add('fa-pause-circle');
    audioElement.src = `${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;     
    
})

