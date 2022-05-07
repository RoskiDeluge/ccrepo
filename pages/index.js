import Head from 'next/head';
import { getFeaturedCards } from '../helpers/api-util';
import CardList from '../components/cards/card-list';

import React from 'react';
import NewsletterRegistration from '../components/input/newsletter-registration';

export default function HomePage({ cards }) {
  return (
    <>
      <div>
        <Head>
          <title>Casa Cards</title>
          <meta name="description" content="Who's doing what?" />
        </Head>
        <p>Replace CardList component with splash page components</p>
        {/* Refactor: No need to use getStaticProps here, just JSX and CSS to render 
        a standard splash page with SEO optimized content. Next automatically renders files 
        within /pages statically regardless if gSP or gSSP is used */}
        <NewsletterRegistration />
        <CardList items={cards} />
        {/* Rendering CardList here to test isFeatured flag and getAllCards 
        from /cards in firebase */}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const featuredCards = await getFeaturedCards();

  return {
    props: {
      cards: featuredCards,
    },
    revalidate: 1800,
  };
}
