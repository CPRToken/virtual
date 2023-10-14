import type { FC } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import { Profile, Post } from 'src/types/social';
import { SocialPostAdd } from './social-post-add';
import { SocialPostCard } from './social-post-card';
import { SocialAbout } from './social-about';



interface SocialProfileTimelineProps {
    posts?: Post[];
    profile: Profile;

}


export const SocialTimeline: FC<SocialProfileTimelineProps> = (props) => {
    const { posts = [], profile, ...other } = props;


//I need the avatar and author name of the person who posted the post to display with the below rendering function. Is this the right file to render the saved posts in firestore?
  //  const [posts, setPosts] = useState<Post[]>([]);

    return (
        <div {...other}>

            <Grid
                container
                spacing={4}
            >
                <Grid
                    lg={4}
                    xs={12}
                >
                    <SocialAbout
                        currentCity={profile.currentCity}


                        email={profile.email}
                        gender={profile.gender}
                        originCity={profile.originCity}

                        placesWorked={profile.placesWorked}
                        highSchool={profile.highSchool}
                        university={profile.university}
                        quote={profile.quote}
                    />
                </Grid>
                <Grid lg={8}
                      xs={12}>

                    <Stack spacing={4}>
                        <SocialPostAdd />
                        {posts.map((post) => (
                            <SocialPostCard
                                key={post.id}
                                postId={post.id}
                                authorAvatar={post.author.avatar}
                                authorName={post.author.name}
                                comments={post.comments}
                                createdAt={post.createdAt}
                                isLiked={post.isLiked}
                                likes={post.likes}
                                media={post.media}
                               message={post.message}



                            />

                        ))}
                    </Stack>
                </Grid>

            </Grid>
        </div>
    );
};


SocialTimeline.propTypes = {
    posts: PropTypes.array, // Removed .isRequired
    profile: PropTypes.object.isRequired,



};

