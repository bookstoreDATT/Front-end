import { Button, Space, Table } from 'antd';
import { TableProps } from 'antd/lib';
import { Link } from 'react-router-dom';
import useGetTags from '~/hooks/queries/tag/useGetTags';

interface DataType {
    name: string;
    _id: string;
}
const CategoryList = () => {
    const { data, isLoading } = useGetTags({});

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
                    <Link to={`/admin/tags/${record._id}/edit`}>Sửa</Link>
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
                    <Button type='link' href='/admin/tags/create'>
                        Thêm thể loại
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
