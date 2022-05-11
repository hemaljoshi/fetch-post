import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FetchPost from './FetchPost';

let pageCount = 0;
let currentPage = 0;

const dataPerPage = 20;

const FetchPostController = () => {
  const [postData, setPostData] = useState<any[]>([]);
  const [selectedPostData, setSelectedPostData] = useState<{}>({});
  const [paginationCount, setPaginationCount] = useState<number>(0);
  const [paginationCurrentPage, setPaginationCurrentPage] = useState<number>(1);
  const [searchData, setSearchData] = useState<string>('');
  const [open, setOpen] = React.useState<boolean>(false);
  const [order, setOrder] = useState<string>('ASC');
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    clearStates();
  };

  const getData = () => {
    console.log(currentPage);
    axios
      .get(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${currentPage}`
      )
      .then((response: any) => {
        pageCount = response.data.nbPages;
        let tempData: any[] = [];
        tempData = response.data.hits;
        setPostData((prev) => prev.concat(tempData));
        currentPage++;
      })
      .catch((error: any) => console.log(error));
  };

  const handleCurentPageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPaginationCurrentPage(value);
  };

  const fetchPageCount = (data: any) => {
    if (data.length > 0 && data.length % dataPerPage === 0) {
      setPaginationCount(data.length / dataPerPage);
    }
    if (data.length > 0 && data.length % dataPerPage !== 0) {
      setPaginationCount(Math.floor(data.length / dataPerPage) + 1);
    }
    if (data.length === 0) {
      setPaginationCount(0);
    }
  };

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearchData(e.target.value);
  };

  const sortPostData = (col: string) => {
    if (order === 'ASC') {
      const sortedPostData = [...postData].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setPostData(sortedPostData);
      setOrder('DSC');
    }
    if (order === 'DSC') {
      const sortedPostData = [...postData].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setPostData(sortedPostData);
      setOrder('ASC');
    }
  };

  const onRowSelect = (obj: any) => {
    setSelectedPostData(obj);
    handleOpen();
  };

  const clearStates = () => {
    setSelectedPostData({});
  };

  useEffect(() => {
    getData();
    const interval = setInterval(() => {
      currentPage < pageCount ? getData() : clearInterval(interval);
    }, 3000);
  }, []);

  const fetchPostProps = {
    postData,
    handleCurentPageChange,
    paginationCount,
    paginationCurrentPage,
    fetchPageCount,
    handleSearchChange,
    searchData,
    dataPerPage,
    sortPostData,
    open,
    handleClose,
    handleOpen,
    onRowSelect,
    selectedPostData,
  };

  return <FetchPost {...fetchPostProps} />;
};

export default FetchPostController;
