import { z } from 'zod';

export const registerSchema = z
    .object({
        userName: z
            .string({ message: 'Tên người dùng không được để trống' })
            .min(3, { message: 'Tên người dùng phải có ít nhất 3 ký tự' }),
        email: z.string({ message: 'Email không được để trống' }).email('Email không hợp lệ'),
        password: z.string({ message: 'Mật khẩu không được để trống' }).min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
        confirmPassword: z.string({ message: 'Mật khẩu không được để trống' }),
        policy: z.literal(true, {
            errorMap: () => ({ message: 'Bạn phải đồng ý với điều khoản' }),
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Mật khẩu xác nhận không khớp',
        path: ['confirmPassword'],
    });

export type RegisterFormType = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
    email: z.string({ message: 'Email không được để trống' }).email('Email không hợp lệ'),
    password: z.string({ message: 'Mật khẩu không được để trống' }).min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

export type LoginFormType = z.infer<typeof loginSchema>;
