'use client';

import { Product } from '@/constants/data';
import { DataTable as ProductTable } from '@/components/ui/table/data-table';
import { columns } from './product-tables/columns';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

type ProductListingPage = {};

export default function ProductListingPage({}: ProductListingPage) {
  const { data: session } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!session) return; // Aguarda a sessão estar disponível
      try {
        const response = await fetch(
          'https://api-golang-1.onrender.com/products',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session?.user.id}`,
              'Establishment-ID': '6f2c6de9-0fad-4eee-859c-cbb41427db0e'
            }
          }
        );
        const data = await response.json();
        setProducts(data.products || []);
        setTotalProducts(data.total || 0);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, [session]);

  return (
    <ProductTable
      columns={columns}
      data={products}
      totalItems={totalProducts}
    />
  );
}
