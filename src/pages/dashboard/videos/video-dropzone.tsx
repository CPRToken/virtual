import type { FC } from 'react';
import PropTypes from 'prop-types';
import type { DropzoneOptions, FileWithPath } from 'react-dropzone';
import { useDropzone } from 'react-dropzone';
import Upload01Icon from '@untitled-ui/icons-react/build/esm/Upload01';
import XIcon from '@untitled-ui/icons-react/build/esm/X';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { bytesToSize } from 'src/utils/bytes-to-size';

export type Videos = FileWithPath;

interface VideosDropzoneProps extends DropzoneOptions {
    caption?: string;
    files?: Videos[];
    onRemove?: (file: Videos) => void;
    onRemoveAll?: () => void;
    videoLink?: string;
    onUpload?: () => void;
}

export const VideoDropzone: FC<VideosDropzoneProps> = (props) => {
    const { caption, files = [], onRemove, videoLink, onRemoveAll, onUpload, ...other } = props;
    const { getRootProps, getInputProps, isDragActive } = useDropzone(other);






    const hasAnyFiles = files.length > 0;





    return (
        <div>
            {!hasAnyFiles && (
            <Box
                sx={{
                    alignItems: 'center',
                    border: 1,
                    borderRadius: 1,
                    borderStyle: 'dashed',
                    borderColor: 'divider',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    outline: 'none',
                    p: 6,
                    ...(isDragActive && {
                        backgroundColor: 'action.active',
                        opacity: 0.5,
                    }),
                    '&:hover': {
                        backgroundColor: 'action.hover',
                        cursor: 'pointer',
                        opacity: 0.5,
                    },
                }}
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                <Stack
                    alignItems="center"
                    direction="row"
                    spacing={2}
                >
                    <Avatar
                        sx={{
                            height: 64,
                            width: 64,
                        }}
                    >
                        <SvgIcon>
                            <Upload01Icon />
                        </SvgIcon>
                    </Avatar>
                    <Stack spacing={1}>
                        <Typography
                            sx={{
                                '& span': {
                                    textDecoration: 'underline',
                                },
                            }}
                            variant="h6"
                        >
                            <span>Click to upload</span> or drag and drop
                        </Typography>
                        {caption && (
                            <Typography
                                color="text.secondary"
                                variant="body2"
                            >
                                {caption}
                            </Typography>
                        )}
                    </Stack>
                </Stack>
            </Box>
            )}
            {hasAnyFiles && (
                <Box sx={{ mt: 2 }}>
                    <List>
                        {files.map((file) => {
                            const extension = file.name.split('.').pop();

                            return (
                                <ListItem
                                    key={file.path}
                                    sx={{
                                        border: 1,
                                        borderColor: 'divider',
                                        borderRadius: 1,
                                        '& + &': {
                                            mt: 1,
                                        },
                                    }}
                                >

                                    <ListItemText
                                        primary={
                                            <>

                                                    <video width="120px" height="120px" style={{ objectFit: 'cover', borderRadius: '0.3rem' }}>
                                                        <source src={URL.createObjectURL(file)} type="video/mp4" />
                                                    </video>
                                                <div style={{ fontSize: '0.8rem' }}>Video link</div>
                                                <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{props.videoLink}</div>

                                                <div style={{ fontSize: '0.8rem', marginTop: '5px' }}>Filename</div>
                                                <div style={{ fontSize: '1.0rem', fontWeight: 'bold' }}>{file.name}</div>

                                                <div style={{ marginTop: '10px' }}>
                                                    <div style={{ fontSize: '0.8rem' }}>Filesize {bytesToSize(file.size)}</div>
                                                </div>

`````
                                            </>

                                        }
                                        secondary={
                                            <>


                                            </>
                                        }
                                    />

                                    <Tooltip title="Remove">
                                        <IconButton
                                            edge="end"
                                            onClick={() => onRemove?.(file)}
                                        >
                                            <SvgIcon>
                                                <XIcon />
                                            </SvgIcon>
                                        </IconButton>
                                    </Tooltip>
                                </ListItem>
                            );
                        })}
                    </List>
                    <Stack
                        alignItems="center"
                        direction="row"
                        justifyContent="flex-end"
                        spacing={2}
                        sx={{ mt: 2 }}
                    >

                    </Stack>
                </Box>
            )}
        </div>

    );
};

VideoDropzone.propTypes = {
    caption: PropTypes.string,
    files: PropTypes.array,
    onRemove: PropTypes.func,
    onRemoveAll: PropTypes.func,
    onUpload: PropTypes.func,


    disabled: PropTypes.bool,
    getFilesFromEvent: PropTypes.func,
    maxFiles: PropTypes.number,
    maxSize: PropTypes.number,
    minSize: PropTypes.number,
    noClick: PropTypes.bool,
    noDrag: PropTypes.bool,
    noDragEventsBubbling: PropTypes.bool,
    noKeyboard: PropTypes.bool,
    onDrop: PropTypes.func,
    onDropAccepted: PropTypes.func,
    onDropRejected: PropTypes.func,
    onFileDialogCancel: PropTypes.func,
    preventDropOnDocument: PropTypes.bool,
};
