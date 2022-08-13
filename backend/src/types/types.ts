export type QueryParams = {
    query: string;
    height: number;
    depth: number;
};

export type RequestLinks = {
    link: string;
    subLinks: Array<RequestLinks>;
};
