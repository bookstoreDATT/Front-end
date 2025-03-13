import { DeleteOutlined } from '@ant-design/icons';
import { Popconfirm, PopconfirmProps } from 'antd';
import { useToast } from '~/context/ToastProvider';
import useRemoveCartItem from '~/hooks/mutations/cart/useRemoveCartItem';

const RemoveCartItem = ({ productId }: { productId: string }) => {
    const { mutate: removeCartItem } = useRemoveCartItem();
    const toast = useToast();

    const confirm: PopconfirmProps['onConfirm'] = () => {
        console.log('hehehe');
        removeCartItem(
            { productId },
            {
                onSuccess() {
                    toast('success', 'Xóa thành công');
                },
                onError() {
                    toast('error', 'Có lỗi xảy ra');
                },
            }
        );
    };

    return (
        <Popconfirm
            title=''
            placement='bottomLeft'
            description='Bạn có muốn xóa sản phẩm này khỏi giỏ hàng không?'
            onConfirm={confirm}
            okText='Đồng ý'
            cancelText='Hủy'
        >
            <DeleteOutlined className='cursor-pointer rounded-full p-1 text-base' />
        </Popconfirm>
    );
};

export default RemoveCartItem;
