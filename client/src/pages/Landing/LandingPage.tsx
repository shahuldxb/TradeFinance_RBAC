import { KeyboardEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toAbsoluteUrl } from '@/utils';

const LandingPage = () => {
  const navigate = useNavigate();

  const enterApp = useCallback(() => {
    navigate('/auth/classic/login');
  }, [navigate]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      enterApp();
    }
  };

  return (
    <div
      className="landing"
      onClick={enterApp}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Enter application"
    >
      <video
        className="landing__video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source
          src={toAbsoluteUrl('/media/videos/landing.mp4')}
          type="video/mp4"
        />
      </video>

      <div className="landing__veil" aria-hidden="true" />

      <div className="landing__enter" style={{color:'#d4af37',fontFamily:'sans-serif',fontWeight:'bold'}}>Click anywhere to enter</div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Unbounded:wght@500;600;700&display=swap');

          .landing {
            position: relative;
            min-height: 100vh;
            width: 100%;
            overflow: hidden;
            cursor: pointer;
            background: radial-gradient(120% 140% at 20% 10%, #17324a 0%, #0b1220 45%, #05060b 100%);
            color: #f5f2ea;
            display: grid;
            place-items: center;
            text-align: left;
          }

          .landing:focus-visible {
            outline: 3px solid #f7b955;
            outline-offset: -3px;
          }

          .landing__video {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: saturate(120%) contrast(105%) brightness(90%);
            transform: scale(1.03);
            pointer-events: none;
            mix-blend-mode: screen;
          }

          .landing__veil {
            position: absolute;
            inset: 0;
            background: linear-gradient(115deg, rgba(5, 7, 12, 0.8) 10%, rgba(8, 19, 32, 0.55) 55%, rgba(15, 34, 48, 0.35) 100%);
          }

          .landing__enter {
            position: absolute;
            left: 0;
            right: 0;
            bottom: clamp(24px, 6vh, 56px);
            z-index: 2;
            text-align: center;
            font-family: 'Unbounded', sans-serif;
            font-size: clamp(1.4rem, 3.4vw, 2.8rem);
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.92);
            text-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
            pointer-events: none;
          }
        `}
      </style>
    </div>
  );
};

export default LandingPage;
