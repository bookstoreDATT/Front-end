import { ProductOutlined, ProfileOutlined, ShoppingOutlined } from '@ant-design/icons';

export type IChildrenItem = {
    label: string;
    route: string;
};
export type IMenuItem = {
    icon: JSX.Element;
    label: string;
    route?: string;
    children?: IChildrenItem[];
};

export const menuGroups: IMenuItem[] = [
    {
        icon: <ProfileOutlined />,
        label: 'Quản lý đơn hàng',
        route: '/admin/orders',
    },
    {
        icon: <ShoppingOutlined />,
        label: 'Quản lý sản phẩm',
        children: [
            { label: 'Tất cả sản phẩm', route: '/admin/products' },
            { label: 'Tạo mới sản phẩm', route: '/admin/products/create' },
        ],
    },
    {
        icon: <ProductOutlined />,
        label: 'Quản lý danh mục',
        children: [
            { label: 'Tất cả danh mục', route: '/admin/categories' },
            {
                label: 'Thêm mới danh mục',
                route: '/admin/categories/create',
            },
        ],
    },
];
