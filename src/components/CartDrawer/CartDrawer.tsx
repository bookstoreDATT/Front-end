import { Drawer } from 'antd';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import useWindowSize from '~/hooks/common/useWindowSize';
import useGetAllCart from '~/hooks/queries/cart/useGetAllCart';
import { closeCart } from '~/store/slice/cartSlice';
import { useTypedSelector } from '~/store/store';
import CartItem from './components/CartItem';
import { useEffect } from 'react';

const CartDrawer = () => {
    const { windowWidth } = useWindowSize();
    const dispatch = useDispatch();
    const open = useTypedSelector((state) => state.cart.open);
    const { data, isPending, refetch } = useGetAllCart();
    let drawerWidth = '';
    const isEmpty = data?.items.length === 0;

    if (windowWidth >= 1024) {
        drawerWidth = '34vw';
    } else if (windowWidth >= 768) {
        drawerWidth = '40vw';
    } else if (windowWidth >= 640) {
        drawerWidth = '50vw';
    } else {
        drawerWidth = '100vw';
    }

    const handleCloseCart = () => {
        dispatch(closeCart());
    };

    // useEffect(() => {
    //     console.log(data);
    // }, [data]);
    // useEffect(() => {
    //     console.log('re-render');
    // }, [data]);

    return (
        <>
            <Drawer title='Giỏ hàng' width={drawerWidth} onClose={handleCloseCart} open={open}>
                <div>
                    {isEmpty && (
                        <div className='flex items-center justify-center select-none'>
                            <img src='/empty.png' alt='empty' className='mt-8 h-32 w-32' />
                        </div>
                    )}
                    <div className='h-full pb-[140px]'>
                        {!isPending && data && data.items.map((item, index) => <CartItem item={item} key={index} />)}
                        {/* {cartData?.map((item) => <CartItem item={item} key={item.productId._id} />)} */}
                    </div>
                    <div className='absolute right-0 bottom-0 left-0 border border-t border-black/10 bg-white'>
                        <div className='px-8 pt-4 pb-8'>
                            {!isEmpty && (
                                <Link to='/'>
                                    <div className='block cursor-pointer rounded-md border border-blue-500 bg-blue-500 px-2 py-2 text-center text-white hover:opacity-90'>
                                        Thanh toán
                                    </div>
                                </Link>
                            )}
                            <div
                                onClick={handleCloseCart}
                                className='hover:border-bg-[#1a94ff] mt-4 cursor-pointer rounded-md border border-[#1a94ff] bg-[#f1f0ff] px-2 py-2 text-center text-[#1a94ff] duration-300'
                            >
                                Tiếp tục mua hàng
                            </div>
                        </div>
                    </div>
                </div>
            </Drawer>
        </>
    );
};

export default CartDrawer;
