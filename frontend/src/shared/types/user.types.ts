export type FullUserWithoutRelations = {
    id: number,
    username: string | null,
    pseudonym?: string,
    birth_date?: string,
    email: string,
    signature?: string,
    avatar?: string,
    first_name?: string | null,
    last_name?: string | null
}
// Relations:
    // post?: Post[],
    // album?: Album[],
    // adminidtratedGroups?: ChatGroup[], // chatGroupMembers -> chat_app_chatgroup_members???
    // chatMessages?: ChatMessage[],
    // frendship?: Friendship[] // from, to

// export type Avatar = {
//     id: Number,
//     image: string,
//     profile: FullUserWithoutRelations,
//     shown: Boolean,
//     active: Boolean
// }
