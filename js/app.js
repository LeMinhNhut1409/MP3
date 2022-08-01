const song = document.getElementById("song");
const playBtn = document.querySelector(".player-inner");
const nextBtn = document.querySelector(".play-forward");
const prevBtn = document.querySelector(".play-back");
const durationTime = document.querySelector(".duration");
const remainingTime = document.querySelector(".remaining");
const rangeBar= document.querySelector(".range");
const musicName = document.querySelector(".music-name");
const musicArtist = document.querySelector(".artist");
const musicImage = document.querySelector(".music-thumb img");
const musicThumbnail = document.querySelector(".music-thumb");
const playRepeat = document.querySelector(".play-repeat");
/*const musicList = document.querySelector(".music-list");
const moreMusicBtn = document.querySelector("#list-sharp");
const closeMoreMusic= musicList.querySelector("#close");
let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);*/
let isPlaying = true;
let indexSong = 0;
let isRepeat = false;

//const audios = ["ChuoiNgayVangEm-ChauKhaiPhong-3500633.mp3", "KhongTronVenNua-ChauKhaiPhongACV-7197914.mp3",
//"NgamHoaLeRoi-ChauKhaiPhong-4850041.mp3","Thuong-Em-Chau-Khai-Phong-ACV.mp3"];
const audios = [
    { 
        id: 1,
        title: "Chuỗi Ngày Vắng Em",
        artist:"Châu Khải Phong",
        file: "ChuoiNgayVangEm-ChauKhaiPhong-3500633.mp3",
        image: "image/phong.jpeg"
    },
    { 
        id: 2,
        title: "Ví Dầu Đưa Dâu",
        artist:"Duy Khiêm, Diệu Kiên",
        file: "ViDauDuaDau-DuyKhiemDieuKien-7198437.mp3",
        image: "image/dieukien.jpeg"
    },
    { 
        id: 3,
        title: "Không Trọn Vẹn Nữa",
        artist:"Châu Khải Phong",
        file: "KhongTronVenNua-ChauKhaiPhongACV-7197914.mp3",
        image: "image/phong1.jpeg"
    },
    { 
        id: 4,
        title: "Thích Thì Đến (Remix)",
        artist:"Lê Bảo Bình",
        file: "ThichThiDenAndyRemix-LeBaoBinh-6261109.mp3",
        image: "image/baobinh.jpeg"
    },
    { 
        id: 5,
        title: "Ngắm Hoa Lệ Rơi",
        artist:"Châu Khải Phong",
        file: "NgamHoaLeRoi-ChauKhaiPhong-4850041.mp3",
        image: "image/phong2.webp"
    },
    { 
        id: 6,
        title: "Ai Chung Tình Được Mãi",
        artist:"Đinh Tùng Huy",
        file: "AiChungTinhDuocMai-DinhTungHuyACV-7197858.mp3",
        image: "image/tunghuy.jpeg"
    },
    { 
        id: 7,
        title: "Thương Em",
        artist:"Châu Khải Phong",
        file: "Thuong-Em-Chau-Khai-Phong-ACV.mp3",
        image: "image/phong3.jpeg"
    },
    { 
        id: 8,
        title: "Kiếp Này Em Gả Cho Anh",
        artist:"Thái Học",
        file: "KiepNayEmGaChoAnh-ThaiHoc-7198404.mp3",
        image: "image/thaihoc.jpeg"
    }
]//danh sach nhac

