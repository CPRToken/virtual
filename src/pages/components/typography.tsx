import type { NextPage } from 'next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as ComponentsLayout } from 'src/layouts/components';
import { Layout as MarketingLayout } from 'src/layouts/marketing';
import { Previewer } from 'src/sections/components/previewer';


const Page: NextPage = () => {
  usePageView();

  return (
    <>
      <Seo title="Components: Typography" />
      <ComponentsLayout title="Typography">
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth="lg">
            <Previewer title="Typography">

            </Previewer>
          </Container>
        </Box>
      </ComponentsLayout>
    </>
  );
};

Page.getLayout = (page) => <MarketingLayout>{page}</MarketingLayout>;

export default Page;
