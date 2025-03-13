import { Modal, Spin } from 'antd';
import useCreateCodOrder from '~/hooks/mutations/order/useCreateCodOrder';
import useCreatePayosOrder from '~/hooks/mutations/order/useCreatePayosOrder';
import { ICreatePayosOrderPayload, IOrderCreatePayload } from '~/interfaces/order';
// import { useCreateCodOrder } from '~/hooks/mutations/order/useCreateCodOrder';
// import { IOrderCreatePayload } from '~/interfaces/order';
import { useTypedSelector } from '~/store/store';
import { formatCurrency } from '~/utils/formatCurrency';

export default function CardPaymentModal({
    isOpen,
    setOpen,
    paymentMethod,
}: {
    isOpen: boolean;
    setOpen: (e: boolean) => void;
    paymentMethod: 'cash' | 'payos';
}) {
    const { mutate, isPending } = useCreatePayosOrder();
    const checkOutInfor = useTypedSelector((state) => state.checkout.checkoutInfor);

    const handleCancel = () => {
        setOpen(false);
    };
    const handleConfirm = () => {
        const payload: ICreatePayosOrderPayload = {
            items: checkOutInfor.items ? checkOutInfor.items : [],
            customerInfo: checkOutInfor.customerInfo,
            shippingAddress: checkOutInfor.shippingAddress,
            totalPrice: checkOutInfor.totalPrice,
            description: checkOutInfor.description,
            paymentMethod: checkOutInfor.paymentMethod,
            cancelUrl: 'http://localhost:3000/order-error',
            returnUrl: 'http://localhost:3000/order-success',
            amount: checkOutInfor.totalPrice,
        };
        mutate(payload);
    };
    return (
        <Modal open={isOpen} width={750} onCancel={handleCancel} footer={<></>} onClose={handleCancel} centered>
            <div>
                <h3 className='text-2xl font-bold'>Xác nhận đặt hàng</h3>
                <p className='mt-3 text-base'>
                    Bạn muốn thanh toán đơn hàng có {checkOutInfor.items.length} sản phẩm với tổng giá tiền là{' '}
                    <span className='font-semibold text-green-600'>{formatCurrency(checkOutInfor.totalPrice)}</span>
                    với phương thức thanh toán là{' '}
                    {paymentMethod === 'cash' ? (
                        <span className='font-semibold text-green-600'>Tiền mặt</span>
                    ) : (
                        'Online'
                    )}{' '}
                </p>
                <div className='flex justify-around gap-18'>
                    <div>
                        <p className='mt-2 text-lg font-semibold'>Địa chỉ:</p>
                        <p className='mt-2 text-base font-medium'>{checkOutInfor.shippingAddress}</p>
                    </div>
                    <div>
                        <p className='mt-2 text-lg font-semibold'>Thông tin nhận hàng:</p>
                        <ul className='mt-2 flex flex-col gap-1'>
                            <li>
                                <span className='text-base'>
                                    Tên người nhận:{' '}
                                    <span className='font-semibold text-black'>{checkOutInfor.customerInfo.name}</span>
                                </span>
                            </li>
                            <li>
                                <span className='text-base'>
                                    Email:{' '}
                                    <span className='font-semibold text-black'>{checkOutInfor.customerInfo.email}</span>
                                </span>
                            </li>
                            <li>
                                <span className='text-base'>
                                    Số điện thoại:{' '}
                                    <span className='font-semibold text-black'>
                                        {checkOutInfor.customerInfo.phone || '096473832'}
                                    </span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='mt-8 flex gap-5'>
                    <button
                        onClick={handleCancel}
                        className='w-2/3 cursor-pointer rounded-md border border-red-500 py-2 text-base text-red-500 duration-300 hover:bg-red-500 hover:text-white'
                    >
                        HỦY BỎ
                    </button>
                    <button
                        onClick={handleConfirm}
                        className='w-2/3 cursor-pointer rounded-md border border-black text-base duration-300 hover:bg-black hover:text-white'
                    >
                        {isPending ? <Spin /> : 'XÁC NHẬN'}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
