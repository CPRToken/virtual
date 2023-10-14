import type { FC, SyntheticEvent } from 'react';
import {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import XIcon from '@untitled-ui/icons-react/build/esm/X';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import type { Profile } from 'src/types/social';
import { socialApi } from 'src/api/social/socialApi';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { db, storage } from 'src/libs/firebase';
import { doc, getDoc } from 'firebase/firestore';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import { Tip } from 'src/components/tip';
import { wait } from 'src/utils/wait';
import algoliasearch from 'algoliasearch/lite';




type Profile = {

    uid: string;
    avatar: string;
    cover: string;
    currentCity: string;
    currentJobCompany: string;
    currentJobTitle: string;
    email: string;
    gender: string;
    name: string;
    originCity: string;
    previousJobCompany: string;
    previousJobTitle: string;
    placesWorked: string;
    highSchool: string;
    university: string;
    quote: string;
};




interface SearchDialogProps {
    onClose?: () => void;
    open?: boolean;
}

const client = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APP_ID,
    process.env.REACT_APP_ALGOLIA_SEARCH_KEY
);
const index = client.initIndex('Virtual Eternity');


export const SearchDialog: FC<SearchDialogProps> = (props) => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const { onClose, open = false, ...other } = props;
    const [value, setValue] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [displayResults, setDisplayResults] = useState<boolean>(false);

    const handleSubmit = useCallback(async (event: SyntheticEvent): Promise<void> => {
        event.preventDefault();
        setIsLoading(true);

        try {
            if (value) {
                index.search(value).then(({ hits }) => {
                    setProfiles(uid);
                    setDisplayResults(true);
                });
            } else {
                console.error("Search value is empty or undefined.");
            }
        } catch (error) {
            console.error("Failed to fetch profiles:", error);
        }

        setIsLoading(false);
    }, [value]);



    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            onClose={onClose}
            open={open}
            {...other}
        >
            <Stack
                alignItems="center"
                direction="row"
                justifyContent="space-between"
                spacing={3}
                sx={{
                    px: 3,
                    py: 2,
                }}
            >
                <Typography variant="h6">Search</Typography>
                <IconButton
                    color="inherit"
                    onClick={onClose}
                >
                    <SvgIcon>
                        <XIcon />
                    </SvgIcon>
                </IconButton>
            </Stack>
            <DialogContent>
                <Tip message="Search by entering a keyword and pressing Enter" />
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                >
                    <TextField
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SvgIcon>
                                        <SearchMdIcon />
                                    </SvgIcon>
                                </InputAdornment>
                            ),
                        }}
                        label="Search"
                        onChange={(event): void => setValue(event.target.value)}
                        placeholder="Search..."
                        value={value}
                    />
                </Box>
                {isLoading && (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mt: 3,
                        }}
                    >
                        <CircularProgress />
                    </Box>
                )}
                {displayResults && (
                    <Stack spacing={2} sx={{ mt: 3 }}>
                        {profiles.map((profile, index) => (
                            <Box key={profile.uid} sx={{ p: 2 }}>
                                {/* Display avatar, name, etc. or any other fields you want */}
                                <Typography variant="subtitle1">{profile.name}</Typography>
                                <Typography color="text.secondary" variant="body2">
                                    {profile.email}
                                </Typography>
                                {/* Add more details here as needed */}
                            </Box>
                        ))}
                    </Stack>
                )}
            </DialogContent>
        </Dialog>
    );
};

SearchDialog.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool,
};
