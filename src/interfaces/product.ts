interface Category {
    _id: string;
    name: string;
}

interface Tag {
    _id: string;
    name: string;
}
export interface IThumbnailAntd extends File {
    uid: string;
    originFileObj: File;
}
export type IProductFiles = {
    file: IThumbnailAntd;
    fileList: FileList;
};
export interface IProduct {
    _id: string;
    name: string;
    sold: number;
    discount: number;
    productCode: string;
    description: string;
    price: number;
    thumbnail: string;
    images: string[];
    categoryId: Category;
    tagId: Tag[];
    stock: number;
    author: string;
    publicDate: string;
    isHide: boolean;
    createdAt: string;
    updatedAt: string;
}
