import { DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Image, Input, Upload, UploadFile, UploadProps } from 'antd';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import WrapperList from '~/components/wrapperList/WrapperList';
import { useUpdateProfile } from '~/hooks/mutations/user/useUpdateProfile';
import { useTypedSelector } from '~/store/store';
import { convertApiResponseToFileList, FileType, getBase64 } from '~/utils';
import ModalChangePassword from './_components/ModalChangePassword';

const profileSchema = z.object({
    userName: z.string().min(3, 'Tên người dùng phải có ít nhất 3 ký tự'),
    email: z.string().email('Email không hợp lệ'),
    avatar: z.any().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;
const Profile = () => {
    const profile = useTypedSelector((state) => state.auth.user);
    const [thumbnailFile, setThumbnailFile] = useState<UploadFile[]>([]);
    const [previewThumbnail, setPreviewThumbnail] = useState<string>('');
    const [previewThumbnailOpen, setPreviewThumbnailOpen] = useState<boolean>(false);
    const { mutate: handleUpdate, isPending } = useUpdateProfile();
    const [form] = Form.useForm();
    const {
        control,
        formState: { errors },
        setError,
        handleSubmit,
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            userName: profile?.userName,
            email: profile?.email,
            avatar: undefined,
        },
    });
    useEffect(() => {
        if (profile) {
            form.setFieldsValue({
                userName: profile.userName,
                email: profile.email,
            });
        }
    }, [profile, form]);
    useEffect(() => {
        if (profile) {
            const thumbnailConvert = convertApiResponseToFileList({
                url: profile.avatar!,
                urlRef: profile.avatar!,
                isArr: true,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }) as UploadFile<any>[];

            setThumbnailFile(thumbnailConvert);
        }
    }, [profile]);
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewThumbnail(file.url || (file.preview as string));
        setPreviewThumbnailOpen(true);
    };
    const onFinish = (data: ProfileFormData) => {
        const formDataUpdateProfile = new FormData();
        formDataUpdateProfile.append('userName', data.userName);
        formDataUpdateProfile.append('email', data.email);
        if (data.avatar) {
            formDataUpdateProfile.append('avatar', data.avatar);
        }

        handleUpdate(formDataUpdateProfile, {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (err: any) => {
                if (err.errors) {
                    err.errors.forEach((item: { field: keyof ProfileFormData; message: string }) => {
                        setError(item.field, { type: 'server', message: item.message });
                    });
                }
            },
        });
    };
    const customItemRender: UploadProps['itemRender'] = (originNode, file, fileList, actions) => {
        return (
            <div className='ant-upload-list-item ant-upload-list-item-undefined'>
                <img className='' src={file.thumbUrl || file.url} alt={file.name} />
                <span className='ant-upload-list-item-actions'>
                    <span
                        onClick={actions.preview}
                        className='ant-btn css-dev-only-do-not-override-mzwlov ant-btn-text ant-btn-sm ant-btn-icon-only ant-upload-list-item-action text-white'
                    >
                        <EyeOutlined />
                    </span>
                    <span
                        onClick={isPending ? undefined : actions.remove}
                        className='ant-btn css-dev-only-do-not-override-mzwlov ant-btn-text ant-btn-sm ant-btn-icon-only ant-upload-list-item-action text-white'
                    >
                        <DeleteOutlined />
                    </span>
                </span>
            </div>
        );
    };
    return (
        <>
            <WrapperList classic title='Thông tin của tôi' className='my-0'>
                {/* @Content */}
                <div className='flex items-center'>
                    <div className='w-[80%] rounded-2xl bg-white px-6 py-4'>
                        <Form form={form} layout='vertical' className='w-full' onFinish={handleSubmit(onFinish)}>
                            <Form.Item
                                label='Ảnh đại diện'
                                name='avatar'
                                className='font-medium text-[#08090F]'
                                dependencies={['thumbnail']}
                            >
                                <Controller
                                    name='avatar'
                                    control={control}
                                    render={({ field: { onChange } }) => (
                                        <Upload
                                            beforeUpload={() => false}
                                            listType='picture-card'
                                            itemRender={customItemRender}
                                            fileList={thumbnailFile}
                                            onPreview={(file) => handlePreview(file)}
                                            onChange={({ fileList }) => {
                                                setThumbnailFile(fileList);
                                                const file = fileList[0]?.originFileObj || undefined;
                                                onChange(file);
                                            }}
                                            maxCount={1}
                                        >
                                            {thumbnailFile.length >= 1 ? null : (
                                                <button type='button' style={{ border: 0, background: 'none' }}>
                                                    <PlusOutlined />
                                                    <div style={{ marginTop: 8 }}>Upload</div>
                                                </button>
                                            )}
                                        </Upload>
                                    )}
                                />
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

                            <Form.Item
                                label='Tên người dùng'
                                required
                                validateStatus={errors.userName ? 'error' : ''}
                                help={errors.userName?.message}
                            >
                                <Controller
                                    name='userName'
                                    control={control}
                                    render={({ field }) => (
                                        <Input disabled={isPending} placeholder='Email' {...field} />
                                    )}
                                />
                            </Form.Item>
                            <Form.Item
                                label='Email'
                                required
                                validateStatus={errors.email ? 'error' : ''}
                                help={errors.email?.message}
                            >
                                <Controller
                                    name='email'
                                    control={control}
                                    render={({ field }) => <Input disabled placeholder='Email' {...field} />}
                                />
                            </Form.Item>

                            <Form.Item>
                                <div className='flex flex-wrap justify-between gap-5 md:flex-nowrap'>
                                    <Button
                                        loading={isPending}
                                        className='block w-full rounded-3xl bg-black text-center text-white transition-colors duration-300 ease-linear hover:bg-[#16bcdc]'
                                        size='large'
                                        htmlType='submit'
                                    >
                                        Cập nhật thông tin
                                    </Button>

                                    <ModalChangePassword>
                                        <Button
                                            type='primary'
                                            size='large'
                                            danger
                                            // onClick={showModal}
                                            className='w-full rounded-3xl'
                                        >
                                            Thay đổi mật khẩu
                                        </Button>
                                    </ModalChangePassword>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                {/* <Modal
                    open={open}
                    onOk={handleOk}
                    centered
                    onCancel={handleCancel}
                    footer={
                        <Button
                            className='mb-8 block w-full rounded-3xl border-black bg-black text-center text-white transition-colors duration-300 ease-linear hover:bg-[#16bcdc]'
                            size='large'
                        >
                            Cập nhật thông tin
                        </Button>
                    }
                >
                    <div>
                        <div className='text-center'>
                            <h3 className='mt-[52px] mb-2 block text-xl font-medium'>Thay đổi mật khẩu</h3>
                            <p className='mx-auto mb-8 w-[55%] text-sm text-gray-500'>
                                Bạn cần tạo mật khẩu từ 6 đến 16 ký tự để bảo vệ tài khoản tốt hơn.
                            </p>
                        </div>
                        <Form layout='vertical'>
                            <Form.Item className='mt-1'>
                                <Input.Password placeholder='Mật khẩu cũ' className='py-3' />
                            </Form.Item>
                            <Form.Item className='mt-1'>
                                <Input.Password placeholder='Mật khẩu mới' className='py-3' />
                            </Form.Item>
                            <Form.Item className='mt-1'>
                                <Input.Password placeholder='Nhập lại mật khẩu' className='py-3' />
                            </Form.Item>
                        </Form>
                    </div>
                </Modal> */}
            </WrapperList>
        </>
    );
};

export default Profile;
