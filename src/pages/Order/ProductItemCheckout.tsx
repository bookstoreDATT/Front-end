import { Button, Card, Divider, Image, List, Radio, RadioChangeEvent, Row, Space, Typography } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '~/store/store';
import { formatCurrency } from '~/utils/formatCurrency';
import CashPaymentModal from './CashPaymentModal';
import { setCheckoutInfo } from '~/store/slice/checkoutSlice';
import CardPaymentModal from './CardPaymentModal';

const { Text, Title } = Typography;

const ProductItemsCheckout: React.FC<{ isAddressEmpty: boolean }> = ({
    isAddressEmpty,
}: {
    isAddressEmpty: boolean;
}) => {
    const cartItems = useTypedSelector((state) => state.cart.items);

    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'payos'>('cash');
    const [isOpen, setOpen] = useState(false);
    const [isPayosOpen, sePayostOpen] = useState(false);
    const checkoutInfor = useTypedSelector((state) => state.checkout.checkoutInfor);
    const dispatch = useDispatch();

    const onchangeRadioPayment = (e: RadioChangeEvent) => {
        const paymentMethodValue = e.target.value;
        if (!paymentMethodValue) return;

        setPaymentMethod(paymentMethodValue);
        dispatch(
            setCheckoutInfo({
                ...checkoutInfor,
                paymentMethod: paymentMethodValue,
            })
        );
    };

    const handleCheckOut = () => {
        if (paymentMethod === 'payos') {
            sePayostOpen(true);
        } else {
            setOpen(true);
        }
    };

    return (
        <div className='flex h-full flex-col'>
            <Title level={4} className='mb-4'>
                Đơn hàng của bạn
            </Title>

            <div className='mb-4 flex-grow overflow-auto' style={{ maxHeight: '400px' }}>
                <List
                    itemLayout='horizontal'
                    dataSource={cartItems}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Image width={60} src={item.productId.thumbnail} preview={false} />}
                                title={<Text strong>{item.productId.name}</Text>}
                                description={
                                    <>
                                        <div className='mt-2'>
                                            <Text>Đơn giá: {formatCurrency(item.productId.price)}</Text>
                                            <Text className='ml-4'>Số lượng: {item.quantity}</Text>
                                        </div>
                                    </>
                                }
                            />
                            <div>
                                <Text strong>{formatCurrency(item.productId.price * item.quantity)}</Text>
                            </div>
                        </List.Item>
                    )}
                />
            </div>

            <div>
                <Divider />

                <Space direction='vertical' className='w-full'>
                    <div className='flex justify-between'>
                        <Text>Tạm tính:</Text>
                        <Text>{formatCurrency(checkoutInfor.totalPrice)}</Text>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-lg font-semibold'>Phương thức thanh toán</h3>
                        <div className='mt-2'>
                            <Radio.Group
                                className='flex flex-col gap-2'
                                defaultValue={'cash'}
                                onChange={onchangeRadioPayment}
                            >
                                <Radio value={'cash'}>Thanh toán khi nhận hàng</Radio>
                                <Radio value={'payos'}>Thanh toán online qua Payos</Radio>
                            </Radio.Group>
                        </div>
                    </div>
                    <Row justify='space-between' align='middle'>
                        <h3 className='text-2xl font-semibold'>Tổng cộng:</h3>
                        <h3 className='text-2xl font-semibold text-red-500'>
                            {formatCurrency(checkoutInfor.totalPrice)}
                        </h3>
                    </Row>
                </Space>
                <Card className='mt-4 border-blue-200 bg-blue-50'>
                    <Button
                        type='primary'
                        disabled={isAddressEmpty}
                        onClick={handleCheckOut}
                        size='large'
                        block
                        className='h-12 text-lg font-semibold'
                    >
                        Đặt hàng
                    </Button>
                </Card>
            </div>
            <CashPaymentModal isOpen={isOpen} setOpen={setOpen} paymentMethod={paymentMethod} />
            <CardPaymentModal isOpen={isPayosOpen} setOpen={sePayostOpen} paymentMethod={paymentMethod} />
        </div>
    );
};

export default ProductItemsCheckout;
