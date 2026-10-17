import React from 'react';

export default function DemoVideoSlot({
  title,
  videoSrc,
  posterSrc,
  captionsSrc,
  transcriptSrc,
}) {
  const hasVideo = Boolean(videoSrc);

  return <section className="demo-video-section" aria-label={`${title} technical demo video`}>
    <div className="demo-video-heading">
      <p className="demo-video-eyebrow">TECHNICAL WALKTHROUGH · 30–60 SEC</p>
      <h2>See the system in motion.</h2>
      <p>The walkthrough will show the running project, its core workflow, and real output.</p>
    </div>
    {hasVideo ? <div className="demo-video-frame">
      <video controls preload="metadata" poster={posterSrc || undefined}>
        <source src={videoSrc} type="video/mp4" />
        {captionsSrc && <track kind="captions" src={captionsSrc} srcLang="en" label="English captions" default />}
        Your browser does not support embedded video. Use the project repository to inspect the implementation.
      </video>
      {transcriptSrc && <a className="demo-transcript-link" href={transcriptSrc}>Read demo transcript</a>}
    </div> : <div className="demo-video-pending">
      <span className="demo-video-status">CAPTURE PENDING</span>
      <p>A real demo has not been recorded yet. This space is reserved for a capture from the running application; no simulated footage or screenshots are shown.</p>
    </div>}
  </section>;
}
