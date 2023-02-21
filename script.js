// Get elements from the HTML
const albumArt = document.getElementById('album-art');
const songTitle = document.getElementById('song-title');
const artistName = document.getElementById('artist-name');
const playlist = document.getElementById('playlist');
const previousButton = document.getElementById('previous-button');
const playButton = document.getElementById('play-button');
const nextButton = document.getElementById('next-button');
const trackSlider = document.getElementById('track-slider');
const volumeSlider = document.getElementById('volume-slider');
const trackTimeLabel = document.getElementById('track-time');

// Create an audio object and set the source to the first song in the playlist
const audio = new Audio();
audio.src = playlist.children[0].getAttribute('data-src');

// Set the initial values for the player state
let isPlaying = false;
let currentTrack = 0;
let trackTime = 0;

// Set up the play button to toggle between play and pause
playButton.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause();
    playButton.innerHTML = '&#9654;';
  } else {
    audio.play();
    playButton.innerHTML = '&#10074;&#10074;';
  }
  isPlaying = !isPlaying;
});

// Set up the track slider to update the audio position when dragged
trackSlider.addEventListener('input', () => {
  const newPosition = audio.duration * (trackSlider.value / 100);
  audio.currentTime = newPosition;
});

// Set up the audio to update the track slider position and track time as it plays
audio.addEventListener('timeupdate', () => {
  const position = audio.currentTime / audio.duration;
  trackSlider.value = position * 100;
  trackTime = audio.currentTime;
  trackTimeLabel.innerHTML = formatTime(trackTime) + ' / ' + formatTime(audio.duration);
});

// Set up the audio to play the next track in the playlist when the current track ends
audio.addEventListener('ended', () => {
  currentTrack++;
  if (currentTrack >= playlist.children.length) {
    currentTrack = 0;
  }
  const nextTrack = playlist.children[currentTrack];
  audio.src = nextTrack.getAttribute('data-src');
  songTitle.innerHTML = nextTrack.innerHTML;
  artistName.innerHTML = nextTrack.getAttribute('data-artist');
  albumArt.src = nextTrack.getAttribute('data-art');
  audio.play();
  playButton.innerHTML = '&#10074;&#10074;';
  isPlaying = true;
});

// Set up the previous button to play the previous track in the playlist
previousButton.addEventListener('click', () => {
  currentTrack--;
  if (currentTrack < 0) {
    currentTrack = playlist.children.length - 1;
  }
  const previousTrack = playlist.children[currentTrack];
  audio.src = previousTrack.getAttribute('data-src');
  songTitle.innerHTML = previousTrack.innerHTML;
  artistName.innerHTML = previousTrack.getAttribute('data-artist');
  albumArt.src = previousTrack.getAttribute('data-art');
  audio.play();
  playButton.innerHTML = '&#10074;&#10074;';
  isPlaying = true;
});

// Set up the next button to play the next track in the playlist
nextButton.addEventListener('click', () => {
  currentTrack++;
  if (currentTrack >= playlist.children.length) {
    currentTrack = 0;
  }
  const nextTrack = playlist.children[currentTrack];
  audio.src = nextTrack.getAttribute('data-src');
  songTitle.innerHTML = nextTrack.innerHTML;
  artistName.innerHTML = nextTrack.getAttribute('data-artist');
  albumArt.src = nextTrack.getAttribute('data-art');
  audio.play();
  playButton.innerHTML = '&#10074;&#10074;';
  isPlaying = true;

});

// Set up the volume slider to update the audio volume when dragged
volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value / 100;
  });
  
  // Format the time in seconds as minutes and seconds
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    return minutes + ':' + formattedSeconds;
  }
  