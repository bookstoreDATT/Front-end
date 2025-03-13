import { Table } from 'antd';
import useGetAllCart from '~/hooks/queries/cart/useGetAllCart';
import { CartTableType, columns } from './components/CartDetailColumns';
import { formatCurrency } from '~/utils/formatCurrency';
import { Link } from 'react-router-dom';

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
                <div className='grid grid-cols-1 gap-10 xl:grid-cols-[70%_25%]'>
                    <div className='w-full'>
                        <Table<CartTableType>
                            rowKey='productId'
                            loading={isPending}
                            columns={columns}
                            dataSource={data}
                            pagination={false}
                            scroll={{
                                x: 'max-content',
                            }}
                        />
                    </div>
                    <div className='rounded border border-blue-400 p-3'>
                        {/* <span className='text-xl font-medium'>Hóa đơn</span> */}
                        <div className='mt-5'>
                            <div className='font-semibold'>
                                Tổng tiền:{' '}
                                <span className='text-base font-semibold'>
                                    {cartList &&
                                        cartList.items.length > 0 &&
                                        formatCurrency(
                                            cartList?.items.reduce((acc, curr) => {
                                                return acc + curr.productId.price * curr.quantity;
                                            }, 0)
                                        )}
                                </span>
                            </div>
                            {cartList && cartList.items.length > 0 && (
                                <Link
                                    to='/checkout'
                                    className='mt-5 block cursor-pointer rounded-md border-[1px] border-[#1a94ff] bg-[#f1f0ff] py-2 text-center font-medium text-[#1a94ff] duration-300 hover:bg-[#1a94ff] hover:text-white'
                                >
                                    Thanh toán
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartDetail;
