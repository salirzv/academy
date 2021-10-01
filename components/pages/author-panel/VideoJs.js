import React from "react";
import videojs from "video.js";
import * as path from "path";
import axios from "axios";

const VideoJS = ( props ) => {

    const videoRef = React.useRef(null);
    const playerRef = React.useRef(null);
    const { options, onReady } = props;

    React.useEffect(() => {
        // make sure Video.js player is only initialized once
        if (!playerRef.current) {
            const videoElement = videoRef.current;
            if (!videoElement) return;

            const player = playerRef.current = videojs(videoElement, options, () => {
                onReady && onReady(player);
            });
        } else {
           const player = playerRef.current;
           player.src(options.sources);
        }
    }, [options]);

    // Dispose the Video.js player when the functional component unmounts
    React.useEffect(() => {
        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, []);

    return (
        <div data-vjs-player >
            <video ref={videoRef} className="video-js vjs-big-play-centered" />
        </div>
    );
}

export default VideoJS;