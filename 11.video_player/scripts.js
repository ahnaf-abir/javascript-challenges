/* Get Our Elements */
const player = document.querySelector('.player');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const ranges = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');
const fullScreenButton = player.querySelectorAll('[data-full]');
const toggle = player.querySelector('.toggle');
const video = player.querySelector('.viewer');


function togglePlayButton() {
  const method = video.paused ? 'play' : 'pause';
  video[method](); //calls the method itseld
}

function updateButton() {
  const icon = this.paused ? '>' : '||';
  console.log(icon);
  toggle.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
  console.log(video.currentTime);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function changeTiming(e) {
  const changeTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = changeTime;
}

function fullScreen(e) {
  if (this.dataset.full === 'false') {
    if (player.webkitRequestFullscreen) {
      player.webkitRequestFullscreen();
    }
  }
}

video.addEventListener('click', togglePlayButton);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlayButton);
skipButtons.forEach(button => button.addEventListener('click', skip));
fullScreenButton.forEach(button => button.addEventListener('click', fullScreen));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', changeTiming);
progress.addEventListener('mousemove', (e) => mousedown && changeTiming(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
