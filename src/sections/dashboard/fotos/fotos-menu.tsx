import type { FC } from 'react';
import PropTypes from 'prop-types';
import { ref, deleteObject } from "firebase/storage";

import Trash02Icon from '@untitled-ui/icons-react/build/esm/Trash02';




import Menu from '@mui/material/Menu';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import SvgIcon from '@mui/material/SvgIcon';

interface ItemMenuProps {
  anchorEl?: HTMLElement | null;
  onClose?: () => void;
  onDelete?: () => void;
  open?: boolean;
  uid: string | null;
  fileName: string;
  storage: any;
}



export const FotosMenu: FC<ItemMenuProps> = (props) => {
  const {anchorEl, onClose, open, onDelete, uid, storage, fileName } = props;


  const deleteFile = () => {
    if (uid === null || fileName === null) return;

    const imageRef = ref(storage, `${uid}/fotos/${fileName}`);

    deleteObject(imageRef).then(() => {
      console.log("File deleted successfully");
      // Refresh your UI here if needed
    }).catch((error) => {
      console.error("Error deleting file: ", error);
    });
  };



  let element = <><>
    <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
        open={open || false}
        onClose={onClose}

        sx={{
          [`& .${menuItemClasses.root}`]: {
            fontSize: 14,
            '& svg': {
              mr: 1,
            },
          },
        }}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
    >

      <MenuItem
          onClick={() => {
            console.log("Delete clicked");
            deleteFile();  // Add this line
            onDelete?.();
          }}
          sx={{color: 'error.main'}}
      >
        <SvgIcon fontSize="small">
          <Trash02Icon/>
        </SvgIcon>
        Delete
      </MenuItem>


    </Menu>


  </>
  </>;
  return element;
};

FotosMenu.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
     open: PropTypes.bool,

};
