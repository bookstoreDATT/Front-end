import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Descriptions, Divider, Form, Input, Tag, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetProfile } from '~/hooks/queries/auth/useGetProfile';
import { setCheckoutInfo } from '~/store/slice/checkoutSlice';
import { useTypedSelector } from '~/store/store';
import { formatCurrency } from '~/utils/formatCurrency';

const { Title } = Typography;

type FieldType = {
    address: string;
    description: string;
};

const ReceiverCheckoutInfo: React.FC<{ setIsAdressEmpty: (value: boolean) => void }> = ({
    setIsAdressEmpty,
}: {
    setIsAdressEmpty: (value: boolean) => void;
}) => {
    const { data: userProfile, isLoading } = useGetProfile();
    const dispatch = useDispatch();
    const checkoutInfor = useTypedSelector((state) => state.checkout);
    const cartItems = useTypedSelector((state) => state.cart.items);
    const shippingFee = 30000;

    const handleFieldsChange = (_: FieldType, allValues: FieldType) => {
        if (allValues.address.length === 0) {
            setIsAdressEmpty(true);
        } else {
            setIsAdressEmpty(false);
            if (
                checkoutInfor.checkoutInfor.shippingAddress !== allValues.address ||
                checkoutInfor.checkoutInfor.description !== allValues.description
            )
                dispatch(
                    setCheckoutInfo({
                        ...checkoutInfor.checkoutInfor,
                        shippingAddress: allValues.address,
                        description: allValues.description || '',
                    })
                );
        }
    };

    useEffect(() => {
        if (userProfile) {
            dispatch(
                setCheckoutInfo({
                    ...checkoutInfor.checkoutInfor,
                    customerInfo: {
                        email: userProfile?.email as string,
                        phone: (userProfile?.phone as string) || '09874213123',
                        name: userProfile?.userName as string,
                    },
                    items: cartItems.map((item) => ({
                        productId: item.productId._id,
                        quantity: item.quantity,
                        name: item.productId.name as string,
                        image: item.productId.thumbnail as string,
                        price: item.productId.price,
                        isReviewDisabled: false,
                        isReviewed: false,
                    })),
                    totalPrice: cartItems.reduce((acc, curr) => {
                        const discountRate = curr.productId.discount / 100;
                        const discountedPrice = curr.productId.price - (curr.productId.price * discountRate) / 100;
                        return acc + curr.quantity * discountedPrice;
                    }, 0),
                })
            );
        }
    }, [isLoading, userProfile, cartItems]);

    return (
        <Card className='w-full shadow-md transition-shadow duration-300 hover:shadow-lg'>
            <Title level={3} className='mb-6 text-xl sm:text-2xl'>
                Thông tin đơn hàng
            </Title>

            <Descriptions
                title={
                    <Title level={5}>
                        <UserOutlined className='mr-2' />
                        Thông tin khách hàng
                    </Title>
                }
                bordered
                column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
            >
                <Descriptions.Item label='Tên khách hàng'>{userProfile?.userName}</Descriptions.Item>
                <Descriptions.Item label='Email'>{userProfile?.email}</Descriptions.Item>
                <Descriptions.Item label='Số điện thoại'>{userProfile?.phone}</Descriptions.Item>
            </Descriptions>

            <Divider />

            <Form name='basic' layout='vertical' onValuesChange={handleFieldsChange} autoComplete='off'>
                <Form.Item<FieldType>
                    label='Địa chỉ'
                    name='address'
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                >
                    <Input type='text' placeholder='Địa chỉ của bạn' />
                </Form.Item>
                <Form.Item<FieldType> label='Ghi chú' name='description'>
                    <TextArea rows={4} placeholder='Nhập ghi chú...' />
                </Form.Item>
            </Form>
            <Divider />

            <Descriptions
                title={
                    <Title level={5}>
                        <InfoCircleOutlined className='mr-2' />
                        Thông tin dịch vụ
                    </Title>
                }
                bordered
                column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
            >
                <Descriptions.Item label='Phí vận chuyển'>
                    <Tag color='orange'>{formatCurrency(shippingFee)}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label='Thời gian giao hàng dự kiến'>
                    <Tag color='orange'>3-5 ngày từ khi admin xác nhận đơn hàng</Tag>
                </Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export default ReceiverCheckoutInfo;
