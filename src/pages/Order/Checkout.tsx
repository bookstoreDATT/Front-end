import { ShoppingOutlined } from '@ant-design/icons';
import { Card, Col, Layout, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import { useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useToast } from '~/context/ToastProvider';
import { useTypedSelector } from '~/store/store';
import ProductItemsCheckout from './ProductItemCheckout';
import ReceiverCheckoutInfo from './ReceiverCheckoutInfo';

const Checkout = () => {
    const [isAddressEmpty, setIsAdressEmpty] = useState(true);
    const isRunned = useRef(false);
    const cartItems = useTypedSelector((state) => state.cart.items);
    const toast = useToast();

    // PROTECTED LAYOUT
    const hasOutOfStock = cartItems?.some((item) => item.quantity === 0);

    if (cartItems.length === 0) {
        if (!isRunned.current) {
            toast('info', 'Không có sản phẩm nào trong giỏ hàng của bạn để thanh toán!');
            isRunned.current = true;
        }
        return <Navigate to={'/'} />;
    }

    if (hasOutOfStock) {
        if (!isRunned.current) {
            toast('info', 'Có sản phẩm trong giỏ hàng hiện đang hết hàng vui lòng kiểm tra lại!');
            isRunned.current = true;
        }
        return <Navigate to={'/cart/detail'} />;
    }

    isRunned.current = false;

    return (
        <Layout className='min-h-screen bg-gray-100'>
            <Content className='px-4 py-6 sm:px-6 sm:py-12 lg:px-8'>
                <div className='mx-auto max-w-7xl'>
                    <div className='mb-6 flex flex-col items-start justify-between sm:mb-8 sm:flex-row sm:items-center'>
                        <Title level={3} className='m-0 mb-4 sm:mb-0'>
                            <ShoppingOutlined className='mr-3' />
                            Thanh toán đơn hàng
                        </Title>
                    </div>

                    <Row gutter={[16, 16]}>
                        <Col xs={24} lg={15}>
                            <Card
                                className='shadow-md transition-shadow duration-300 hover:shadow-lg'
                                title={<Title level={4}>Thông tin đơn hàng</Title>}
                            >
                                <ReceiverCheckoutInfo setIsAdressEmpty={setIsAdressEmpty} />
                            </Card>
                        </Col>
                        <Col xs={24} lg={9}>
                            <Card
                                className='shadow-md transition-shadow duration-300 hover:shadow-lg lg:sticky lg:top-1'
                                title={<Title level={4}>Chi tiết thanh toán</Title>}
                            >
                                <ProductItemsCheckout isAddressEmpty={isAddressEmpty} />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    );
};

export default Checkout;
