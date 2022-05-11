import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import InfiniteScroll from 'react-infinite-scroll-component';

interface FetchPostProps {
  postData: any[];
  onRowSelect: (obj: any) => void;
  getData: () => void;
  hasMore: boolean;
}

const FetchPost: React.FC<FetchPostProps> = ({
  postData,
  onRowSelect,
  getData,
  hasMore,
}) => {
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 50,
      sortable: false,
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 160,
    },
    {
      field: 'url',
      headerName: 'URL',
      width: 420,
      sortable: false,
    },
    {
      field: 'author',
      headerName: 'Author',
      width: 160,
      sortable: false,
    },
    {
      field: 'created_at',
      headerName: 'Created at',
      width: 160,
    },
  ];

  const rows = postData?.map((posts: any, ind: number) => {
    return {
      id: ind,
      title: posts.title,
      url: posts.url,
      author: posts.author,
      created_at: posts.created_at,
    };
  });

  return (
    <Container maxWidth='lg'>
      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12} padding={3}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              variant='h5'
              sx={{ mb: 3, fontWeight: 700 }}
              color='primary'
            >
              Post Data
            </Typography>
          </Box>

          <InfiniteScroll
            dataLength={rows.length}
            next={getData}
            hasMore={hasMore}
            loader={''}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              onRowClick={onRowSelect}
              rowsPerPageOptions={[100]}
              autoHeight={true}
            />
          </InfiniteScroll>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FetchPost;
