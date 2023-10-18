import type { FC } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';



export const HomeHero: FC = () => {
    useTheme();
    return (
      <Box
          sx={{
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top center',
            backgroundSize: 'cover',
            backgroundImage: 'linear-gradient(rgba(0, 0, 139, 0.20), rgba(0, 0, 139, 0.3)), url("/assets/snowy.gif")',
            pt: '120px',
            pb: '120px',
            height: '80vh',  // 100% of the viewport height
            width: '100vw',
            '@media (max-width:600px)': {
              height: '60vh',  // Adjust this value as needed
              // Add any other adjustments for mobile here
            }
          }}
      >
          <Container maxWidth="lg">
              <Box maxWidth="sm">
                  <Typography
                      variant="h2"
                      sx={{ mb: 2 }}
                  >
                      Reinos virtuales para &nbsp;
                      <Typography
                          component="span"
                          color="primary.main"
                          variant="inherit"
                      ><br />
                          Recuerdos duraderos
                      </Typography>  <br />
                      Has reservado el tuyo?
                  </Typography>
                  <Typography
                      color="text.primary"
                      sx={{
                          fontSize:19,
                          fontWeight: 500,
                      }}
                  >
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
              Únete a la red conmemorativa "Virtual Eternity" y marca tu existencia para siempre.
          </Typography>
          <Stack
            alignItems="center"
            direction="row"
            flexWrap="wrap"
            spacing={1}
            sx={{ my: 3 }}
          >



          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Button
              component={RouterLink}
              href={paths.auth.firebase.register}

              sx={(theme) =>
                theme.palette.mode === 'dark'
                  ? {
                      backgroundColor: 'neutral.50',
                      color: 'neutral.900',
                      '&:hover': {
                        backgroundColor: 'neutral.200',
                      },
                    }
                  : {
                      backgroundColor: 'neutral.900',
                      color: 'neutral.50',
                      '&:hover': {
                        backgroundColor: 'neutral.700',
                      },
                    }
              }
              variant="contained"
            >
              Registrar
            </Button>
            <Button
              color="inherit"

              href="src/auth/firebase/register"
              startIcon={
                <SvgIcon fontSize="small">

                </SvgIcon>
              }
            >

            </Button>
          </Stack>
        </Box>
        <Box
          sx={{
            pt: '120px',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              overflow: 'hidden',
              width: '90%',
              fontSize: 0,
              mt: -2, // hack to cut the bottom box shadow
              mx: -2,
              pt: 2,
              px: 2,
              '& img': {
                borderTopLeftRadius: (theme) => theme.shape.borderRadius * 2.5,
                borderTopRightRadius: (theme) => theme.shape.borderRadius * 2.5,
                boxShadow: 16,
                width: '100%',
              },
            }}
          >

          </Box>

        </Box>
      </Container>
    </Box>
  );
};
