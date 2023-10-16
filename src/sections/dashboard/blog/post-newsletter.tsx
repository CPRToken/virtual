import type { FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export const PostNewsletter: FC = () => {
  return (
    <Card
      elevation={16}
      sx={{
        py: 10,
        px: 8,
      }}
    >
      <Grid
        container
        spacing={3}
      >
        <Grid
          xs={12}
          md={6}
          sx={{
            order: {
              xs: 1,
              md: 0,
            },
          }}
        >


        </Grid>
        <Grid
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box
            component="img"
            src="/assets/iconly/iconly-glass-volume.svg"
            sx={{
              maxWidth: '100%',
              width: 260,
            }}
          />
        </Grid>
      </Grid>
    </Card>
  );
};
