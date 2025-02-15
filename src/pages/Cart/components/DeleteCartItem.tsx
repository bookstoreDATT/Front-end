import { DeleteOutlined } from '@ant-design/icons';
import useRemoveCartItem from '~/hooks/mutations/cart/useRemoveCartItem';

const RemoveCartItem = ({ productId }: { productId: string }) => {
    const { mutate: removeCartItem } = useRemoveCartItem();

    const handleRemoveCartItem = () => {
        removeCartItem({ productId });
    };

    return (
        <DeleteOutlined
            color='#fff'
            onClick={handleRemoveCartItem}
            className='cursor-pointer rounded-full p-1 text-base text-white'
        />
    );
};

export default RemoveCartItem;
