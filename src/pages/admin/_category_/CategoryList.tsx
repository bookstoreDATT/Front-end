import { Button, Space, Table } from 'antd';
import { TableProps } from 'antd/lib';
import { Link } from 'react-router-dom';
import { useGetAllCategory } from '~/hooks/queries/category/useGetAllCategory';

interface DataType {
    name: string;
    _id: string;
}
const CategoryList = () => {
    const { data, isLoading } = useGetAllCategory({});

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <span>{text}</span>,
        },

        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size='middle'>
                    <Link to={`/admin/categories/${record._id}/edit`}>Sửa</Link>
                </Space>
            ),
        },
    ];

    const tableData = data?.data.map((cat) => {
        return {
            name: cat.name,
            _id: cat._id,
        };
    });
    return (
        <>
            <div>
                <div>
                    <Button type='link' href='/admin/categories/create'>
                        Thêm danh mục
                    </Button>
                </div>
                <Table<DataType>
                    rowKey={(item) => item._id}
                    columns={columns}
                    loading={isLoading}
                    dataSource={tableData}
                />
            </div>
        </>
    );
};

export default CategoryList;
