import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

// time update tracking function with throttling
player.on('timeupdate', throttle(onPlay, 1000));

// onPlay callback function for save player time to local storage
function onPlay({ seconds }) {
    localStorage.setItem('videoplayer-current-time', seconds);
}

// restart video from the time saved to local storage
player.setCurrentTime(localStorage.getItem('videoplayer-current-time') || 0);

// for autoplay just add src like into iframe html tag
// src = "https://player.vimeo.com/video/236203659?autoplay=1&loop=1&autopause=0&muted=1"