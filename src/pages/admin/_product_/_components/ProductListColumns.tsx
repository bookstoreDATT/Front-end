import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, TableProps, Tag, Tooltip } from 'antd';
import { ColumnType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { Params } from '~/interfaces/api';
import { IProduct } from '~/interfaces/product';
import { formatCurrency } from '~/utils/formatCurrency';

interface IFilter {
    text: string;
    value: string;
}

export const ProductsListColumns = ({
    categoriesFilter,
    tagsFilter,
    query,
    getColumnSearchProps,
    getFilteredValue,
}: {
    categoriesFilter: IFilter[];
    tagsFilter?: IFilter[];
    query: Params;
    getColumnSearchProps: (dataIndex: string) => ColumnType<any>;
    getFilteredValue: (key: string) => string[] | undefined;
}): TableProps<IProduct>['columns'] => {
    return [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'search',
            width: '30%',
            ...getColumnSearchProps('name'),
            render: (text, record) => (
                <>
                    <div className='flex items-center gap-2'>
                        <div>
                            <h4 className='max-w-[300px] truncate text-[16px] font-semibold'>{text}</h4>
                            <p className='text-[10px]'>ID: {record._id}</p>
                        </div>
                    </div>
                </>
            ),
        },
        {
            title: 'Đã bán',
            key: 'sold',
            render: (_, record) => <p className='text-center'>{record.sold}</p>,
            responsive: ['md'],
        },
        {
            title: 'Giá tiền (VNĐ)',
            key: 'price',
            render: (_, record) => {
                return <>{formatCurrency(record.price)}</>;
            },
        },
        {
            title: 'Kho hàng',
            key: 'stock',
            render: (_, record) => (
                <>
                    <p className='my-4'>
                        {record?.stock > 0 ? record.stock : <span className='text-red'>Hết hàng</span>}
                    </p>
                </>
            ),
        },
        {
            title: 'Thẻ hàng',
            key: 'tags',
            filters: tagsFilter,
            filteredValue: getFilteredValue('tags'),
            render: (_, record) => {
                return <h4>{record.tagId.map((item) => item.name).join(', ')}</h4>;
            },
        },
        {
            title: 'Danh mục',
            key: 'category',
            filters: categoriesFilter,
            filteredValue: getFilteredValue('category'),
            render: (_, record) => {
                return <h4>{typeof record.categoryId === 'object' ? record.categoryId?.name : record.categoryId}</h4>;
            },
        },
        {
            title: 'Trạng thái',
            key: 'isActive',
            filteredValue: getFilteredValue('isActive'),
            filters: [
                { text: 'Ẩn', value: 'false' },
                { text: 'Hiện', value: 'true' },
            ],
            render: (_, record) => {
                return (
                    <>
                        <p className='text-red'>{record.isHide && 'Đã ẩn'}</p>
                        <p className='text-green-400'>{!record.isHide && 'Đang hiển thị'}</p>
                    </>
                );
            },
        },

        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space key={record._id} className='flex flex-col items-start justify-start'>
                    <Tooltip title='Cập nhật'>
                        <Link
                            to={`/admin/products/${record._id}/edit`}
                            className='text-blue-500 transition-colors duration-500 hover:text-blue-400'
                        >
                            Cập nhật
                        </Link>
                    </Tooltip>
                </Space>
            ),
        },
    ];
};
