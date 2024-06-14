import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

const lightTheme = createTheme({ palette: { mode: 'light' } });

export default function Elevation( { matches }) {
  return (
    <>
    <Grid container spacing={2} sx={{placeContent: 'center', width: '600px'}}>
    {[lightTheme].map((theme, index) => (
      <Grid item xs={6} key={index}>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              p: matches ? 2 : 0,
              borderRadius: 2,
              bgcolor: 'background.default',
              display: 'grid',
              gridTemplateColumns: { md: '1fr' },
              gap: 2,
            }}
          >
            {[
              {elevation: 0,title: 'Si necesitas algún servicio del departamento debes tomar hora'}, 
              {elevation: 1,title: 'Ingresas al sitio dando click en Reservar'}, 
              {elevation: 2,title: 'Tendrás que completar un formulario con tus datos'},
              {elevation: 3,title: 'Podrás agendar entrevista en los horarios disponibles'}, 
              {elevation: 4,title: 'Debes confirmar la cita'}, 
              {elevation: 6,title: 'Luego de la entrevista, el profesional determinará qué dispositivo es el que calza mejor con tus necesidades y agendará tus siguientes citas:'}
            ].map((item) => (
              <Item key={item.elevation} item={item.elevation} sx={{height: 'fit-content', padding: '20px', lineHeight: 'normal', bgcolor: '#E6E9EC', color: '#000'}} >
                {`${item.title}`}
              </Item>
            ))}
          </Box>
        </ThemeProvider>
      </Grid>
    ))}
  </Grid>
    <Grid container spacing={2} sx={{placeContent: 'center'}}>
      {[lightTheme].map((theme, index) => (
        <Grid item xs={6} key={index}>
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                p: matches ? 2 : 0,
                borderRadius: 2,
                bgcolor: 'background.default',
                display: 'grid',
                gridTemplateColumns: { md: '1fr 1fr' },
                gap: 2,
                marginTop: '10px'
              }}
            >
              {[
                {elevation: 0,title: 'Profesionales recomendados'}, 
                {elevation: 1,title: 'Grupo psicoterapéutico o psicopedagógico'}, 
                {elevation: 2,title: 'Derivación externa (convenio, psiquiatra o salud pública)'}, 
                {elevation: 3,title: 'Atención de Psicoterapia Breve'}, 
                {elevation: 4,title: 'Acompañamiento Psicológico'}, 
                {elevation: 6,title: 'Atención Psicopedagógica'}
              ].map((item) => (
                <Item key={item.elevation} item={item.elevation} sx={{height: '60px', padding: '5px', lineHeight: 'normal',bgcolor: '#1ABC9C', color: '#fff'}} >
                  {`${item.title}`}
                </Item>
              ))}
            </Box>
          </ThemeProvider>
        </Grid>
      ))}
    </Grid>
    </>
  );
}
