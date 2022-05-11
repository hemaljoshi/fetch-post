import React from 'react';
import { Grid, Box, Container, Paper, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const PostData = () => {
  const { state }: any = useLocation();
  const response = state?.response;

  return (
    <Container maxWidth='lg'>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item lg={10} md={10} sm={10} xs={10}>
          <Paper elevation={20} sx={{ p: 4 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography
                variant='h5'
                sx={{ mb: 1, fontWeight: 700 }}
                color={state !== null ? 'primary' : 'error'}
              >
                Post Data {state !== null ? '' : ' is null'}
              </Typography>
            </Box>
            <pre
              style={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
              }}
            >
              {JSON.stringify(response, null, 2)}
            </pre>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PostData;
