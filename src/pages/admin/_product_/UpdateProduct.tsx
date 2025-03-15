import { Button, Checkbox, Form, FormProps, Image, Input, InputNumber, Select, Upload, UploadProps } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { UploadFile } from 'antd/lib';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '~/context/ToastProvider';
import useUpdateProduct from '~/hooks/mutations/product/Mutations/useUpdateProduct';
import { useGetAllCategory } from '~/hooks/queries/category/useGetAllCategory';
import { useGetDetailProduct } from '~/hooks/queries/products/useGetDetailProduct';
import useGetTags from '~/hooks/queries/tag/useGetTags';
import { IThumbnailAntd, ProductData } from '~/interfaces/product';
import { convertApiResponseToFileList, FileType, getBase64 } from '~/utils';
import { updateProductproductImagesRules, updateProductThumbnailRules } from '~/validations/product';
import { UploadButton } from './_components/UploadButton';

const UpdateProduct = () => {
    const [form] = Form.useForm<ProductData>();
    const { mutate: updateProduct, isPending, error } = useUpdateProduct();
    const { data: categories } = useGetAllCategory({});
    const [isFromHasChange, setIsFromHasChange] = useState(false);
    const { data: tags } = useGetTags({});
    const [previewImagesOpen, setPreviewImagesOpen] = useState<boolean>(false);
    const [previewImages, setPreviewImages] = useState<string>('');
    const [previewThumbnailOpen, setPreviewThumbnailOpen] = useState<boolean>(false);
    const [previewThumbnail, setPreviewThumbnail] = useState<string>('');
    const [imagesfileList, setImagesFileList] = useState<UploadFile[]>([]);
    const [thumbnailFile, setThumbnailFile] = useState<UploadFile[]>([]);
    const handleChangeImages: UploadProps['onChange'] = ({ fileList: newFileList }) => setImagesFileList(newFileList);
    const handleChangeThumbnail: UploadProps['onChange'] = ({ fileList: newFileList }) => setThumbnailFile(newFileList);
    const toast = useToast();
    const { id } = useParams();
    const { data: productResponse } = useGetDetailProduct(id as string);

    const handlePreview = async (file: UploadFile, multiple: boolean) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }
        if (multiple) {
            setPreviewImages(file.url || (file.preview as string));
            setPreviewImagesOpen(true);
        } else {
            setPreviewThumbnail(file.url || (file.preview as string));
            setPreviewThumbnailOpen(true);
        }
    };

    const onFinish: FormProps<ProductData>['onFinish'] = (values) => {
        const formData = new FormData();
        const {
            name,
            images,
            price,
            thumbnail,
            description,
            productCode,
            tagId: tagIdData,
            categoryId,
            author,
            stock,
            isHide,
        } = values;

        formData.append('name', name);
        formData.append('productCode', productCode);
        formData.append('description', description || '');
        formData.append('stock', String(stock));
        formData.append('price', String(price));
        formData.append('categoryId', categoryId);
        formData.append('author', author);
        formData.append('tagId', JSON.stringify(tagIdData));
        formData.append('isHide', JSON.stringify(isHide));

        if (images?.fileList) {
            /* eslint-disable */
            for (const file of images?.fileList) {
                if ((file as any).originFileObj) {
                    formData.append('images', (file as any).originFileObj as File);
                }
            }
        }

        if (thumbnail?.file && (thumbnail?.fileList[0] as IThumbnailAntd).originFileObj) {
            formData.append('thumbnail', (thumbnail?.fileList[0] as IThumbnailAntd)?.originFileObj as File);
        }

        console.log(values, 'values');
        if (isFromHasChange) {
            updateProduct({ data: formData, id: id as string });
        } else {
            toast('info', 'Bạn đang không thay đổi gì cả');
        }
    };

    const handleFormChange = () => {
        if (!isFromHasChange) {
            setIsFromHasChange(true);
        }
    };

    useEffect(() => {
        if (error) {
            toast('error', error.message);
        }
    }, [error]);

    useEffect(() => {
        if (productResponse) {
            if (productResponse) {
                form.setFieldsValue({
                    name: productResponse.name,
                    author: productResponse.author,
                    price: productResponse.price,
                    description: productResponse.description,
                    discount: productResponse.discount,
                    categoryId: productResponse.categoryId._id,
                    productCode: productResponse.productCode,
                    stock: productResponse.stock,
                    tagId: productResponse.tagId.map((tag) => tag._id),
                    isHide: productResponse.isHide,
                });

                const imagesConvert = productResponse.images?.map((url) =>
                    convertApiResponseToFileList({ url })
                ) as UploadFile<any>[];
                const thumbnailConvert = convertApiResponseToFileList({
                    url: productResponse?.thumbnail,
                    isArr: true,
                }) as UploadFile<any>[];

                setImagesFileList(imagesConvert || []);
                setThumbnailFile(thumbnailConvert);
            }
        }
    }, [productResponse]);
    return (
        <div className='rounded-md bg-white p-5'>
            <Form form={form} layout='vertical' onFinish={onFinish} onValuesChange={handleFormChange}>
                <Form.Item
                    label='Tên sản phẩm'
                    name='name'
                    rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label='Ảnh sản phẩm' name='thumbnail' rules={updateProductThumbnailRules}>
                    <Upload
                        beforeUpload={() => false}
                        listType='picture-card'
                        fileList={thumbnailFile}
                        onPreview={(files) => handlePreview(files, false)}
                        onChange={handleChangeThumbnail}
                        maxCount={1}
                    >
                        {thumbnailFile.length >= 1 ? null : UploadButton}
                    </Upload>
                </Form.Item>

                {previewThumbnail && (
                    <Image
                        wrapperStyle={{ display: 'none' }}
                        preview={{
                            visible: previewThumbnailOpen,
                            onVisibleChange: (visible) => setPreviewThumbnailOpen(visible),
                            afterOpenChange: (visible) => !visible && setPreviewThumbnail(''),
                        }}
                        src={previewThumbnail}
                    />
                )}

                <Form.Item label='Danh sách ảnh' name='images' rules={updateProductproductImagesRules}>
                    <Upload
                        beforeUpload={() => false}
                        listType='picture-card'
                        fileList={imagesfileList}
                        onPreview={(files) => handlePreview(files, true)}
                        onChange={handleChangeImages}
                        maxCount={5}
                        multiple
                    >
                        {imagesfileList?.length >= 5 ? null : UploadButton}
                    </Upload>
                </Form.Item>
                {previewImages && (
                    <Image
                        wrapperStyle={{ display: 'none' }}
                        preview={{
                            visible: previewImagesOpen,
                            onVisibleChange: (visible) => setPreviewImagesOpen(visible),
                            afterOpenChange: (visible) => !visible && setPreviewImages(''),
                        }}
                        src={previewImages}
                    />
                )}

                <Form.Item
                    label='Danh mục'
                    name='categoryId'
                    rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
                >
                    <Select
                        placeholder='Chọn danh mục'
                        options={categories?.data.map((category) => ({ label: category.name, value: category._id }))}
                    ></Select>
                </Form.Item>

                <Form.Item label='Thẻ' name='tagId' rules={[{ required: true, message: 'Vui lòng chọn thẻ' }]}>
                    <Select
                        mode='multiple'
                        placeholder='Chọn thẻ'
                        options={tags?.data.map((tag) => ({ label: tag.name, value: tag._id }))}
                    ></Select>
                </Form.Item>

                <Form.Item
                    label='Số lượng trong kho'
                    name='stock'
                    rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
                >
                    <InputNumber min={1} max={1000} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label='Giá' name='price' rules={[{ required: true, message: 'Vui lòng nhập giá' }]}>
                    <InputNumber min={1} max={10000000} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label='Giảm giá'
                    name='discount'
                    initialValue={1}
                    rules={[{ required: true, message: 'Vui lòng nhập giảm giá' }]}
                >
                    <InputNumber min={1} max={100} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label='Tác giả' name='author' rules={[{ required: true, message: 'Vui lòng nhập tác giả' }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Mã sản phẩm'
                    name='productCode'
                    rules={[{ required: true, message: 'Vui lòng nhập mã sản phẩm' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label='Mô tả' name='description'>
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item name='isHide' valuePropName='checked'>
                    <Checkbox>Ẩn sản phẩm</Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button type='primary' loading={isPending} disabled={isPending} htmlType='submit'>
                        Cập nhật sản phẩm
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdateProduct;
