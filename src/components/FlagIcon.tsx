import type { MultilingualVideo } from '../data/cmsDefaults';

export function FlagIcon({ code, className = 'w-5 h-3.5' }: { code: MultilingualVideo['code']; className?: string }) {
  switch (code) {
    case 'es':
      return (
        <svg viewBox="0 0 750 500" className={`${className} rounded-[2px] shrink-0 object-cover`} aria-hidden="true">
          <rect width="750" height="500" fill="#c60b1e" />
          <rect width="750" height="250" y="125" fill="#ffc400" />
        </svg>
      );
    case 'en':
      return (
        <svg viewBox="0 0 60 30" className={`${className} rounded-[2px] shrink-0 object-cover`} aria-hidden="true">
          <clipPath id="juvasa-uk-s">
            <path d="M0,0 v30 h60 v-30 z" />
          </clipPath>
          <clipPath id="juvasa-uk-t">
            <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
          </clipPath>
          <g clipPath="url(#juvasa-uk-s)">
            <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
            <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#juvasa-uk-t)" stroke="#c8102e" strokeWidth="4" />
            <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
            <path d="M30,0 v30 M0,15 h60" stroke="#c8102e" strokeWidth="6" />
          </g>
        </svg>
      );
    case 'pt':
      return (
        <svg viewBox="0 0 720 504" className={`${className} rounded-[2px] shrink-0 object-cover`} aria-hidden="true">
          <rect width="720" height="504" fill="#009c3b" />
          <polygon points="360,46.8 673.2,252 360,457.2 46.8,252" fill="#ffdf00" />
          <circle cx="360" cy="252" r="126" fill="#002776" />
        </svg>
      );
    case 'zh':
      return (
        <svg viewBox="0 0 600 400" className={`${className} rounded-[2px] shrink-0 object-cover`} aria-hidden="true">
          <rect width="600" height="400" fill="#de2910" />
          <polygon points="100,45 113,85 155,85 121,110 134,150 100,125 66,150 79,110 45,85 87,85" fill="#ffde00" />
          <circle cx="190" cy="50" r="14" fill="#ffde00" />
          <circle cx="220" cy="85" r="14" fill="#ffde00" />
          <circle cx="220" cy="130" r="14" fill="#ffde00" />
          <circle cx="190" cy="165" r="14" fill="#ffde00" />
        </svg>
      );
    case 'fr':
      return (
        <svg viewBox="0 0 600 400" className={`${className} rounded-[2px] shrink-0 object-cover`} aria-hidden="true">
          <rect width="200" height="400" fill="#002395" />
          <rect x="200" width="200" height="400" fill="#ffffff" />
          <rect x="400" width="200" height="400" fill="#ed2939" />
        </svg>
      );
    case 'de':
      return (
        <svg viewBox="0 0 600 360" className={`${className} rounded-[2px] shrink-0 object-cover`} aria-hidden="true">
          <rect width="600" height="120" fill="#000000" />
          <rect y="120" width="600" height="120" fill="#dd0000" />
          <rect y="240" width="600" height="120" fill="#ffce00" />
        </svg>
      );
  }
}
