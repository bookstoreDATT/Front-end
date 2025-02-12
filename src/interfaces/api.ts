export type Params = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
    page?: string | number;
    sort?: string;
    limit?: string;
    fields?: string;
};

export interface PaginateResponse<T> {
    data: T;
    page: number;
    totalDocs: number;
    totalPages: number;
}
