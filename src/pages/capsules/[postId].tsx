import { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { format, subHours } from 'date-fns';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Caps } from 'src/types/caps';
import { blogApi } from 'src/api/blog';
import { BreadcrumbsSeparator } from 'src/components/breadcrumbs-separator';
import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { paths } from 'src/paths';
import { PostComment } from 'src/sections/dashboard/blog/post-comment';
import { PostCommentAdd } from 'src/sections/dashboard/blog/post-comment-add';
import { PostNewsletter } from 'src/sections/dashboard/blog/post-newsletter';
import { PostContent } from 'src/sections/dashboard/blog/post-content';


interface Caps {


  avatar?: string;
  cover?: string;
  name?: string;
  gender?: string;
  maritalStatus?: string;
 publishedAt?: string;
  originCity: string,
  highSchool: string;
  university: string;
  currentCity: string;
  quote?: string;
  userUrl: string;

}
const useCaps = (): Caps[] => {
  return [

  ];
};

const usePost = (): Caps | null => {
  const isMounted = useMounted();
  const [caps, setCaps] = useState<Caps | null>(null);




  const handlePostGet = useCallback(async () => {
    try {
      const response = await blogApi.getCaps();

      if (isMounted()) {
        setCaps(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
      () => {
        handlePostGet();
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
  );

  return caps;
};

const Page: NextPage = () => {
  const caps = useCaps();

  usePageView();

  if (!caps) {
    return null;
  }

  //const publishedAt = format(caps.publishedAt, 'MMMM d, yyyy');

  return (
      <>
        <Seo title="Blog: Post Details" />
        <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 8,
            }}
        >
          <Container maxWidth="xl">
            <Stack spacing={1}>
              <Typography variant="h3">Post</Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <Link
                    color="text.primary"
                    component={RouterLink}
                    href={paths.dashboard.index}
                    variant="subtitle2"
                >
                  Dashboard
                </Link>
                <Link
                    color="text.primary"
                    component={RouterLink}
                    href={paths.dashboard.capsules.index}
                    variant="subtitle2"
                >
                  Blog
                </Link>
                <Typography
                    color="text.secondary"
                    variant="subtitle2"
                >
                  Details
                </Typography>
              </Breadcrumbs>
            </Stack>
            <Card
                elevation={16}
                sx={{
                  alignItems: 'center',
                  borderRadius: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 8,
                  mt: 6,
                  px: 3,
                  py: 2,
                }}
            >
              <Typography variant="subtitle1">Hello, Admin</Typography>
              <Button
                  component={RouterLink}
                  href={paths.dashboard.capsules.postCreate}
                  variant="contained"
              >
                Edit Post
              </Button>
            </Card>
            <Stack spacing={3}>
              <div>
                <Chip label={caps.quote} />
              </div>
              <Typography variant="h3">{caps.name}</Typography>
              <Typography
                  color="text.secondary"
                  variant="subtitle1"
              >
                {caps.name}
              </Typography>
              <Stack
                  alignItems="center"
                  direction="row"
                  spacing={2}
                  sx={{ mt: 3 }}
              >
                <Avatar src={caps.avatar} sx={{ width: 100, height: 100 }}
                />

                <div>
                  <Typography variant="subtitle2">
                    By {caps.name} • {}
                  </Typography>
                  <Typography
                      color="text.secondary"
                      variant="body2"
                  >
                    {caps.email} read
                  </Typography>
                </div>
              </Stack>
            </Stack>
            <Box
                sx={{
                  backgroundImage: `url(${caps.cover})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  borderRadius: 1,
                  height: 380,
                  mt: 3,
                }}
            />
            {caps.name && (
                <Container sx={{ py: 3 }}>
                  <PostContent content={caps.name} />
                </Container>
            )}
            <Divider sx={{ my: 3 }} />
            <Stack spacing={2}>
              {caps.map((comment) => (
                  <PostComment
                      key={comment.id}
                      {...comment}
                  />
              ))}
            </Stack>
            <Divider sx={{ my: 3 }} />
            <PostCommentAdd />
            <Box sx={{ mt: 8 }}>
              <PostNewsletter />
            </Box>
          </Container>
        </Box>
      </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
