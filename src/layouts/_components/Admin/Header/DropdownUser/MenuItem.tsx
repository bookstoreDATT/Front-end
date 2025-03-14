import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const MenuItem = () => {
    return (
        <li>
            <Link
                to={'/account'}
                className='hover:text-primary flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out lg:text-base'
            >
                <UserOutlined className='fill-current' />
                My Profile
            </Link>
        </li>
    );
};

export default MenuItem;
