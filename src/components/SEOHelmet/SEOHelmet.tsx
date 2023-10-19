import { Helmet } from 'react-helmet-async';

interface SEOHelmetProps {
  title: string;
  description: string;
}

const SEOHelmet = ({ title, description }: SEOHelmetProps): JSX.Element => {
  const appendedTitle = `${title} - Handmade by Bergstedt`;
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{appendedTitle}</title>
      <meta name="description" content={description} />
      {/* End standard metadata tags */}
      {/* Facebook tags */}
      <meta property="og:title" content={appendedTitle} />
      <meta property="og:description" content={description} />
      {/* End Facebook tags */}
      {/* Twitter tags */}
      <meta name="twitter:creator" content={'Handmade by Bergstedt'} />
      <meta name="twitter:title" content={appendedTitle} />
      <meta name="twitter:description" content={description} />
      {/* End Twitter tags */}
    </Helmet>
  );
};

export default SEOHelmet;
