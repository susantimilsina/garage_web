import { Helmet } from "react-helmet-async";
import { SITE_URL } from "../../common/constants";

const SeoHead = ({
  title,
  description,
  path = "",
  image = `${SITE_URL}/logo.png`,
  noIndex = false,
  faqSchema,
  breadcrumbItems = [],
}) => {
  const url = path ? `${SITE_URL}${path}` : SITE_URL;
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  const breadcrumbSchema =
    breadcrumbItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbItems
            .map((item, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: item.name,
              ...(item.url && { item: `${SITE_URL}${item.url}` }),
            }))
            .filter(Boolean),
        }
      : null;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SeoHead;
