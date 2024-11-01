const normalizeProductData = (results) => {
    const products = results.reduce((acc, row) => {
        // Tìm sản phẩm trong mảng
        let product = acc.find((p) => p.productId === row.productId);
    
        // Nếu chưa có, thêm sản phẩm vào danh sách
        if (!product) {
        const {imageURL, colorId, colorName, ...productInfo} = row
          product = {
            ...productInfo,
            colors: [], 
          };
          acc.push(product);
        }
    
        product.colors.push({
          colorId: row.colorId,
          colorName: row.colorName,
          imageURL: row.imageURL, 
        });
    
        return acc;
      }, []);
    
    return products;
}

module.exports = normalizeProductData
