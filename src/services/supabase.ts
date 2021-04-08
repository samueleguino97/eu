import { definitions } from '@/supabase-types';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const options = {};

const supabase = createClient(
  'https://nfvqylvwkkpdzbfpytis.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNzM5ODI2NSwiZXhwIjoxOTMyOTc0MjY1fQ.OSgC7lNWoUCpE6DnSiEjPNzX4iGhRJHdO5Pp9F6vWiI',
  options,
);

export function useSupabase() {
  return supabase;
}

type SupabaseQueryExtra = {
  head?: boolean;
  count?: 'exact' | 'planned' | 'estimated';
};
type SupabaseQueryOptions = {
  columns: string;
  extra?: SupabaseQueryExtra;
  params?: any;
};

export function useSupabaseQuery<T>(
  table: string,
  options: SupabaseQueryOptions,
) {
  const [res, setRes] = useState<T[]>([]);

  useEffect(() => {
    const query = supabase
      .from<T>(table)
      .select(options.columns, options.extra);

    if (options.params) {
      Object.keys(options.params).forEach((key) => {
        query.eq(key as keyof T, options.params[key]);
      });
    }

    query.then(({ data, error }) => {
      setRes(data);
    });
  }, []);

  return res;
}

export function useSupabaseTable<T>(tableName: string) {
  return supabase.from<T>(tableName);
}

export function useSupabaseData<T>(tableName, options: SupabaseQueryOptions) {
  const table = useSupabaseTable<T>(tableName);

  const [res, setRes] = useState<T[]>([]);

  useEffect(() => {
    const query = supabase
      .from<T>(tableName)
      .select(options.columns, options.extra);

    if (options.params) {
      Object.keys(options.params).forEach((key) => {
        query.eq(key as keyof T, options.params[key]);
      });
    }

    query.then(({ data, error }) => {
      setRes(data);
    });
  }, [options]);

  type SupabaseData = [
    typeof res,
    typeof table.insert,
    typeof table.update,
    typeof table.delete,
    typeof table.on,
  ];

  const returnData: SupabaseData = [
    res,
    table.insert,
    table.update,
    table.delete,
    table.on,
  ];

  return returnData;
}

export default supabase;
