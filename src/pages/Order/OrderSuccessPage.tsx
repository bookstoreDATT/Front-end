import { Button, Result, Watermark } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function OrderSuccess() {
    const navigate = useNavigate();

    return (
        <Watermark content={['Bookstore', 'Thank you!']}>
            <div className='h-[100vh]' />
            <Result
                status='success'
                title='Đơn đặt hàng của bạn đã gửi thành công!'
                subTitle='Bạn sẽ nhận được thông báo xác nhận qua email của chúng tôi.'
                className='bg-gray-3 bg-opacity-65 fixed top-[50%] left-[50%] z-99999 -translate-x-[50%] -translate-y-[50%] rounded-md border border-transparent p-10'
                extra={[
                    <Button
                        onClick={() => {
                            navigate('/account/my-orders', { replace: true });
                        }}
                        type='primary'
                        key='home'
                    >
                        Kiểm tra trạng thái
                    </Button>,
                    <Button
                        key='my-order'
                        onClick={() => {
                            navigate('/', { replace: true });
                        }}
                    >
                        Trang chủ
                    </Button>,
                ]}
            />
        </Watermark>
    );
}
