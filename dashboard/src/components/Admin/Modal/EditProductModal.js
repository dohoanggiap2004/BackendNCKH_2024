import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { updateProduct } from "../../../store/actions/productAction";

const EditProductModal = ( { product } ) => {
  const dispatch = useDispatch();
  const { colors } = useSelector((state) => state.color);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    productId: product.productId,
    productName: product.productName,
    size: product.size,
    price: product.price,
    detail: product.detail,
    introduction: product.introduction,
    careInstruction: product.careInstruction,
    stockQuantity: product.stockQuantity,
    imageURL: product.colors[0].imageURL,
    colorName: product.colors[0].colorName,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const rawValue = name === "price" ? value.replace(/\./g, "") : value;
    setFormData({
      ...formData,
      [name]: name === "price" ? parseInt(rawValue || 0, 10) : rawValue,
    });
  };

  const handleSubmit = () => {
    // console.log(formData);
    dispatch(updateProduct(formData))
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };


  return (
      <div className="w-full relative">
        {/* Button to open the modal */}
        <a
            onClick={toggleModal}
            className="font-medium text-indigo-600 dark:text-blue-500 hover:bg-indigo-300-300 border border-indigo-500 rounded-md px-3 py-1"
        >
          Sửa
        </a>
        {/* Conditionally render the modal based on isOpen state */}
        {isOpen && (
            <div
                className="pd-overlay w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden  overflow-y-auto bg-gray-500 bg-opacity-50 flex justify-center items-center">
              <div className="opacity-100 transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                <div className="flex flex-col bg-white rounded-2xl py-4 px-5 min-w-[900px] overflow-y-auto">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <h4 className="text-xl text-gray-900 font-medium">
                      Chỉnh sửa thông tin sản phẩm
                    </h4>
                    {/* Button to close the modal */}
                    <button onClick={toggleModal} className="block cursor-pointer">
                      <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                            d="M7.75732 7.75739L16.2426 16.2427M16.2426 7.75739L7.75732 16.2427"
                            stroke="black"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <form
                      className="w-full flex flex-col gap-4"
                  >
                    <div className="grid grid-cols-2 gap-4 mt-1">
                      <div className="flex items-start flex-col justify-start">
                        <label
                            htmlFor="productName"
                            className="text-sm text-gray-700 dark:text-gray-200 mr-2"
                        >
                          Tên sản phẩm
                        </label>
                        <input
                            type="text"
                            id="productName"
                            required
                            name="productName"
                            value={formData.productName}
                            onChange={handleChange}
                            className="w-full text-sm px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex items-start flex-col justify-start">
                        <label
                            htmlFor="colorName"
                            className="text-sm text-gray-700 dark:text-gray-200 mr-2"
                        >
                          Màu sắc
                        </label>
                        <select
                            className="w-full text-lg px-3 dark:text-gray-200 dark:bg-gray-900 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            name="colorName"
                            value={formData.colorName}
                            onChange={handleChange}
                            required
                        >
                          <option value="">Chọn màu sắc</option>
                          {colors.map((prov) => (
                              <option value={prov.colorName}>{prov.colorName}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-1">
                      <div className="flex items-start flex-col justify-start">
                        <label
                            htmlFor="price"
                            className="text-sm text-gray-700 dark:text-gray-200 mr-2"
                        >
                          Giá bán
                        </label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            required
                            value={formData.price.toLocaleString('vi-VN')}
                            onChange={handleChange}
                            className="w-full text-sm px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex items-start flex-col justify-start">
                        <label
                            htmlFor="detail"
                            className="text-sm text-gray-700 dark:text-gray-200 mr-2"
                        >
                          Chi tiết
                        </label>
                        <input
                            type="text"
                            id="detail"
                            required
                            name="detail"
                            value={formData.detail}
                            onChange={handleChange}
                            className="w-full text-sm px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                      <div className="flex items-start flex-col justify-start">
                        <label
                            htmlFor="introduction"
                            className="text-sm text-gray-700 dark:text-gray-200 mr-2"
                        >
                          Giới thiệu
                        </label>
                        <input
                            type="text"
                            id="introduction"
                            required
                            name="introduction"
                            value={formData.introduction}
                            onChange={handleChange}
                            className="w-full text-sm px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex items-start flex-col justify-start">
                        <label
                            htmlFor="careInstruction"
                            className="text-sm text-gray-700 dark:text-gray-200 mr-2"
                        >
                          Bảo quản
                        </label>
                        <input
                            type="text"
                            id="careInstruction"
                            required
                            name="careInstruction"
                            value={formData.careInstruction}
                            onChange={handleChange}
                            className="w-full text-sm px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>


                    <div className="grid grid-cols-2 gap-4 mt-1">
                      <div className="flex items-start flex-col justify-start">
                        <label
                            htmlFor="stockQuantity"
                            className="text-sm text-gray-700 dark:text-gray-200 mr-2"
                        >
                          Số lượng còn lại
                        </label>
                        <input
                            type="text"
                            id="stockQuantity"
                            required
                            name="stockQuantity"
                            value={formData.stockQuantity}
                            onChange={handleChange}
                            className="w-full text-sm px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      <div className="flex items-start flex-col justify-start">
                        <label
                            htmlFor="gender"
                            className="text-sm text-gray-700 dark:text-gray-200 mr-2"
                        >
                          Giới tính
                        </label>
                        <select
                            id="gender"
                            required
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full text-sm px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value={'Male'}>Nam</option>
                          <option value={'Female'}>Nữ</option>

                        </select>
                      </div>
                      {" "}

                    </div>
                    <div className="flex items-start flex-col justify-start">
                      <label
                          htmlFor="imageURL"
                          className="text-sm text-gray-700 dark:text-gray-200 mr-2"
                      >
                        Link ảnh
                      </label>
                      <input
                          type="text"
                          id="imageURL"
                          required
                          name="imageURL"
                          value={formData.imageURL}
                          onChange={handleChange}
                          className="w-full text-sm px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    {" "}
                  </form>
                  {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                  <div className="flex items-center justify-end pt-4 border-t border-gray-200 space-x-4">
                    <button
                        type="button"
                        onClick={() => {
                          toggleModal();
                        }}
                        className="py-2.5 px-5 text-sm bg-indigo-50 text-indigo-500 rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-100"
                    >
                      Hủy bỏ
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                          toggleModal();
                          handleSubmit();
                        }}
                        className="py-2.5 px-8 text-sm bg-rose-600 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-700"
                    >
                      Lưu
                    </button>
                  </div>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};

export default EditProductModal;
