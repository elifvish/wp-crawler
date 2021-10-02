const axios = require('axios');
const { parseStringPromise } = require('xml2js');

const { unescape } = require('./utils');

class Sitemaps {
  constructor(url) {
    this.url = url;
    this.notFound = [];
    this.data = {};
  }

  async fetch() {
    (await this._getSitemap()).forEach((e) => {
      this.data[e.loc[0]] = {
        slug: this._getSlug(e.loc[0]),
      };
    });

    await Promise.all(
      Object.keys(this.data).map(async (e) => {
        this.data[e].title = await this._getTitle(this.data[e].slug);
      })
    );

    return {
      data: this.data,
      notFound: this.notFound,
    };
  }

  async _getSitemap() {
    const { data } = await axios.get(`${this.url}/page-sitemap.xml`);
    const {
      urlset: { url },
    } = await parseStringPromise(data);
    return url;
  }

  _getSlug(url) {
    return url.replace(this.url, '').replace(/\/$/, '');
  }

  async _getTitle(slug) {
    if (slug === '') {
      return 'Home';
    }

    const { data } = await axios.get(
      `${this.url}/wp-json/wp/v2/pages?slug=${slug}`
    );

    if (!data[0]) {
      this.notFound.push(slug);
      // eslint-disable-next-line consistent-return
      return;
    }

    // eslint-disable-next-line consistent-return
    return unescape(data[0].title.rendered);
  }
}
module.exports = {
  Sitemaps,
};
