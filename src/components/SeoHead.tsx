import { useEffect } from 'react';
import { useCms } from '../context/CmsContext';

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface SeoHeadProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  breadcrumbs?: BreadcrumbItem[];
  structuredData?: Record<string, unknown>[];
  noIndex?: boolean;
}

function setMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLinkTag(rel: string, href: string, extra?: Record<string, string>) {
  const selector = extra?.hreflang
    ? `link[rel="${rel}"][hreflang="${extra.hreflang}"]`
    : `link[rel="${rel}"]`;
  let el = document.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (extra) {
      Object.entries(extra).forEach(([k, v]) => el!.setAttribute(k, v));
    }
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function SeoHead({
  title,
  description,
  keywords,
  image,
  type = 'website',
  breadcrumbs,
  structuredData = [],
  noIndex = false,
}: SeoHeadProps) {
  const { cms } = useCms();

  useEffect(() => {
    const origin = window.location.origin;
    const pathname = window.location.pathname;
    const canonicalUrl = `${origin}${pathname}`;
    const resolvedImage = image
      ? image.startsWith('http')
        ? image
        : `${origin}${image}`
      : `${origin}/src/assets/images/fleet_sprinter_minibus_1795480224514.jpg`;

    document.title = title;
    setMetaTag('name', 'description', description);
    if (keywords) {
      setMetaTag('name', 'keywords', keywords);
    }
    setMetaTag(
      'name',
      'robots',
      noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );

    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', resolvedImage);
    setMetaTag('property', 'og:site_name', cms.seoGlobal.siteName);

    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', resolvedImage);

    setLinkTag('canonical', canonicalUrl);
    setLinkTag('alternate', canonicalUrl, { hreflang: 'es-PE' });
    setLinkTag('alternate', `${canonicalUrl}?lang=en`, { hreflang: 'en' });
    setLinkTag('alternate', `${canonicalUrl}?lang=pt`, { hreflang: 'pt' });
    setLinkTag('alternate', canonicalUrl, { hreflang: 'x-default' });

    const localBusinessSchema: Record<string, unknown> = {
      '@type': 'LocalBusiness',
      '@id': `${origin}/#organization`,
      name: cms.contact.brandName,
      legalName: cms.contact.legalName,
      url: origin,
      telephone: cms.contact.phoneDisplay,
      email: cms.contact.email,
      image: resolvedImage,
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: cms.contact.address,
        addressLocality: cms.contact.district,
        addressRegion: 'Lima',
        addressCountry: 'PE',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: cms.contact.lat,
        longitude: cms.contact.lng,
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '184',
        bestRating: '5',
      },
      sameAs: [
        cms.contact.facebookUrl,
        cms.contact.instagramUrl,
        cms.contact.linkedinUrl,
      ].filter(Boolean),
    };

    const graph: Record<string, unknown>[] = [localBusinessSchema];

    if (breadcrumbs && breadcrumbs.length > 0) {
      graph.push({
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((b, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: b.name,
          item: `${origin}${b.path}`,
        })),
      });
    }

    structuredData.forEach((item) => {
      graph.push(item);
    });

    const jsonLdId = 'juvasa-dynamic-jsonld';
    let scriptEl = document.getElementById(jsonLdId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = jsonLdId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': graph,
    });
  }, [title, description, keywords, image, type, breadcrumbs, structuredData, noIndex, cms]);

  return null;
}
