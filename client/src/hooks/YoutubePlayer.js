// js
import React from "react";
import YouTube from "react-youtube";
class YoutubePlayer extends React.Component {
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
    console.log(event.target);
  }
  render() {
    const opts = {
      height: "350",
      width: "600",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
      },
    };

    return (
      <YouTube
        videoId={this.props.videoID}
        opts={opts}

        // onReady={this._onReady}
      />
    );
  }
}
export { YoutubePlayer };
