
export interface Profile {

    uid?: string;
    avatar?: string;
    bio?: string;
    cover?: string;
    name?: string;
    firstName?: string;
    lastName?: string;
    email: string;
    gender?: string;
    maritalStatus?: string;
    originCity?: string,
    highSchool?: string;
    university?: string;
    currentCity?: string;
    quote?: string;
    userUrl?: string;

}



export interface Post {


        uid: string;
    postId: string;
        avatar: string;
        name: string;
        comments: Comment[];
    createdAt: number;
    isLiked: boolean;
    likes: number;
    media?: string;
    message: string;
}





export interface Comment {
    uid: string;
    postId: string;
        avatar: string;
        name: string;
      createdAt: number;
    message: string;
}



