import type { FC } from 'react';
import PropTypes from 'prop-types';
import Link01Icon from '@untitled-ui/icons-react/build/esm/Link01';
import Trash02Icon from '@untitled-ui/icons-react/build/esm/Trash02';
import ShareIcon from '@mui/icons-material/Share';
import { ShareModal } from '../../../sections/components/modals/modal-share'; // Update the path accordingly
import { useState } from 'react';

import Menu from '@mui/material/Menu';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import SvgIcon from '@mui/material/SvgIcon';

interface ItemMenuProps {
  anchorEl?: HTMLElement | null;
  onClose?: () => void;
  onDelete?: () => void;
  onShare?: (selectedFotoUrl: string) => void; // <-- modify this line
  open?: boolean;
  selectedFotoUrl?: string; // <-- add this line
}


export const FotosMenu: FC<ItemMenuProps> = (props) => {
  const {anchorEl, onClose, onDelete, onShare, open, selectedFotoUrl} = props; // <-- Add this line
  const [shareModalOpen, setShareModalOpen] = useState(false);





  return (
    <>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
        onClose={onClose}
        open={open}
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
        <MenuItem onClick={onClose}>
          <SvgIcon fontSize="small">
            <Link01Icon/>
          </SvgIcon>
          Copy Link
        </MenuItem>
          <MenuItem onClick={() => setShareModalOpen(true)}>
          <SvgIcon fontSize="small">
            <ShareIcon/>
          </SvgIcon>
          Share
        </MenuItem>
        <MenuItem
          onClick={onDelete}
          sx={{color: 'error.main'}}
        >
          <SvgIcon fontSize="small">
            <Trash02Icon/>
          </SvgIcon>
          Delete
        </MenuItem>
      </Menu>
      <ShareModal
        open={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        fotoUrl={selectedFotoUrl}
      />

    </>
  );
};

FotosMenu.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
  onShare: PropTypes.func, // <-- add this line
  open: PropTypes.bool,
};
