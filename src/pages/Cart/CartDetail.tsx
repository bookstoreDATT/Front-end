import { Table } from 'antd';
import useGetAllCart from '~/hooks/queries/cart/useGetAllCart';
import { CartTableType, columns } from './components/cartDetailColumns';

const CartDetail = () => {
    const { data: cartList, isPending } = useGetAllCart();
    const data = cartList?.items.map((item) => {
        return {
            productId: item.productId._id,
            name: item.productId.name as string,
            thumbnail: item.productId.thumbnail as string,
            price: item.productId.price,
            quantity: item.quantity,
            stock: item.productId.stock,
        };
    });

    return (
        <div className='m-auto w-full max-w-[1200px] bg-white px-2'>
            <div className=''>
                <div className='grid grid-cols-[70%_25%] gap-10'>
                    <div className='w-full'>
                        <Table<CartTableType>
                            rowKey='productId'
                            loading={isPending}
                            columns={columns}
                            dataSource={data}
                            pagination={false}
                        />
                    </div>
                    <div className='rounded border border-black/30 p-3'>
                        {/* <span className='text-xl font-medium'>Hóa đơn</span> */}
                        <div className='mt-5'>
                            <div>Thanh toán</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartDetail;
