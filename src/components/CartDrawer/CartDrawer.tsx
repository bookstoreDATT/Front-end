import { Drawer } from 'antd';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import useWindowSize from '~/hooks/common/useWindowSize';
import useGetAllCart from '~/hooks/queries/cart/useGetAllCart';
import { closeCart, setCart } from '~/store/slice/cartSlice';
import { useTypedSelector } from '~/store/store';
import CartItem from './components/CartItem';
import { useCallback, useEffect, useState } from 'react';
import { formatCurrency } from '~/utils/formatCurrency';

const CartDrawer = () => {
    const { windowWidth } = useWindowSize();
    const dispatch = useDispatch();
    const open = useTypedSelector((state) => state.cart.open);
    const cartStored = useTypedSelector((state) => state.cart.items);
    const { data: cartList, isPending } = useGetAllCart();
    const [drawerWidth, setDrawerWidth] = useState('100vw');
    const isEmpty = cartList?.items.length === 0;

    const handleCloseCart = () => {
        dispatch(closeCart());
    };

    const handleResize = useCallback(() => {
        if (windowWidth >= 1024) {
            setDrawerWidth('34vw');
        } else if (windowWidth >= 768) {
            setDrawerWidth('40vw');
        } else if (windowWidth >= 640) {
            setDrawerWidth('50vw');
        } else {
            setDrawerWidth('100vw');
        }
    }, [windowWidth]);

    useEffect(() => {
        handleResize();
    }, [handleResize]);

    useEffect(() => {
        if (cartList?.items) {
            dispatch(setCart(cartList.items));
        }
    }, [cartList?.items, dispatch]);

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
                        {!isPending &&
                            cartList &&
                            cartList.items.map((item) => (
                                <CartItem item={item} key={item.productId._id + item.quantity} />
                            ))}
                        {/* {cartData?.map((item) => <CartItem item={item} key={item.productId._id} />)} */}
                    </div>
                    <div className='absolute right-0 bottom-0 left-0 border border-t border-black/10 bg-white'>
                        <div className='px-8 pt-4 pb-8'>
                            <div className='mt-2 mb-4 text-base font-medium'>
                                Tổng:{' '}
                                <span className='text-base font-medium'>
                                    {formatCurrency(
                                        cartStored?.reduce(
                                            (acc, curr) => {
                                                return acc + curr.productId.price * curr.quantity;
                                            },

                                            0
                                        ) as number
                                    )}
                                </span>
                            </div>
                            {!isEmpty && (
                                <Link to='/cart/detail' onClick={() => dispatch(closeCart())}>
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
