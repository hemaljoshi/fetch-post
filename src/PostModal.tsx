import React from 'react';
import { Grid, Modal, Typography, Box } from '@mui/material';

const style = {
  margin: '2% auto',
  backgroundColor: 'white',
  borderRadius: '0.50rem',
  width: '60vw',
  height: 'auto',
  padding: '2rem',
  position: 'relative',
  bgcolor: 'background.paper',
  p: 4,
};

interface PostModalProps {
  open: boolean;
  handleClose: () => void;
  selectedPostData: {};
}

const PostModal: React.FC<PostModalProps> = ({
  open,
  handleClose,
  selectedPostData,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      sx={{ overflowY: 'auto', '&::-webkit-scrollbar': { display: 'none' } }}
    >
      <Box sx={style}>
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Box>
              <pre
                style={{
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all',
                }}
              >
                {JSON.stringify(selectedPostData, null, 2)}
              </pre>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default PostModal;
