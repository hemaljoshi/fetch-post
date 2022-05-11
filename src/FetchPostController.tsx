import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FetchPost from './FetchPost';

let totalPage = 0;
let currentPage = 0;

const FetchPostController = () => {
  const navigate = useNavigate();
  const [postData, setPostData] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const getData = () => {
    axios
      .get(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${currentPage}`
      )
      .then((response: any) => {
        setHasMore(currentPage < totalPage ? true : false);
        totalPage = response.data.nbPages;
        let tempData: any[] = [];
        tempData = response.data.hits;
        setPostData((prev) => prev.concat(tempData));
        currentPage++;
      })
      .catch((error: any) => console.log(error));
  };

  const onRowSelect = (obj: any) => {
    navigate('/data', { state: { response: obj.row } });
  };

  useEffect(() => {
    getData();
    const interval = setInterval(() => {
      ((currentPage < totalPage) && (hasMore === true)) && getData();
      return () => {
        clearInterval(interval);
      };
    }, 10000);
  }, []);

  const fetchPostProps = {
    postData,
    onRowSelect,
    getData,
    hasMore,
  };

  return <FetchPost {...fetchPostProps} />;
};

export default FetchPostController;
