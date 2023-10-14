import type { NextPage } from 'next';
import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as MarketingLayout } from 'src/layouts/marketing';

import {HomeCaps} from 'src/sections/home/home-caps';

import { HomeHero } from 'src/sections/home/home-hero';
import { HomeCta } from 'src/sections/home/home-cta';


import { HomeSendero } from 'src/sections/home/home-sendero';

const Page: NextPage = () => {
    usePageView();

  return (
    <>


      <Seo />
      <main>
        <HomeHero />

        <HomeCaps />
        <HomeCta />
        <HomeSendero />



      </main>
    </>
  );
};

Page.getLayout = (page) => <MarketingLayout>{page}</MarketingLayout>;

export default Page;
