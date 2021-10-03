const Pageres = require('pageres');

class Screenshots {
  constructor(links, { delay = 2 } = {}) {
    this.url = links;
    this.pageres = new Pageres({ delay });

    this.resolutions = [
      // Top 10 resolutions from https://www.w3counter.com/globalstats.php
      '1366x768',
      '360×640',
      '1920x1080',
      '375x812',
      '360x780',
      '360x800',
      '414×896',
      '375x667',
      '1024x768',
      '360x760',
      // Sample resolutions
      '1536×864',
      // sample devices
      'iphone 5',
      'iphone 7',
      'ipad 3',
    ];

    this._setLinks();
  }

  _setLinks() {
    this.url.forEach((url) => {
      this.pageres.src(url, this.resolutions);
    });
  }

  async takeScreenshots() {
    return this.pageres.run();
  }
}

module.exports = {
  Screenshots,
};
