import { useEffect, useState } from 'react';
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from 'src/libs/firebase';
import Grid from '@mui/material/Unstable_Grid2';

import { PostCard } from 'src/sections/dashboard/blog/post-card';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


interface Cap {
    avatar: string;
    name: string;
    dob: Timestamp;
    originCity: string;
     dod: string;
    cover: string;
    quote: string;
    gender?: string;
}


export const HomeCaps: React.FC = () => {

    const [caps, setCaps] = useState<Cap[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "public"));
            const allData: Cap[] = [];  // specify the type here
            querySnapshot.forEach((doc) => {
                allData.push(doc.data() as Cap);
            });
            setCaps(allData);
        };



        fetchData();
    }, []);



    //slice means total number of items to show = 6

    return (
        <Container maxWidth="lg">


            <Typography variant="h4" sx={{ paddingTop: '100px', paddingBottom: '15px', textAlign: 'center' }}>
                Descubre nuestras cápsulas virtuales
            </Typography>
            <Typography variant="subtitle2" sx={{ paddingTop: '8px', paddingBottom: '10px', textAlign: 'left' }}>
                Nuestras cápsulas virtuales no sólo preservan tus recuerdos, sino que también los inmortalizan como NFT en la blockchain, asegurando que tu memoria virtual perdure aún más en el tiempo.
            </Typography>

            <Grid container spacing={4} sx={{ paddingLeft: '0px', paddingRight: '0px', paddingTop: '50px',  paddingBottom: '10px', marginTop: '15px', marginBottom: '50px' }}>



                {caps.slice(0, 6).map((cap, index) => {
                    const formattedDob = cap.dob.toDate().getFullYear(); // <-- Format the date here


                    return (
                        <Grid key={index} xs={12} md={4} sx={{ padding: 2 }}>
                            <PostCard
                                avatar={cap.avatar}
                                name={cap.name}
                                dob={formattedDob.toString()}
                                dod={cap.dod}// <-- Use the formatted date here
                                cover={cap.cover}
                                originCity={cap.originCity}
                                quote={cap.quote}
                                gender={cap.gender}
                                sx={{ maxHeight: '150px', width: '90%' }}
                                // <-- Set a fixed width here
                            />
                        </Grid>
                    );
                })}
            </Grid>
            {/* ... */}
        </Container>

    );

};
