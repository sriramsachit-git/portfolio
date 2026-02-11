import { siteConfig } from '@/data/config';
import { Linkedin, Github } from 'lucide-react';
import styles from './SocialIcons.module.scss';

const links = [
  { href: siteConfig.social.linkedin, label: 'LinkedIn', Icon: Linkedin },
  { href: siteConfig.social.github, label: 'GitHub', Icon: Github },
];

export function SocialIcons() {
  return (
    <aside className={styles.wrapper} aria-label="Social links">
      <div className={styles.line} />
      <div className={styles.icons}>
        {links.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={styles.icon}
          >
            <Icon size={20} />
          </a>
        ))}
      </div>
    </aside>
  );
}
