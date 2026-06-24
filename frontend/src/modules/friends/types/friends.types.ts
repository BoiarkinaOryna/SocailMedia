export type friend = {
    id: number
    username: string
    first_name: string,
    last_name: string,
    userId: number,
    // userId: number;
    // birth_date: string | null
    // signature: string | null
    // avatar: string | null
    pseudonym: string | null
    // is_image_signature: boolean
    // is_text_signature: boolean
}

// export type request = {
//     id: number,
//     from_user_id: number,   
//     to_user_id: number,
//     created_at: string,
//     user_app_user_user_app_friendship_from_user_idTouser_app_user: {
//       first_name: string,
//       last_name: string,
//       username: string,
//       avatar: string
//     }
// }
export type request = {
    id: number,
    from_user_id: number,   
    to_user_id: number,
    created_at: string,
    username: string,
    pseudonym: string | null,
    // user_app_user_user_app_friendship_from_user_idTouser_app_user: {
    //   first_name: string,
    //   last_name: string,
    //   username: string,
    //   avatar: string
    // }
}

export type UserInfo = {
    id: number,
    first_name: string,
    last_name: string,
    username: string
    user_app_friendship_user_app_friendship_to_user_idTouser_app_user: {}[]
    post_app_post: ({
        post_app_postheart: {}[];
        post_app_postlike: {}[];
        post_app_postview: {}[];
        post_app_post_tags: {}[];
        post_app_postimage: {}[];
        post_app_postlink: {}[];
    } & {
        id: number;
        created_at: Date;
        author_id: number;
        title: string;
        topic: string | null;
        content: string;
        updated_at: Date | null;
    })[];
    profile_app_profile: {
        avatar: string,
        profile_app_album: {
            name: string,
            theme: string,
            year: number,
            profile_app_albumimage: {}[]
        }
    },
}