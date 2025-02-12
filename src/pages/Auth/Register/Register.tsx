import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, Form, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import img from '~/assets/logo.png';
import { useRegister } from '~/hooks/mutations/auth/useRegister';
import { RegisterFormType, registerSchema } from '~/validations/auth';

export default function Register() {
    const { mutate, isPending } = useRegister();
    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<RegisterFormType>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = (values: RegisterFormType) => {
        console.log(values);
        const payload = {
            email: values.email,
            userName: values.userName,
            password: values.password,
        };
        mutate(payload, {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (err: any) => {
                if (err.errors) {
                    err.errors.forEach((item: { field: keyof RegisterFormType; message: string }) => {
                        setError(item.field, { type: 'server', message: item.message });
                    });
                }
            },
        });
    };
    return (
        <>
            <div className='mx-2 h-full max-w-[1240px] py-4 sm:mx-4 md:mx-6 xl:mx-auto'>
                <div className='mt-12 flex items-center justify-center md:grid md:grid-cols-[60%_40%]'>
                    <div className='hidden flex-col items-start justify-center gap-5 md:flex'>
                        <img src={img} className='w-2xs' alt='' />
                        <p className='text-2xl font-medium text-white'>
                            Trang mua sắm sách vở trực tuyến uy tín, nhanh chóng, hàng đầu.
                        </p>
                    </div>
                    <div className='w-full rounded-md bg-white p-6'>
                        <h1 className='mb-6 text-xl font-medium'>Đăng ký tài khoản</h1>
                        <Form onFinish={handleSubmit(onSubmit)} layout='vertical' autoComplete='off'>
                            {/* Input Username */}
                            <Form.Item
                                label='Tên người dùng'
                                required
                                validateStatus={errors.userName ? 'error' : ''}
                                help={errors.userName?.message}
                            >
                                <Controller
                                    name='userName'
                                    control={control}
                                    render={({ field }) => <Input {...field} />}
                                />
                            </Form.Item>

                            {/* Input Email */}
                            <Form.Item
                                label='Email'
                                required
                                validateStatus={errors.email ? 'error' : ''}
                                help={errors.email?.message}
                            >
                                <Controller
                                    name='email'
                                    control={control}
                                    render={({ field }) => <Input {...field} />}
                                />
                            </Form.Item>

                            {/* Input Password */}
                            <Form.Item
                                label='Mật khẩu'
                                required
                                validateStatus={errors.password ? 'error' : ''}
                                help={errors.password?.message}
                            >
                                <Controller
                                    name='password'
                                    control={control}
                                    render={({ field }) => <Input.Password {...field} />}
                                />
                            </Form.Item>

                            {/* Input Confirm Password */}
                            <Form.Item
                                label='Xác nhận mật khẩu'
                                required
                                validateStatus={errors.confirmPassword ? 'error' : ''}
                                help={errors.confirmPassword?.message}
                            >
                                <Controller
                                    name='confirmPassword'
                                    control={control}
                                    render={({ field }) => <Input.Password {...field} />}
                                />
                            </Form.Item>

                            {/* Checkbox Policy */}
                            <div className='flex items-center justify-between'>
                                <Form.Item validateStatus={errors.policy ? 'error' : ''} help={errors.policy?.message}>
                                    <Controller
                                        name='policy'
                                        control={control}
                                        render={({ field }) => (
                                            <Checkbox
                                                checked={field.value}
                                                onChange={(e) => field.onChange(e.target.checked)}
                                            >
                                                Đồng ý với điều khoản
                                            </Checkbox>
                                        )}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Link to={'/'}>Quên mật khẩu?</Link>
                                </Form.Item>
                            </div>
                            {/* Button Submit */}
                            <div>
                                <Form.Item>
                                    <button
                                        disabled={isPending}
                                        type='submit'
                                        className='w-full cursor-pointer rounded-md border-[1px] border-[#1a94ff] bg-[#f1f0ff] py-2 font-medium text-[#1a94ff] duration-300 hover:bg-[#1a94ff] hover:text-white'
                                    >
                                        Đăng ký
                                    </button>
                                </Form.Item>
                            </div>
                            <Form.Item>
                                <span>
                                    Bạn đã có tài khoản? <Link to={'/auth/login'}>Đăng nhập</Link>
                                </span>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}
