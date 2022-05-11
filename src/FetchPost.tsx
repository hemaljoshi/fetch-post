import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Pagination, Paper, TextField, Box } from '@mui/material';
import { Container, Grid } from '@mui/material';
import PostModal from './PostModal';

interface FetchPostProps {
  postData: any[];
  paginationCount: number;
  paginationCurrentPage: number;
  searchData: string;
  dataPerPage: number;
  open: boolean;
  handleCurentPageChange: (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => void;
  fetchPageCount: (data: any) => void;
  handleSearchChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  sortPostData: (col: string) => void;
  handleClose: () => void;
  handleOpen: () => void;
  onRowSelect: (obj: any) => void;
  selectedPostData: {};
}

const FetchPost: React.FC<FetchPostProps> = ({
  postData,
  handleCurentPageChange,
  paginationCount,
  paginationCurrentPage,
  fetchPageCount,
  searchData,
  handleSearchChange,
  dataPerPage,
  sortPostData,
  open,
  handleClose,
  onRowSelect,
  selectedPostData,
}) => {
  const filteredPostData = postData?.filter((row: any) => {
    if (searchData === '') {
      return row;
    }
    if (
      row?.title?.toLowerCase().includes(searchData.toLowerCase()) ||
      row?.url?.toLowerCase().includes(searchData.toLowerCase()) ||
      row?.author?.toLowerCase().includes(searchData.toLowerCase())
    ) {
      return row;
    }
  });

  fetchPageCount(filteredPostData);

  const PostModalProps = {
    open,
    handleClose,
    selectedPostData,
  };
  return (
    <Container maxWidth='lg'>
      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12} padding={2}>
          <Box>
            <TextField
              label='Search...'
              value={searchData}
              onChange={handleSearchChange}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12} padding={2}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell onClick={() => sortPostData('title')}>
                    Title
                  </TableCell>
                  <TableCell>URL</TableCell>
                  <TableCell onClick={() => sortPostData('created_at')}>
                    Created Date
                  </TableCell>
                  <TableCell>Author</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPostData
                  ?.slice(
                    dataPerPage * (paginationCurrentPage - 1),
                    dataPerPage * paginationCurrentPage
                  )
                  .map((row: any, index: number) => (
                    <TableRow key={index} onClick={() => onRowSelect(row)}>
                      <TableCell
                        component='th'
                        scope='row'
                        style={{ width: 100 }}
                      >
                        {row.title}
                      </TableCell>
                      <TableCell style={{ width: 20 }}>{row.url}</TableCell>
                      <TableCell style={{ width: 100 }}>
                        {row.created_at}
                      </TableCell>
                      <TableCell style={{ width: 100 }}>{row.author}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Pagination
            count={paginationCount}
            page={paginationCurrentPage}
            shape='rounded'
            sx={{
              padding: 1,
            }}
            onChange={handleCurentPageChange}
          />
        </Grid>
      </Grid>
      <PostModal {...PostModalProps} />
    </Container>
  );
};

export default FetchPost;
