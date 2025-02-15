import { Image, TableProps } from 'antd';
import { formatCurrency } from '~/utils/formatCurrency';
import CartDetailQuantityItem from './CartDetailQuantityItem';
import RemoveCartItem from './DeleteCartItem';

export interface CartTableType {
    thumbnail: string;
    name: string;
    price: number;
    productId: string;
    quantity: number;
    stock: number;
}

export const columns: TableProps<CartTableType>['columns'] = [
    {
        title: 'Sản phẩm',
        dataIndex: 'product',
        key: 'product',
        render: (_, record, index) => {
            return (
                <div className='flex gap-10'>
                    <div className='w-16 min-w-10 rounded-md border border-black/50 p-2'>
                        <Image src={record.thumbnail} alt={`cart thumbnail`} className='w-full object-contain' />
                    </div>
                    <div>
                        <span className='block text-base font-medium'>{record.name}</span>
                        <span className='mt-1 block text-base font-medium'>{formatCurrency(record.price)}</span>
                    </div>
                </div>
            );
        },
    },
    {
        title: 'Số lượng',
        dataIndex: 'quantity',
        key: 'quantity',
        render: (_, record) => (
            <CartDetailQuantityItem productId={record.productId} quantityValue={record.quantity} stock={record.stock} />
        ),
    },
    {
        title: 'Tổng',
        dataIndex: 'subTotal',
        key: 'subTotal',
        render(_, record) {
            return <span className='font-medium'>{formatCurrency(record.price * record.quantity)}</span>;
        },
    },

    {
        title: '',
        key: 'action',
        width: '50px',
        render: (_, record) => <RemoveCartItem productId={record.productId} />,
    },
];
