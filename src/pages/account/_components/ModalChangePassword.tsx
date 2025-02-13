import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '~/context/ToastProvider';
import useWindowSize from '~/hooks/common/useWindowSize';
import { useResetPassword } from '~/hooks/mutations/auth/useResetPassword';

const changePasswordSchema = z
    .object({
        oldPassword: z.string({ message: 'Mật khẩu không được để trống' }).min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
        newPassword: z.string({ message: 'Mật khẩu không được để trống' }).min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
        confirmNewPassword: z.string({ message: 'Mật khẩu không được để trống' }),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: 'Mật khẩu xác nhận không khớp',
        path: ['confirmNewPassword'],
    });
export type ChangePasswordType = z.infer<typeof changePasswordSchema>;

export default function ModalChangePassword({ children }: { children: React.ReactNode }) {
    const windowSize = useWindowSize();
    const { mutate, isPending } = useResetPassword();
    const toast = useToast();
    const [open, setOpen] = useState(false);
    const {
        control,
        formState: { errors },
        handleSubmit,
        setError,
        reset,
    } = useForm<ChangePasswordType>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            newPassword: '',
            oldPassword: '',
            confirmNewPassword: '',
        },
    });
    const handleOk = () => {
        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const onSubmit = (values: ChangePasswordType) => {
        const payload = {
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
        };
        mutate(payload, {
            onSuccess: () => {
                toast('success', 'Đổi mật khẩu thành công');
                setOpen(false);
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (err: any) => {
                if (err.errors) {
                    err.errors.forEach((item: { field: keyof ChangePasswordType; message: string }) => {
                        setError(item.field, { type: 'server', message: item.message });
                    });
                }
            },
        });
    };
    return (
        <>
            <div className='w-full' onClick={() => setOpen(true)}>
                {children}
            </div>
            <Modal
                open={open}
                afterOpenChange={() => reset()}
                onOk={handleOk}
                centered
                confirmLoading={isPending}
                onCancel={handleCancel}
                footer={<></>}
                title='Thay Đổi mật khẩu'
                width={windowSize.windowWidth >= 768 ? '460px' : '90vw'}
            >
                <div>
                    <div className='text-center'>
                        <p className='mx-auto mb-8 w-[55%] text-sm text-gray-500'>
                            Bạn cần tạo mật khẩu từ 6 đến 16 ký tự để bảo vệ tài khoản tốt hơn.
                        </p>
                    </div>
                    <Form onFinish={handleSubmit(onSubmit)} layout='vertical'>
                        <Form.Item
                            label='Mật khẩu cũ'
                            required
                            validateStatus={errors.oldPassword ? 'error' : ''}
                            help={errors.oldPassword?.message}
                        >
                            <Controller
                                name='oldPassword'
                                control={control}
                                render={({ field }) => <Input.Password {...field} />}
                            />
                        </Form.Item>
                        <Form.Item
                            label='Mật khẩu mới'
                            required
                            validateStatus={errors.newPassword ? 'error' : ''}
                            help={errors.newPassword?.message}
                        >
                            <Controller
                                name='newPassword'
                                control={control}
                                render={({ field }) => <Input.Password {...field} />}
                            />
                        </Form.Item>
                        <Form.Item
                            label='Xác nhận mật khẩu mới'
                            required
                            validateStatus={errors.confirmNewPassword ? 'error' : ''}
                            help={errors.confirmNewPassword?.message}
                        >
                            <Controller
                                name='confirmNewPassword'
                                control={control}
                                render={({ field }) => <Input.Password {...field} />}
                            />
                        </Form.Item>
                        <Button
                            htmlType='submit'
                            loading={isPending}
                            className='mb-8 block w-full rounded-3xl border-black bg-black text-center text-white transition-colors duration-300 ease-linear hover:bg-[#16bcdc]'
                            size='large'
                        >
                            Cập nhật thông tin
                        </Button>
                    </Form>
                </div>
            </Modal>
        </>
    );
}
