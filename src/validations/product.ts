import { IProductFiles } from '~/interfaces/product';
import { errorMessage } from './errorMessageAntForm';
import { ACCEPT_FILE_TYPE, MAX_SIZE } from '~/pages/admin/_product_/_components/_helper_';

/* eslint-disable */
export const imagesValidator = async (_: any, images: IProductFiles) => {
    if (images?.fileList?.length < 1 || !images) {
        return errorMessage('Hãy chọn ảnh cho sản phẩm!');
    }
    /* eslint-disable */
    if (images && images.fileList && images.fileList.length > 0) {
        for (const file of images?.fileList) {
            if (file?.size >= MAX_SIZE) {
                return errorMessage('Kích cỡ ảnh cần nhỏ hơn 5MB!');
            } else if (file?.type && !ACCEPT_FILE_TYPE.includes(file.type)) {
                return errorMessage('Chỉ nhận những ảnh có đuôi png, jpg, jpeg và webp!');
            }
        }
    }
    return Promise.resolve();
};
const updateImagesValidator = async (_: any, images: IProductFiles) => {
    if (images?.fileList?.length >= 1 || images) {
        /* eslint-disable */
        if (images && images.fileList && images.fileList.length > 0) {
            for (const file of images?.fileList) {
                if (file?.size >= MAX_SIZE) {
                    return errorMessage('Kích cỡ ảnh cần nhỏ hơn 5MB!');
                } else if (file?.type && !ACCEPT_FILE_TYPE.includes(file.type)) {
                    return errorMessage('Chỉ nhận những ảnh có đuôi png, jpg, jpeg và webp!');
                }
            }
        }
    }
    return Promise.resolve();
};

export const thumbnailValidator = async (_: any, thumbnail: IProductFiles) => {
    //  (thumbnail.fileList[0] as any).originFileObj
    if (thumbnail?.fileList?.length < 1 || !thumbnail) {
        return errorMessage('Hãy chọn ảnh cho sản phẩm!');
    }
    if (thumbnail && thumbnail.fileList && thumbnail.fileList.length > 0) {
        if (thumbnail && thumbnail.file.size && thumbnail?.file.size >= MAX_SIZE) {
            return errorMessage('Kích cỡ ảnh cần nhỏ hơn 5MB!');
        }
        if (thumbnail?.file.type && !ACCEPT_FILE_TYPE.includes(thumbnail?.file.type)) {
            return errorMessage('Chỉ nhận những ảnh có đuôi png, jpg, jpeg và webp!!');
        }
    }
    return Promise.resolve();
};
const updateThumbnailValidator = async (_: any, thumbnail: IProductFiles) => {
    //  (thumbnail.fileList[0] as any).originFileObj
    if (thumbnail?.fileList?.length >= 1 && thumbnail) {
        if (thumbnail && thumbnail.fileList && thumbnail.fileList.length > 0) {
            if (thumbnail && thumbnail.file.size && thumbnail?.file.size >= MAX_SIZE) {
                return errorMessage('Kích cỡ ảnh cần nhỏ hơn 5MB!');
            }
            if (thumbnail?.file.type && !ACCEPT_FILE_TYPE.includes(thumbnail?.file.type)) {
                return errorMessage('Chỉ nhận những ảnh có đuôi png, jpg, jpeg và webp!!');
            }
        }
    }
    return Promise.resolve();
};

export const productThumbnailRules = [{ validator: imagesValidator }];
export const productImagesRules = [{ validator: thumbnailValidator }];

export const updateProductThumbnailRules = [{ validator: updateThumbnailValidator }];
export const updateProductproductImagesRules = [{ validator: updateImagesValidator }];
