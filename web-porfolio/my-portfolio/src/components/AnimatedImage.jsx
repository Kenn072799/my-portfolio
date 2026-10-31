import { useState } from 'react';
import { motion as Motion, AnimatePresence, useReducedMotion } from 'framer-motion';
export default function AnimatedImage({ src, alt, width, height, priority = false, className = '' }) {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const reduced = useReducedMotion();
  async function reveal(event) {
    const image = event.currentTarget;
    try { await image.decode?.(); } catch { /* Loaded images may remain usable when decode fails. */ }
    if (image.naturalWidth) setReady(true);
    else setFailed(true);
  }
  return <div className={`animated-image ${className}`} style={{ aspectRatio: `${width} / ${height}` }}>
    <AnimatePresence>{!ready && !failed && <Motion.div key="skeleton" className="image-skeleton" aria-hidden="true" exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.4 }} />}</AnimatePresence>
    {failed ? <div className="image-fallback" role="img" aria-label={alt}><span>KA</span><small>Image unavailable</small></div> :
      <Motion.img src={src} alt={alt} width={width} height={height} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" onLoad={reveal} onError={() => setFailed(true)} initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.6 }} />}
  </div>;
}
