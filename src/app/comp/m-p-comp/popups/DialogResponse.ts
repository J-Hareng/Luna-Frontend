export interface NewTeamResponse{
    name: string;
    des: string;
}
export interface NewTaskResponse{
    name: string;
    des: string;
    collection: string;
    tags: string[];
}

export interface NewCollectionResponse{
    name: string;
}