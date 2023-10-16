import type { FC } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import type { SxProps } from '@mui/system/styleFunctionSx';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
 import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import { getInitials } from 'src/utils/get-initials';

interface PostCardProps {

  avatar: string;
  cover: string;
  name: string;
  dob: string;
  dod: string;
  email: string;
  gender?: string;
  publishedAt: number;
  originCity: string,
  highSchool: string;
  university: string;
  currentCity: string;
  quote: string;
  userUrl: string;
  sx?: SxProps;

}

export const PostCard: FC<PostCardProps> = (props) => {
  const {


    avatar,
    cover,
    name,
  email,
  dob,
      dod,
  gender,
   publishedAt,
  originCity,
      highSchool,
  university,
  currentCity,
  quote,
  userUrl,
        ...other
  } = props;

  const formattedPublishedAt = publishedAt ? format(publishedAt, 'MMM d, yyyy') : '';

  return (

      <Card {...other} sx={{ width: '100%', height: '100%' }}>



      <CardMedia
              component={RouterLink}
              href={paths.dashboard.capsules.postDetails}
              image={cover}
              sx={{ height: 200, paddingBottom: '-20px' }}
        />
        <CardContent>
          <Stack alignItems="center"
                 direction="column"
                 spacing={2}
                 sx={{ padding: '0px' }}>
            <Box sx={{ paddingTop: '-20px', paddingBottom: '-15px', paddingLeft: '4px', paddingRight: '4px' }}>
              <Avatar src={avatar}
                      sx={{ width: 150, height: 150 }}>{getInitials(name)}</Avatar>
            </Box>
            <Typography variant="subtitle2"
                        sx={{ padding: '8px' }}>
              {dob} - {dod}
            </Typography>
          </Stack>
          <Link
              color="text.primary"
              variant="h5"
              sx={{ paddingTop: '0px', paddingBottom: '10px', paddingLeft: '4px', paddingRight: '4px' }}
          >
            {name}
          </Link>
          <Typography
              color="text.secondary"
              sx={{

                mt: 1,

                paddingTop: '4px', paddingBottom: '0px', paddingLeft: '2px', paddingRight: '2px'
              }}
              variant="body2"
          >
            {quote}
          </Typography>
          <Stack
              alignItems="center"
              direction="row"
              flexWrap="wrap"
              spacing={2}
              sx={{ mt: 2, padding: '2px' }}
          >


          </Stack>
        </CardContent>
      </Card>
  );

};

PostCard.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  dod: PropTypes.string,
  category: PropTypes.string,
  cover: PropTypes.string.isRequired,
    publishedAt: PropTypes.number,
  readTime: PropTypes.string.isRequired,
  quote: PropTypes.string.isRequired,
  lastName: PropTypes.string,
};
