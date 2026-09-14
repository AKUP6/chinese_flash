// A pure-CSS/emoji homage to the "you get no b*tches, Squidward" meme —
// no copyrighted artwork, just shapes.
export default function MemeBanner() {
  return (
    <div className="meme-banner" aria-hidden="true">
      <div className="meme-sky">
        <span className="meme-bubble b1">🫧</span>
        <span className="meme-bubble b2">🫧</span>
        <span className="meme-bubble b3">🫧</span>
        <span className="meme-coral">🌿</span>

        <div className="meme-scene">
          <div className="meme-char squidward">
            <div className="squid-head">
              <span className="squid-eye l">
                <span className="squid-pupil" />
              </span>
              <span className="squid-eye r">
                <span className="squid-pupil" />
              </span>
              <span className="squid-nose" />
            </div>
            <div className="squid-shirt" />
            <div className="squid-body" />
            <div className="squid-feet">
              <span />
              <span />
            </div>
          </div>

          <div className="meme-char spongebob">
            <div className="sponge-body">
              <span className="sponge-eye l">
                <span className="sponge-pupil" />
              </span>
              <span className="sponge-eye r">
                <span className="sponge-pupil" />
              </span>
              <span className="sponge-cheek l" />
              <span className="sponge-cheek r" />
              <span className="sponge-mouth" />
            </div>
            <div className="sponge-legs">
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
      <div className="meme-sand" />
      <p className="meme-caption">You get no b*tches, Squidward</p>
    </div>
  )
}
