import React from 'react';
import type { NextPage } from 'next';
import Upload01Icon from '@untitled-ui/icons-react/build/esm/Upload01';
import { useRef } from 'react';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { Seo } from 'src/components/seo';
import {ImageViewer} from "../../../sections/components/modals/modal-image";



import { auth, storage } from 'src/libs/firebase';
import { ref, uploadBytes, getDownloadURL, listAll, getMetadata } from "firebase/storage";


import { Grid, Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import {useSettings} from "../../../hooks/use-settings";
import {useDialog} from "../../../hooks/use-dialog";
import {StorageStats} from "../../../sections/dashboard/file-manager/storage-stats";
import { usePopover } from "src/hooks/use-popover"
import Popover from '@mui/material/Popover';
import {useRouter} from "next/router";

type View = 'grid' | 'list';



const Page: NextPage = () => {
    const [imageUrls, setImageUrls] = useState<Array<{ url: string, name: string }>>([]);

    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const settings = useSettings();
    const uploadDialog = useDialog();


    const user = auth.currentUser;
    const uid = user ? user.uid : null;



  const handleClickOpen = (url: string) => {
      console.log("handleClickOpen called with URL:", url);
    setSelectedImage(url);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);

  };



    const fetchFotos = () => {
        const fotosListRef = ref(storage, `/${uid}/fotos/`);
        setImageUrls([]); // Clear the existing URLs

        listAll(fotosListRef).then((response) => {
            console.log("ListAll Response:", response); // Debugging
            response.items.forEach((item) => {
                console.log("Item:", item); // Debugging
                getDownloadURL(item).then((url) => {
                    console.log("URL:", url); // Debugging
                    setImageUrls((prev) => [...prev, { url: url, name: item.name }]);

                }).catch((error) => {
                    console.log("Error getting URL:", error); // Debugging
                });
            });
        }).catch((error) => {
            console.log("Error in listAll:", error); // Debugging
        });
    };

    useEffect(() => {
        if (uid) { // Only run if userUrl is set
            const imagesListRef = ref(storage, `/${uid}/fotos/`);

            listAll(imagesListRef).then((response) => {
                console.log("useEffect ListAll Response:", response); // Debugging
                response.items.forEach((item) => {
                    console.log("useEffect Item:", item); // Debugging
                    getDownloadURL(item).then((url) => {
                        console.log("useEffect URL:", url); // Debugging
                        setImageUrls((prev) => [...prev, { url: url, name: item.name }]);

                    }).catch((error) => {
                        console.log("useEffect Error getting URL:", error); // Debugging
                    });
                });
            }).catch((error) => {
                console.log("useEffect Error in listAll:", error); // Debugging
            });
        }
    }, [user ? user.uid : null]);





  return (
    <>
      <Seo title="Dashboard: Fotos" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <div>
                  <Typography variant="h4">Fotos</Typography>
                </div>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={2}
                >
                    <Button
                        onClick={uploadDialog.handleOpen}
                        startIcon={
                            <SvgIcon>
                                <Upload01Icon />
                            </SvgIcon>
                        }

                        variant="contained"
                  >
                    Upload Fotos
                    </Button>
                </Stack>
              </Stack>
            </Grid>
              <Grid item xs={12} md={8}>
                  <Stack
                      spacing={{
                          xs: 3,
                          lg: 4,
                      }}
                  >



                  </Stack>
                  <Grid container spacing={1}>
                      {imageUrls.map((imageObj, index) => (
                          <Grid item xs={3} key={index}>
                              <ThumbnailCard
                                  item={{
                                      id: index.toString(),
                                      size: 0,
                                      type: 'file',
                                      isFavorite: false,
                                      name: imageObj.name // Use name from imageObj
                                  }}
                                  imageUrls={imageObj.url} // Use url from imageObj
                                  onDelete={() => console.log("Delete")}
                                  onFavorite={() => console.log("Favorite")}
                                  onOpen={() => handleClickOpen(imageObj.url)} // Use url from imageObj
                              />
                          </Grid>
                      ))}
                  </Grid>

                  {/* Add this block to show ImageViewer when open is true */}
                  {open && (
                      <ImageViewer
                          imageUrl={selectedImage}
                          onClose={handleClose}
                      />
                  )}


              </Grid>
              <Grid item xs={12} md={4}>
                  <StorageStats />
              </Grid>
          </Grid>
        </Container>
      </Box>
        <FotosUploader
            onClose={uploadDialog.handleClose}
            open={uploadDialog.open}
            uid={uid}
            onUploadSuccess={fetchFotos}
        />
    </>
  );
}


  export default Page;
