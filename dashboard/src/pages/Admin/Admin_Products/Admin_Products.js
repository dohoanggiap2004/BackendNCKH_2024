import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import EditProductModal from "../../../components/Admin/Modal/EditProductModal";
import ConfirmModal from "../../../components/Admin/Modal/ConfirmModal";
import AddLaptop from "../../../components/Admin/Modal/AddProduct";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteProduct, getProducts, getProductByModel} from "../../../store/actions/productAction";
import { getColors } from "../../../store/actions/colorAction";
import Pagination from "../../../components/Pagination/Pagination";
import {instanceAxios8000} from "../../../config/axiosConfig";
export default function Products() {
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.product);
    const { colors } = useSelector((state) => state.color);
    const [productId, setProductId] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [value, setValue] = useState('')
    const [products2, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize] = useState(16); // Số mục mỗi trang

    const searchProducts = async (value, page, size) => {
        try {
            const response = await instanceAxios8000.get(`/api/products`, {
                params: {
                    page: page,
                    limit: pageSize,
                },
            });
            setProducts(response.data.data);
            setTotalPages(response.data.totalPage);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        searchProducts(value, currentPage, pageSize);
    }, [currentPage, value, products]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
    }
    const handleSelected = (value) => {
        setIsDelete(value);
    }

    useEffect(() => {
        console.log('check product Id', productId);
    }, [productId])

    useEffect(() => {
        dispatch(getProducts());
        dispatch(getColors())
    }, [])

    // delete product by Id
    useEffect(() => {
        if (isDelete) {
            console.log('check productId', productId)
            const payload = {
                productId: productId
            }
            dispatch(deleteProduct(payload))
            setIsDelete(false)
        }
    }, [isDelete])

    const handleSearch = (value) => {
        setValue(value)
    }

    return (
        <>
            <Sidebar handleSearch={handleSearch}/>
            <div className="px-8 lg:ml-72 mt-16 md:mt-0">
                <div className={'bg-white rounded-2xl shadow-md pb-6'}>
                    <div className="flex py-6 ms-6">
                        <p className="font-semibold text-2xl">Quản lý Sản Phẩm</p>
                        <div className="ms-auto px-2 me-4">
                            <AddLaptop/>
                        </div>
                    </div>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead
                                className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Tên sản phẩm
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Giới tính
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Ảnh
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Giá
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Số lượng trong kho
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Giới thiệu
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Hành động
                                </th>
                            </tr>
                            </thead>
                            {!Array.isArray(products2) || products2.length === 0 ? (
                                    <div className={'flex items-center justify-center mt-4 '}>
                                        <h1>Không tìm thấy</h1>
                                    </div>
                                ) :
                                <tbody>
                                {products2.map((product) => (
                                    <tr
                                        key={product.productId}
                                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 font-bold"
                                        style={{color: '#242E52'}}
                                    >
                                        <th
                                            className="px-6 py-4 whitespace-nowrap dark:text-white"
                                        >
                                            {product.productName}
                                        </th>
                                        <td className="px-6 py-4">{product.gender}</td>
                                        <td className="px-6 py-4">
                                            <img className={'object-cover w-16 h-16'} src={product.colors[0].imageURL}/>
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.price ?
                                                (
                                                    Number(product.price) || 0
                                                ).toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})
                                                : '0 VND'}
                                        </td>


                                        <td className="px-6 py-4">{product.stockQuantity}</td>
                                        <td className="px-6 py-4">{product.introduction}</td>
                                        <td className="px-6 py-4">
                                            <div className='flex items-center gap-4'>
                                                <EditProductModal product={product}/>
                                                <a
                                                    onClick={() => {
                                                        toggleModal();
                                                        setProductId(product.productId)
                                                    }}
                                                    className="font-medium text-red-600 dark:text-blue-500 hover:bg-red-300 border border-red-600 rounded-md p-1 "
                                                >
                                                    Xóa
                                                </a>
                                                <ConfirmModal
                                                    isOpen={isModalOpen}
                                                    toggleModal={() => {
                                                        toggleModal();
                                                    }}
                                                    handleSelected={handleSelected}
                                                    confirmText="Bạn có chắc chắn muốn xóa?"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            }
                        </table>
                        <div className={'mt-4'}>
                            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
