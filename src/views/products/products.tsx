"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Product } from "@/types";
import { ProductModal } from "@/views/products/productModal/productModal";
import { BackToHome } from "@/components/backToHome/backToHome";
import { ProductList } from "@/views/products/productList/productList";
import { PaginationControls } from "@/views/products/paginationControls/paginationControls";
import { usePagination } from "@/hooks/usePagination";
import { PRODUCTS_DATA } from "@/data/productsData";
import { useRouter, useSearchParams } from 'next/navigation';

export const Products: React.FC = () => {  
  const router = useRouter();  
  const searchParams = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    handlePageChange,
    setPageByProductId
  } = usePagination({ items: PRODUCTS_DATA, itemsPerPage: 5 });

  const handleOpenModal = useCallback((product: Product) => {
    setSelectedProduct(product);
    router.push(
      `/products?product-id=${product.id}`    
    ); 
  }, [router]);

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
    router.push(`/products`);
  }, [router]);
  const handleProductClick = (productId: string) => {
    setPageByProductId(productId);
  };

  useEffect(() => {
    const productId = searchParams.get('product-id');
    if (productId) {
      const product = PRODUCTS_DATA.find((p) => parseInt(p.id) === parseInt(productId));
      if (product) {
        setSelectedProduct(product);
        handleProductClick(productId)       
      }
    } else {
      setSelectedProduct(null);  
    }
  }, [searchParams]);
  
  return (
    <div>
      <BackToHome />
      <ProductList products={paginatedProducts} onOpenModal={handleOpenModal} />
      <div className="h-4" />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};
