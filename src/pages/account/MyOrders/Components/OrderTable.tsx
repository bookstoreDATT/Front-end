import useTable from '~/hooks/common/useTable';
import { DataType, orderColumns } from './_helper';

import { ColumnsType } from 'antd/es/table';
import TableDisplay from '~/components/TableDisplay';
import { useGetMyOrders } from '~/hooks/queries/orders/useGetMyOrders';

const OrderTable: React.FC = () => {
    const { query, onFilter, onSelectPaginateChange, getColumnSearchProps } = useTable<DataType>();
    const { data } = useGetMyOrders(query);

    const myOrders = data?.data?.map((order) => ({
        _id: order._id,
        paymentMethod: order.paymentMethod,
        orderStatus: order.orderStatus,
        totalPrice: order.totalPrice,
        createdAt: order.createdAt,
    }));

    const totalDocs = data?.totalDocs;
    const columns: ColumnsType<DataType> = orderColumns({ getColumnSearchProps, query }) || [];

    return (
        <>
            <TableDisplay
                onFilter={onFilter}
                onSelectPaginateChange={onSelectPaginateChange}
                columns={columns}
                totalDocs={totalDocs}
                dataSource={myOrders as DataType[]}
                currentPage={Number(query.page || 1)}
            ></TableDisplay>
        </>
    );
};

export default OrderTable;
