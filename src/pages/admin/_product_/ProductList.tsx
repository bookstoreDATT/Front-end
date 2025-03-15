import TableDisplay from '~/components/TableDisplay';
import useTable from '~/hooks/common/useTable';

import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { useGetAllCategory } from '~/hooks/queries/category/useGetAllCategory';
import useGetProductsForAdmin from '~/hooks/queries/products/useGetProductsForAdmin';
import { IProduct } from '~/interfaces/product';
import WrapperPageAdmin from '../_common/WrapperPageAdmin';
import { ProductsListColumns } from './_components/ProductListColumns';

const ProductList = () => {
    const { onSelectPaginateChange, query, onFilter, getColumnSearchProps, getFilteredValue } = useTable<IProduct>();

    const currentPage = Number(query.page || 1);
    const { data: allProducts } = useGetProductsForAdmin(query);
    const { data: categories } = useGetAllCategory({});

    const categoriesFilter =
        categories?.data.map((cate) => ({
            text: cate.name,
            value: cate._id,
        })) || [];

    const columns = ProductsListColumns({
        categoriesFilter,
        query,
        getColumnSearchProps,
        getFilteredValue,
    }) as ColumnsType<IProduct>;

    return (
        <WrapperPageAdmin
            title='Quản lý sản phẩm'
            option={
                <Link to={'/admin/products/create'}>
                    <Button icon={<PlusOutlined />} type='primary'>
                        Thêm mới sản phẩm
                    </Button>
                </Link>
            }
        >
            <TableDisplay<IProduct>
                onFilter={onFilter}
                columns={columns}
                currentPage={currentPage}
                dataSource={allProducts?.data}
                onSelectPaginateChange={onSelectPaginateChange}
                totalDocs={allProducts?.totalDocs}
            />
        </WrapperPageAdmin>
    );
};

export default ProductList;
