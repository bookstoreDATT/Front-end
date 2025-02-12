import _ from 'lodash';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Params } from '~/interfaces/api';
import { setQuery } from '~/store/slice/filterSlice';
import { useTypedSelector } from '~/store/store';

const useFilter = () => {
    const dispatch = useDispatch();
    const { query } = useTypedSelector((state) => state.filter);
    const { pathname } = useLocation();
    const [searchParams] = useSearchParams();
    const navigator = useNavigate();
    useEffect(() => {
        const params: Params = {};
        searchParams?.forEach((value, key) => {
            params[key] = value;
        });
        // @dispatch
        dispatch(setQuery(params));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const reset = () => {
        dispatch(setQuery({}));
        navigator(`${pathname}`);
    };

    const updateQueryParam = (params: Params) => {
        const newParams = new URLSearchParams(searchParams?.toString());
        const checkedParams = _.omitBy(params, (value) => value === undefined || value === '' || value === null);

        Object.entries(params).forEach(([key, value]) => {
            if (value) newParams.set(key, String(value));
            else {
                newParams.delete(key);
            }
        });
        dispatch(setQuery(checkedParams));
        navigator(`${pathname}?${newParams.toString()}`);
    };

    return { query, updateQueryParam, reset };
};

export default useFilter;