let timer;
let repeatCount = 0;
//lặp lại bài hát
playRepeat.addEventListener("click", function () {
    if (isRepeat) {
    isRepeat = false;
    playRepeat.removeAttribute("style");
} else {
    isRepeat = true;
    playRepeat.style.color = "#ffb86c";
}
});
nextBtn.addEventListener("click", function(){
changeSong(1);
});
prevBtn.addEventListener("click", function(){
    changeSong(-1);
});
song.addEventListener("ended", handleEndedSong)
function handleEndedSong(){
    repeatCount++;
    if(isRepeat && repeatCount === 1)
    {
    //handle repeat song
    isPlaying = true;
    playPause();
    }
    else
    {
    changeSong(1);
    }
}
function changeSong(dir){
    if(dir === 1)
    {
        //next song
        indexSong++;
        if(indexSong >= audios.length)
        {
            indexSong = 0;
        }
        isPlaying = true;
    }
    else if(dir === -1)
    {
        // prev song
        indexSong--;
        if(indexSong < 0)
        {
            indexSong = audios.length - 1;
        }
        isPlaying = true;
    } // thay doi nhac chuyen qua bai moi
init(indexSong)
//song.setAttribute("src", `./audio/${audios[indexSong].file}`);
playPause();
}
playBtn.addEventListener("click", playPause);
function playPause() {
    if(isPlaying){
        musicThumbnail.classList.add("is-playing");
        song.play();
        playBtn.innerHTML = '<ion-icon name="pause"></ion-icon>';
        isPlaying = false;
        timer = setInterval(displayTimer, 500);
    }
    else{
        musicThumbnail.classList.remove("is-playing");
        song.pause();
        playBtn.innerHTML = '<ion-icon name="play"></ion-icon>';
        isPlaying = true;
        clearInterval(timer);
    }
} //dung hoac phat nhac

function displayTimer(){
const {duration, currentTime} = song;
remainingTime.textContent = formatTimer(currentTime);
rangeBar.max = duration;
rangeBar.value = currentTime;
    if(!duration){
        durationTime.textContent = "00:00";
    } else{
        durationTime.textContent = formatTimer(duration);
    }
} // Thời gian nhạc phát
function formatTimer(number){
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes * 60);
    return `${minutes < 10 ? '0' + minutes: minutes}:${seconds < 10 ? '0' + seconds:seconds}`;
}
rangeBar.addEventListener("change", handleChangeBar);
function handleChangeBar(){
    song.currentTime = rangeBar.value;
} // Kéo thanh điều chỉnh thời gian và nhạc
function init(indexSong)
{
    song.setAttribute("src", `./audio/${audios[indexSong].file}`);
    musicImage.setAttribute("src", audios[indexSong].image);
    musicName.textContent = audios[indexSong].title;
    musicArtist.textContent = audios[indexSong].artist;
}//thay doi nhac, hinh, ten bai hat
init(indexSong); 
displayTimer();
//danh sách nhac

/*moreMusicBtn.addEventListener("click", function(){
    musicList.classList.toggle("show");
});
closeMoreMusic.addEventListener("click", function(){
    moreMusicBtn.click();
});
const ulTag = music.querySelector("ul");
  // let create li tags according to array length for list
for (let i = 0; i < allMusic.length; i++) {
    //let's pass the song name, artist from the array
    let liTag = `<li li-index="${i + 1}">
                <div class="row">
                    <span>${allMusic[i].name}</span>
                    <p>${allMusic[i].artist}</p>
                </div>
                <span id="${allMusic[i].src}" class="duration">3:40</span>
                <audio class="${allMusic[i].src}" src="aduio/${allMusic[i].src}.mp3"></audio>
                </li>`;
    ulTag.insertAdjacentHTML("beforeend", liTag); //inserting the li inside ul tag
    let liAudioDuartionTag = ulTag.querySelector(`#${allMusic[i].src}`);
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);
    liAudioTag.addEventListener("loadeddata", function(){
    let duration = liAudioTag.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
      if(totalSec < 10){ //if sec is less than 10 then add 0 before it
        totalSec = `0${totalSec}`;
    };
      liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`; //passing total duation of song
      liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`); //adding t-duration attribute with total duration value
    });
}

//play particular song from the list onclick of li tag
function playSong(){
    const allLiTag = ulTag.querySelectorAll("li");
    
    for (let j = 0; j < allLiTag.length; j++) {
      let audioTag = allLiTag[j].querySelector(".duration");
      
      if(allLiTag[j].classList.contains("playing")){
        allLiTag[j].classList.remove("playing");
        let adDuration = audioTag.getAttribute("t-duration");
        audioTag.innerText = adDuration;
      }
      //if the li tag index is equal to the musicIndex then add playing class in it
      if(allLiTag[j].getAttribute("li-index") == musicIndex){
        allLiTag[j].classList.add("playing");
        audioTag.innerText = "playing";
      }
      allLiTag[j].setAttribute("onclick", "clicked(this)");
    }
  }
  //particular li clicked function
  function clicked(element){
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex; //updating current song index with clicked li index
    loadMusic(musicIndex);
    playMusic();
    playSong();
  }*/