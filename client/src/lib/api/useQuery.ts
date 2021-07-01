import { useState, useEffect, useCallback, useReducer } from 'react';
import { server } from './server';

interface State<TData> {
    data: TData | null;
    loading: boolean;
    error: boolean;
}

type Action<TData> =
    { type: 'FETCH' } |
    { type: 'FETCH_SUCCESS', payload: TData } |
    { type: 'FETCH_ERROR' };

interface QueryResult<TData> extends State<TData> {
    refetch: () => void;
}

const reducer = <TData>() => (
    state: State<TData>,
    action: Action<TData>
): State<TData> => {
    switch (action.type) {
        case 'FETCH':
            return { ...state, loading: true }
        case 'FETCH_SUCCESS':
            return { data: action.payload, loading: false, error: false }
        case 'FETCH_ERROR':
            return { ...state, loading: false, error: true }
        default:
            throw new Error();
    }
}

const useQuery = <TData = any>(query: string): QueryResult<TData> => {
    const fetchReducer = reducer<TData>();

    const [state, dispatch] = useReducer(fetchReducer, {
        data: null,
        loading: false,
        error: false
    });

    const fetch = useCallback(() => {
        try {
            dispatch({ type: 'FETCH' });
            const fetchApi = async () => {
                const { data, error } = await server.fetch<TData>({ query });

                if (error && error.length) {
                    throw new Error(error[0].message);
                }

                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            };

            fetchApi();
        } catch(err) {
            dispatch({ type: 'FETCH_ERROR' });
            throw console.error(err);
        }
    }, [query]);

    useEffect(() => {
        fetch();
    }, [fetch]);

    return { ...state, refetch: fetch };
};

export default useQuery;