import { Button, Form, Input } from 'antd';
import { FormProps } from 'antd/lib';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useUpdateCategory from '~/hooks/mutations/category/useUpdateCategory';
import { useGetDetailCategory } from '~/hooks/queries/category/useGetDetailCategory';

const UpdateCategory = () => {
    const { id } = useParams();
    const { mutate, isPending, error } = useUpdateCategory(id as string);
    const [form] = Form.useForm<{ name: string }>();
    const { data } = useGetDetailCategory(id as string);

    const onFinish: FormProps<{ name: string }>['onFinish'] = (values) => {
        mutate(values);
    };

    useEffect(() => {
        if (error) {
            form.setFields([
                {
                    name: (error as any)?.errors[0].field,
                    errors: [(error as any)?.errors[0].message],
                },
            ]);
        }
        if (data) {
            form.setFieldValue('name', data.name);
        }
    }, [error, data]);
    return (
        <div className='rounded-md bg-white p-4'>
            <Form form={form} layout='vertical' onFinish={onFinish}>
                <Form.Item
                    label='Tên danh mục'
                    name='name'
                    rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item className='mt-5'>
                    <Button type='primary' loading={isPending} disabled={isPending} htmlType='submit'>
                        Cập nhật sản phẩm
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdateCategory;
