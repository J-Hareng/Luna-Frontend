import { CollectionType } from "../../../serv/mod/Types";

export interface AreYouSureData{
    title: string;
    text: string;
    submitText: string;
    status: boolean;
}

export interface CreateCollection{
    CollName: string;
}

export interface CreateTeam{
    name: string;
    das: string;
}

export interface inviteToGroupData{
    Key: string;
}

export interface EditTeamData{
    name: string;
    des: string;
}

export interface NewTaskData{
    TeamName: string;
}

export interface EditTaskData{
    name: string;
    des: string;
    collection: string;
    tags: string[];
}

export interface EditCollectionData{
    collection: CollectionType
}