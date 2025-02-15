import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, InputNumber } from 'antd';
import _ from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import useRemoveCartItem from '~/hooks/mutations/cart/useRemoveCartItem';
import useUpdateCartQuantity from '~/hooks/mutations/cart/useUpdateCartQuantity';
import { ICartItem } from '~/interfaces/cart';
import RemoveCartItem from '~/pages/Cart/components/DeleteCartItem';

type CartItemProps = {
    item: ICartItem;
};

const CartItem = ({ item }: CartItemProps) => {
    const [debouncedQuantity, setDebounceQuantity] = useState<number | null>(null);
    const [quantity, setQuantity] = useState(item.quantity);

    const { mutate } = useUpdateCartQuantity();
    const { mutate: removeCartItem } = useRemoveCartItem();

    const handleDebouncedUpdateQuantity = useMemo(() => {
        return _.debounce((itemData) => {
            mutate(itemData);
        }, 500);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDecreaseQuantity = () => {
        const newQuantity = quantity - 1;

        setQuantity(newQuantity);
        setDebounceQuantity(newQuantity);
    };

    const handleIncreaseQuantity = () => {
        const newQuantity = quantity + 1;

        setQuantity(newQuantity);
        setDebounceQuantity(newQuantity);
    };

    const handleRemoveCartItem = () => {
        removeCartItem({ productId: item.productId._id });
    };

    useEffect(() => {
        if (debouncedQuantity) {
            handleDebouncedUpdateQuantity({ productId: item.productId._id, quantity: debouncedQuantity });
        }
    }, [debouncedQuantity, handleDebouncedUpdateQuantity, item.productId._id]);

    return (
        <>
            <div className='relative mt-3'>
                <div className='flex items-center gap-3'>
                    <Link to={`/product/${item.productId._id}`}>
                        {' '}
                        <img src={item.productId.thumbnail} alt='hehe' className='w-12' />
                    </Link>
                    <div className='ml-3'>
                        <div className='text-base font-medium sm:mr-4 lg:mr-2'>
                            <span className='text-sm font-medium'>{item.productId.name}</span>
                        </div>
                        <div>
                            <div className='mt-2 flex items-center'>
                                <Button
                                    type='default'
                                    disabled={quantity < 2}
                                    icon={
                                        <MinusOutlined className='transform transition duration-500 hover:rotate-180' />
                                    }
                                    onClick={() => handleDecreaseQuantity()}
                                />
                                <ConfigProvider
                                    theme={{
                                        token: {
                                            colorBgContainerDisabled: 'white',
                                            colorTextDisabled: 'black',
                                        },
                                    }}
                                >
                                    <InputNumber min={1} disabled={true} value={quantity} className='' />
                                </ConfigProvider>

                                <Button
                                    type='default'
                                    disabled={quantity === item.productId.stock}
                                    icon={
                                        <PlusOutlined className='transform transition duration-500 hover:rotate-180' />
                                    }
                                    onClick={() => handleIncreaseQuantity()}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='text-white' onClick={handleRemoveCartItem}>
                    <RemoveCartItem productId={item.productId._id} />
                </div>
            </div>
        </>
    );
};

export default CartItem;
