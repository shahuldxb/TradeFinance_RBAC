import { CSSProperties } from 'react';
import { toAbsoluteUrl } from '@/utils';

type RabbitVideoSpinnerProps = {
  size?: number;
  label?: string;
  className?: string;
};

const RabbitVideoSpinner = ({
  size = 80,
  label = 'Loading...',
  className,
}: RabbitVideoSpinnerProps) => {
  return (
    <div
      className={`rabbit-video-spinner ${className ?? ''}`.trim()}
      style={{ '--rabbit-video-size': `${size}px` } as CSSProperties}
      role="status"
      aria-live="polite"
    >
      <video
        className="rabbit-video-spinner__video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src={toAbsoluteUrl('/media/images/FrameworkImages/Rabbit Running-alpha.webm')}
          type="video/webm"
        />
        <source
          src={toAbsoluteUrl('/media/images/FrameworkImages/Rabbit Running.webm')}
          type="video/webm"
        />
      </video>

      {label && (
        <div className="rabbit-video-spinner__label">{label}</div>
      )}

      <style>
        {`
          .rabbit-video-spinner {
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
          }

          .rabbit-video-spinner__video {
            width: var(--rabbit-video-size);
            height: var(--rabbit-video-size);
            object-fit: contain;
            background-color: transparent;

            /* 🟠 ORANGE COLOR */
            filter:
              brightness(0)
              saturate(100%)
              invert(52%)
              sepia(95%)
              saturate(2000%)
              hue-rotate(5deg)
              drop-shadow(0 0 6px rgba(255, 122, 26, 0.9))
              drop-shadow(0 0 14px rgba(255, 122, 26, 0.7))
              drop-shadow(0 0 24px rgba(255, 122, 26, 0.4));
          }

          .rabbit-video-spinner__label {
            font-size: 0.8rem;
            font-weight: 600;
            color: #ff7a1a;
            text-align: center;
          }
        `}
      </style>
    </div>
  );
};

export { RabbitVideoSpinner };
