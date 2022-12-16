export default class ModeHompageBanner {
  constructor() {
    this.$this = $('.mod-homepage-banner')
    this.$iframe = this.$this.find('.video-container iframe')
  }
  init() {
    if (this.$this.length && this.$iframe.length) {
      this.generateIframe()
    }
  }
  getYouTubeVideoIdFromUrl(url) {
    // Our regex pattern to look for a youTube ID
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    //Match the url with the regex
    const match = url.match(regExp);
    //Return the result
    const videoId = match && match[2].length === 11 ? match[2] : undefined
    return `//www.youtube.com/embed/${videoId}?autoplay=1&autohide=1&showinfo=0&modestbranding=1&controls=0&mute=1&rel=0&enablejsapi=1&loop=1&playlist=${videoId}`
  }

  getVimeoIdFromUrl (url) {
    let videoUrl = null
    // Look for a string with 'vimeo', then whatever, then a
    // forward slash and a group of digits.
    const match = /vimeo.*\/(\d+)/i.exec(url);
    // If the match isn't null (i.e. it matched)
    if (match) {
      // The grouped/matched digits from the regex
      const videoId = match[1]
      videoUrl = `https://player.vimeo.com/video/${videoId}?&autoplay=1&loop=1&title=0&byline=0&portrait=0&muted=1&controls=0`
    }
    return videoUrl
  }

  generateIframe() {
    let src = ''
    const dataSrc = this.$iframe.data('src')
    if (dataSrc.includes('vimeo')) {
      src = this.getVimeoIdFromUrl(dataSrc)
      this.$iframe.addClass('vimeo')
    } else {
      if (dataSrc.includes('youtu.be')) {
        src = this.getYouTubeVideoIdFromUrl(dataSrc)
      }
    }
    this.$iframe.removeAttr('data-src').attr('src', src)
  }
}
new ModeHompageBanner().init()