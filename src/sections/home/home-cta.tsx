import type { FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';


export const HomeCta: FC = () => {
    const theme = useTheme();
    const logoSrc = theme.palette.mode === 'dark' ? '/assets/sendero-dark.png' : '/assets/sendero-light.png';




    return (
        <Box
            sx={{
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                backgroundImage: 'linear-gradient(rgba(0, 0, 139, 0.30), rgba(0, 0, 139, 0.4)), url("/assets/parque.jpg")',
                color: 'neutral.100',
                pt: '80px',
                pb: '120px',
                height: '600px',
                width: '100%',
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

                    <Stack spacing={2} style={{ paddingTop: '100px', paddingLeft: '40px', paddingBottom: '40px' }}>
                        <Typography
                            align="center"
                            color="inherit"
                            variant="h3"
                            style={{ paddingBottom: '20px', paddingTop: '20px' }}
                        >
          Estás planeando para el futuro o para el momento actual?
        </Typography>
        <Typography
          align="center"
          color="inherit"
          variant="subtitle1"
          style={{ paddingBottom: '20px',whiteSpace: 'pre-line' ,  }}
        >
          Obtén un Presupuesto para un Funeral, y un Funeral Virtual.
          Consulta las opciones de precios para los servicios que necesitas.
        </Typography>
        <Typography
          align="center"
          color="inherit"
          variant="subtitle1"
          style={{ paddingBottom: '20px',whiteSpace: 'pre-line' }}
        >
          En la Funeraria Sendero, tienen todo lo que se necesita para un adiós inolvidable para esa persona querida.
        </Typography>
        <Typography
          align="center"
          color="inherit"
          variant="subtitle1"
          style={{ paddingBottom: '20px',whiteSpace: 'pre-line' }}
        >
          Funeraria Sendero, saben lo crucial que es ofrecer un servicio de primera y estar disponibles cuando más los necesitas
        </Typography>
      </Stack>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 3 }}
      >
        <Button
          component="a"
          href="https://www.funerariasendero.cl/"
          target="_blank"
          variant="contained"
        >
         Visita
        </Button>
      </Stack>
                </Box>
    </Container>
</Box>

    );
};


