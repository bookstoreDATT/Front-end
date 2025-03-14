// import TableDisplay from '~/components/TableDisplay';
// import useTable from '~/hooks/common/useTable';

// import { PlusOutlined } from '@ant-design/icons';
// import { Button } from 'antd';
// import { ColumnsType } from 'antd/es/table';
// import { Link } from 'react-router-dom';

// const ProductList = () => {
//     const { onSelectPaginateChange, query, onFilter, getColumnSearchProps, getFilteredValue } = useTable<IProduct>();

//     const currentPage = Number(query.page || 1);
//     const { data: allProducts } = useGetProductsForAdmin(query);
//     const { mutate: mutateHideProduct } = useHideProduct();
//     const { mutate: mutateShowProduct } = useShowProduct();
//     const { data: categories } = useGetCategories({ limit: '100000' });
//     const { data: tags } = useGetTags({ limit: '100000' });

//     const categoriesFilter =
//         categories?.data.categories.map((cate) => ({
//             text: cate.name,
//             value: cate._id,
//         })) || [];

//     const columns = ProductsListColumns({
//         categoriesFilter,
//         query,
//         getColumnSearchProps,
//         getFilteredValue,
//         mutateHideProduct,
//         mutateShowProduct,
//     }) as ColumnsType<IProduct>;

//     return (
//         <WrapperPageAdmin
//             title='Quản lý sản phẩm'
//             option={
//                 <Link to={ADMIN_ROUTES.PRODUCTS_CREATE}>
//                     <Button icon={<PlusOutlined />} type='primary'>
//                         Thêm mới sản phẩm
//                     </Button>
//                 </Link>
//             }
//         >
//             <TableDisplay<IProduct>
//                 onFilter={onFilter}
//                 columns={columns}
//                 currentPage={currentPage}
//                 dataSource={allProducts?.data.products}
//                 onSelectPaginateChange={onSelectPaginateChange}
//                 totalDocs={allProducts?.data.totalDocs}
//             />
//         </WrapperPageAdmin>
//     );
// };

// export default ProductList;
