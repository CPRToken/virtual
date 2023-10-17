import type { FC } from 'react';
import { useState } from 'react';
import Image from 'next/image';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';


import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

interface Feature {
  id: string;
  title: string;
  description: string;
  imageDark: string;
  imageLight: string;
}

const features: Feature[] = [
  {
    id: 'experts',
    title: ' Estás planeando para el futuro o para el momento actual?',
    description:
      "Obtén un Presupuesto para un Funeral, y un Funeral Virtual.",
    imageDark: '/assets/parque.jpg',
    imageLight: '/assets/parque.jpg',
  },
  {
    id: 'figma',
    title: 'Crematorio Sendero',
    description:
      "Ofrecemos una variedad de categorías de ánforas, pensadas para satisfacer las necesidades de cada tipo de familia..",
    imageDark: '/assets/cremation.png',
    imageLight: '/assets/cremation.png',
  },
  {
    id: 'tech',
    title: 'Cementerios parque sendero',
    description:
      'Construido con tecnologías modernas, hemos utilizado las últimas tendencias en desarrollo web para asegurar rapidez, elegancia y escalabilidad',
    imageDark: '/assets/park.png',
    imageLight: '/assets/park.png',
  },

];

export const HomeSendero: FC = () => {
  const theme = useTheme();
  const [activeFeature, setActiveFeature] = useState<number>(0);
  const feature = features[activeFeature];
  const image = theme.palette.mode === 'dark' ? feature?.imageDark : feature?.imageLight;
  const logoSrc = theme.palette.mode === 'dark' ? 'assets/sendero-dark.png' : 'assets/sendero-light.png';

  return (
    <Box
      sx={{
        backgroundColor: 'neutral.800',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center',
        backgroundImage: 'url("/assets/gradient-bg.svg")',
        color: 'common.white',
        py: '120px',
      }}
    >
      <Container maxWidth="lg">
        <Box position="relative">
            <Image
                src={logoSrc}
                alt="Sendero Logo"
                layout="fill"
                objectFit="contain"
            />
        <Stack
          spacing={2}
          sx={{ mb: 8 }}
        >
          <Typography
            align="center"
            color="inherit"
            variant="h3"
          >
            Planificando un último adiós?
          </Typography>
          <Typography
            align="center"
            color="inherit"
            variant="subtitle2"
          >

          </Typography>
        </Stack>
        <Grid
          alignItems="center"
          container
          spacing={3}
        >
          <Grid
            xs={12}
            md={6}
          >
            <Stack spacing={1}>
              {features.map((feature, index) => {
                const isActive = activeFeature === index;

                return (
                  <Box
                    key={feature.id}
                    onClick={() => setActiveFeature(index)}
                    sx={{
                      borderRadius: 2.5,
                      color: 'neutral.400',
                      cursor: 'pointer',
                      p: 3,
                      transition: (theme) =>
                        theme.transitions.create(['background-color, box-shadow', 'color'], {
                          easing: theme.transitions.easing.easeOut,
                          duration: theme.transitions.duration.enteringScreen,
                        }),
                      ...(isActive && {
                        backgroundColor: 'primary.alpha12',
                        boxShadow: (theme) => `${theme.palette.primary.main} 0 0 0 1px`,
                        color: 'common.white',
                      }),
                      '&:hover': {
                        ...(!isActive && {
                          backgroundColor: 'primary.alpha4',
                          boxShadow: (theme) => `${theme.palette.primary.main} 0 0 0 1px`,
                          color: 'common.white',
                        }),
                      },
                    }}
                  >
                    <Typography
                      color="inherit"
                      sx={{ mb: 1 }}
                      variant="h6"
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      color="inherit"
                      variant="body2"
                    >
                      {feature.description}
                    </Typography>
                    {feature.id === 'figma' && (
                      <Box sx={{ mt: 3 }}>

                      </Box>
                    )}
                  </Box>

                );
              })}
            </Stack>

          </Grid>
          <Grid
            xs={12}
            md={6}
          >
              <Box

              >
                  <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
                      <Image src={image} layout="fill" objectFit="contain" alt="Description" />
                  </div>
              </Box>

          </Grid>

        </Grid>
        <Stack
            alignItems="center"
            direction="row"
            justifyContent="center"
            spacing={2}
            sx={{ mt: 7 }}
        >
          <Button
              component="a"
              href="https://www.funerariasendero.cl/"
              target=""
              variant="outlined"
              sx={{
                borderColor: 'yourBorderColor',
                borderWidth: 2, // Increase outline width
                fontWeight: 'bold' // Make font bold
              }}
          >
            Visita
          </Button>
        </Stack>
        </Box>
      </Container>
    </Box>

  );
};
