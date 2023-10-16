import type { FC } from 'react';
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { format } from 'date-fns';
import Star01Icon from '@untitled-ui/icons-react/build/esm/Star01';
import DotsVerticalIcon from '@untitled-ui/icons-react/build/esm/DotsVertical';
import Globe01Icon from '@untitled-ui/icons-react/build/esm/Globe03';
import Avatar from '@mui/material/Avatar';

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { usePopover } from 'src/hooks/use-popover';
import type { Item } from 'src/types/file-manager';
import { bytesToSize } from 'src/utils/bytes-to-size';
import { FotosMenu } from './fotos-menu';
import {  ref, getMetadata } from "firebase/storage";

interface ThumbnailCardProps {
  item: Item;
  imageUrls?: string;
  onDelete?: (itemId: string) => void;
  onFavorite?: (itemId: string, value: boolean) => void;
    onOpen?: () => void;  // Change this line

}

export const ThumbnailCard: FC<ThumbnailCardProps> = (props) => {
  const {  imageUrls, item, onDelete, onFavorite, onOpen } = props;
  const popover = usePopover<HTMLButtonElement>();

  const handleDelete = useCallback((): void => {
    popover.handleClose();
    onDelete?.(item.id);
  }, [item, popover, onDelete]);

  let size = bytesToSize(item.size);

  if (item.type === 'folder') {
    size += `• ${item.itemsCount} items`;
  }

  const createdAt = item.createdAt instanceof Date ? format(item.createdAt, 'MMM dd, yyyy')

    : 'Unknown date';


  const showShared = !item.isPublic && (item.shared || []).length > 0;

  return (
    <>
      <Card
        key={item.id}
        sx={{
          backgroundColor: 'transparent',
          boxShadow: 0,
          transition: (theme) =>
            theme.transitions.create(['background-color, box-shadow'], {
              easing: theme.transitions.easing.easeInOut,
              duration: 200,
            }),
          '&:hover': {
            backgroundColor: 'background.paper',
            boxShadow: 16,
          },
        }}
        variant="outlined"
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={3}
          sx={{
            pt: 2,
            px: 2,
          }}
        >
          {/* Add this block to render the image */}
          {imageUrls && (
            <img src={imageUrls}
                 alt="Thumbnail"
                 style={{ width: '100%', height: 'auto' }} />
          )}

        </Stack>
        <Box sx={{ p: 2 }}>

          <Typography
            onClick={() => onOpen?.()}
            sx={{
              display: 'inline-flex',
              cursor: 'pointer',
            }}
          >
            {item.name}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            spacing={1}
          >
            <div>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                {size}
              </Typography>
            </div>
            <div>
              {item.isPublic && (
                <Tooltip title="Public">
                  <Avatar
                    sx={{
                      height: 32,
                      width: 32,
                    }}
                  >
                    <SvgIcon fontSize="small">
                      <Globe01Icon />
                    </SvgIcon>
                  </Avatar>
                </Tooltip>
              )}

            </div>
          </Stack>
          <Typography
            color="text.secondary"
            variant="caption"
          >
            Created at {createdAt}
          </Typography>
        </Box>
          <IconButton
              onClick={popover.handleOpen}
              ref={popover.anchorRef}
          >
              <SvgIcon fontSize="small">
                  <DotsVerticalIcon />
              </SvgIcon>
          </IconButton>

      </Card>
      <FotosMenu
        anchorEl={popover.anchorRef.current}
        onClose={popover.handleClose}
        onDelete={handleDelete}
        open={popover.open}
      />
    </>
  );
};

ThumbnailCard.propTypes = {
  // @ts-ignore
  item: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
  onFavorite: PropTypes.func,
  onOpen: PropTypes.func,
};
