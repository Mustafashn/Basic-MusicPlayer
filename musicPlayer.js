class MusicPlayer {
  constructor(musicList) {
    this.musicList = musicList;
    this.index = 0;
  }
  getMusic() {
    return this.musicList[this.index];
  }
  nextMusic() {
    this.checkIndex(1);
  }
  prevMusic() {
    this.checkIndex(0);
  }
  checkIndex(state) {
    //next
    if ((state = 1)) {
      if (this.index < this.musicList.length - 1) {
        this.index += 1;
      } else {
        this.index = 0;
      }
    }
    //prev
    else {
      if (this.index > 0) {
        this.index -= 1;
      } else {
        this.index = this.musicList.length - 1;
      }
    }
  }
}
