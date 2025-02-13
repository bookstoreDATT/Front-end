import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import _ from 'lodash';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const addKeysToArray = <T extends object>(data: T[]): (T & { key: number })[] => {
    return data.map((item, index) => ({
        ...item,
        key: index + 1,
    }));
};
export const convertApiResponseToFileList = ({ url, urlRef, isArr }: { url: string; urlRef: string; isArr?: boolean }) => {
    if (!url) return [];

    if (isArr) return [{ name: 'image.png', uid: urlRef, status: 'done', url }];
    return {
        name: 'image.png',
        uid: urlRef,
        status: 'done',
        url,
    };
};
export type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
export const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export const generateParamsString = (key: string, sortValue: 1 | -1) => `${key}=${sortValue}`;
export const generateStringToObject = (value: string): Record<string, number> => {
    const arr = value.split('_');
    const obj = Object.fromEntries(arr.map((item) => item.split(' '))) as Record<string, number>;
    return obj;
};
