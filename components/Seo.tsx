import Head from 'next/head';

interface SeoProps {
  title: string;
}

export default function Seo({ title }: SeoProps) {
  return (
    <Head>
      <title>{title === '' ? 'LiLac' : `${title} | LiLac`}</title>
    </Head>
  );
}
