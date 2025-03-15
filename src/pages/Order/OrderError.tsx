import { Button, Result, Watermark } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import useUpdateStockOnCancelOrderPayOs from '~/hooks/mutations/order/useUpdateStockOnCancelOrderPayOs';

export default function OrderError() {
    const navigate = useNavigate();
    const [searchParams, _] = useSearchParams();
    const { orderId } = useParams();
    const cancel = searchParams.get('cancel');
    const status = searchParams.get('status');
    const { mutate } = useUpdateStockOnCancelOrderPayOs();

    useEffect(() => {
        console.log(cancel);
        console.log(status);
        console.log(orderId);
        if (cancel && cancel === 'true' && status === 'CANCELLED' && orderId) {
            mutate({ orderId });
        }
    }, []);
    return (
        <Watermark content={['Bookstore', 'Oops :(!']}>
            <div className='h-[100vh]' />
            <Result
                status='error'
                title='Thanh toán thất bại!'
                subTitle='Liên hệ với chúng tôi để được hỗ trợ.'
                className='bg-gray-3 bg-opacity-65 fixed top-[50%] left-[50%] z-99999 -translate-x-[50%] -translate-y-[50%] rounded-md border border-transparent p-10'
                extra={[
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
