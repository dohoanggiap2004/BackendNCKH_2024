import {useState, useRef, useEffect} from "react";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {setSelectedItem} from "../../../store/reducers/itemReducer";
import {logoutAdmin, logoutUser} from "../../../store/actions/authAction";
import ConfirmModal from "../Modal/ConfirmModal";

function Sidebar( { handleSearch } ) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {selectedItemAdmin} = useSelector((state) => state.item);

    //open modal logout
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLogout, setIsLogout] = useState(false);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);

    const handleClickOutside = (event) => {
        // Check if the clicked target is outside the sidebar
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setIsSidebarOpen(false); // Close sidebar
        }
    };

    const handleSearchChange = (e) => {
        handleSearch(e.target.value);
    }

    const handleClick = (value) => {
        dispatch(setSelectedItem(value));
    }

    // handle logout
    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    const handleSelected = (value) => {
        setIsLogout(value);
    };

    useEffect(() => {
        const logoutAndNavigate = async () => {
            if (isLogout) {
                await dispatch(logoutAdmin());
                navigate('/admin/login');
            }
        };

        logoutAndNavigate();
    }, [isLogout]);

    //close side bar
    useEffect(() => {
        // Attach the event listener when the sidebar is open
        if (isSidebarOpen) {
            document.addEventListener("touchstart", handleClickOutside);
        } else {
            document.removeEventListener("touchstart", handleClickOutside);
        }

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [isSidebarOpen]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            {/* Sidebar */}
            <aside
                ref={sidebarRef}
                id="default-sidebar"
                className={`fixed bg-white top-0 left-0 z-40 w-72 h-screen transition-transform ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0 lg:block`}
                aria-label="Sidebar"
            >

                <div className="h-full px-3 py-4 overflow-y-auto dark:bg-gray-800 bg-white md:bg-gray-150">
                    <div className={'flex items-center p-8'}>
                        <h1 className={'text-3xl font-bold'} style={{color: '#1B254B'}}>QUẢN LÝ</h1>
                    </div>
                    <hr className="border border-gray-200 mb-4"/>

                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link
                                to={"/admin"}
                                onClick={() => handleClick('dashboard')}
                                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group 
                                ${selectedItemAdmin === 'dashboard' ? 'bg-white' : 'bg-none'}`}
                            >
                                <svg
                                    className="w-5 h-5 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#5640FB"
                                    viewBox="0 0 22 21"
                                >
                                    <path
                                        d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                                    <path
                                        d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                                </svg>
                                <span
                                    className={`ms-3 text-gray-400 text-md font-bold p-2  ${selectedItemAdmin === 'dashboard' ? '!text-gray-950' : 'bg-none'}`}>Bảng điều khiển</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                to={"/admin/users"}
                                onClick={() => handleClick('users')}
                                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group 
                                ${selectedItemAdmin === 'users' ? 'bg-white' : 'bg-none'}`}
                            >
                                <svg
                                    className="flex-shrink-0 w-5 h-5 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#5640FB"
                                    viewBox="0 0 20 18"
                                >
                                    <path
                                        d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                                </svg>
                                <span
                                    className={`flex-1 ms-3 text-gray-400 text-md font-bold p-2 whitespace-nowrap ${selectedItemAdmin === 'users' ? '!text-gray-950' : 'bg-none'}`}>Người dùng</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"/admin/products"}
                                onClick={() => handleClick('products')}
                                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group 
                                ${selectedItemAdmin === 'products' ? 'bg-white' : 'bg-none'}`}
                            >
                                <svg fill="#5640FB" className={'h-5 w-5'} version="1.1" id="Capa_1"
                                     viewBox="0 0 296.157 296.157"><g id="SVGRepo_bgCarrier"></g>
                                    <g id="SVGRepo_iconCarrier"> <g> <path
                                        d="M271.537,136.697L217.004,13.81c-2.9-6.523-8.553-11.69-15.877-13.809l1.944,36.373c0.231,4.293-3.193,7.9-7.489,7.9 c-2.176,0-3.816,0-5.871,0c4.458,11.042,3.705,9.178,4.606,11.41c1.67,4.134-0.629,8.723-4.77,9.982l-58.338,17.76l-3.001,4.424 c0,2.355,0,196.272,0,208.306h93.406c5.263,0,9.341-4.616,8.692-9.839L203.624,71.41l39.836,79.041 c1.848,3.655,6.246,5.066,9.87,3.265l14.776-7.462C271.615,144.493,273.119,140.286,271.537,136.697z M195.583,176.042 c0,13.118-10.634,23.752-23.752,23.752c-13.118,0-23.752-10.634-23.752-23.752V152.91c0-2.628,2.131-4.759,4.759-4.759h37.986 c2.628,0,4.759,2.131,4.759,4.759V176.042z"></path>
                                        <path
                                            d="M168.59,1.6c-4.932,3.653-12.289,5.974-20.512,5.974c-8.221,0-15.576-2.32-20.508-5.971l20.509,30.234L168.59,1.6z"></path>
                                        <path
                                            d="M101.84,55.684c2.24-5.549,2.566-6.355,4.606-11.409c-2.054,0-3.698,0-5.871,0c-4.3,0-7.719-3.611-7.489-7.9L95.03,0 c-7.2,2.075-12.928,7.18-15.876,13.81L24.622,136.697c-1.583,3.589-0.089,7.796,3.421,9.556l14.766,7.442 c3.67,1.856,8.065,0.363,9.881-3.245l39.884-79.119L65.852,286.317c-0.649,5.223,3.429,9.84,8.692,9.84h38.664 c0-7.908,0-202.715,0-210.61c0-1.501,0.45-2.968,1.293-4.21l7.461-10.999l-15.352-4.67C102.465,64.405,100.17,59.821,101.84,55.684 z"></path>
                                        <path
                                            d="M124.518,39.583l-5.701,14.119l11.962,3.639l8.238-12.144L110.443,3.074h-0.556l-1.4,26.2h9.077 C122.872,29.274,126.508,34.654,124.518,39.583z"></path>
                                        <path
                                            d="M177.342,53.703l-5.701-14.121c-1.988-4.921,1.64-10.308,6.954-10.308h9.076l-1.4-26.2h-0.555l-41.102,60.592 L177.342,53.703z"></path> </g> </g></svg>
                                <span
                                    className={`flex-1 ms-3 text-gray-400 text-md font-bold p-2 whitespace-nowrap ${selectedItemAdmin === 'products' ? '!text-gray-950' : 'bg-none'}`}>Sản phẩm</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                to={"/admin/orders"}
                                onClick={() => handleClick('orders')}
                                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group 
                                ${selectedItemAdmin === 'orders' ? 'bg-white' : 'bg-none'}`}
                            >
                                <svg viewBox="0 0 1024 1024" fill="#5640FB" className="icon h-5 w-5" version="1.1"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M300 462.4h424.8v48H300v-48zM300 673.6H560v48H300v-48z" fill=""></path>
                                        <path
                                            d="M818.4 981.6H205.6c-12.8 0-24.8-2.4-36.8-7.2-11.2-4.8-21.6-11.2-29.6-20-8.8-8.8-15.2-18.4-20-29.6-4.8-12-7.2-24-7.2-36.8V250.4c0-12.8 2.4-24.8 7.2-36.8 4.8-11.2 11.2-21.6 20-29.6 8.8-8.8 18.4-15.2 29.6-20 12-4.8 24-7.2 36.8-7.2h92.8v47.2H205.6c-25.6 0-47.2 20.8-47.2 47.2v637.6c0 25.6 20.8 47.2 47.2 47.2h612c25.6 0 47.2-20.8 47.2-47.2V250.4c0-25.6-20.8-47.2-47.2-47.2H725.6v-47.2h92.8c12.8 0 24.8 2.4 36.8 7.2 11.2 4.8 21.6 11.2 29.6 20 8.8 8.8 15.2 18.4 20 29.6 4.8 12 7.2 24 7.2 36.8v637.6c0 12.8-2.4 24.8-7.2 36.8-4.8 11.2-11.2 21.6-20 29.6-8.8 8.8-18.4 15.2-29.6 20-12 5.6-24 8-36.8 8z"
                                            fill=""></path>
                                        <path
                                            d="M747.2 297.6H276.8V144c0-32.8 26.4-59.2 59.2-59.2h60.8c21.6-43.2 66.4-71.2 116-71.2 49.6 0 94.4 28 116 71.2h60.8c32.8 0 59.2 26.4 59.2 59.2l-1.6 153.6z m-423.2-47.2h376.8V144c0-6.4-5.6-12-12-12H595.2l-5.6-16c-11.2-32.8-42.4-55.2-77.6-55.2-35.2 0-66.4 22.4-77.6 55.2l-5.6 16H335.2c-6.4 0-12 5.6-12 12v106.4z"
                                            fill=""></path>
                                    </g>
                                </svg>
                                <span
                                    className={`flex-1 ms-3 text-gray-400 text-md font-bold p-2 whitespace-nowrap ${selectedItemAdmin === 'orders' ? '!text-gray-950' : 'bg-none'}`}>Đơn hàng</span>
                            </Link>
                        </li>

                        {/*<li>*/}
                        {/*    <Link*/}
                        {/*        to={"/admin/order-items"}*/}
                        {/*        onClick={() => handleClick('orderItems')}*/}
                        {/*        className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group */}
                        {/*        ${selectedItemAdmin === 'orderItems' ? 'bg-white' : 'bg-none'}`}*/}
                        {/*    >*/}
                        {/*        <svg viewBox="0 0 24 24" className={'h-5 w-5'} fill="#5640FB"*/}
                        {/*             xmlns="http://www.w3.org/2000/svg">*/}
                        {/*            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>*/}
                        {/*            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>*/}
                        {/*            <g id="SVGRepo_iconCarrier">*/}
                        {/*                <path*/}
                        {/*                    d="M7.50626 15.2647C7.61657 15.6639 8.02965 15.8982 8.4289 15.7879C8.82816 15.6776 9.06241 15.2645 8.9521 14.8652L7.50626 15.2647ZM6.07692 7.27442L6.79984 7.0747V7.0747L6.07692 7.27442ZM4.7037 5.91995L4.50319 6.64265L4.7037 5.91995ZM3.20051 4.72457C2.80138 4.61383 2.38804 4.84762 2.2773 5.24675C2.16656 5.64589 2.40035 6.05923 2.79949 6.16997L3.20051 4.72457ZM20.1886 15.7254C20.5895 15.6213 20.8301 15.2118 20.7259 14.8109C20.6217 14.41 20.2123 14.1695 19.8114 14.2737L20.1886 15.7254ZM10.1978 17.5588C10.5074 18.6795 9.82778 19.8618 8.62389 20.1747L9.00118 21.6265C10.9782 21.1127 12.1863 19.1239 11.6436 17.1594L10.1978 17.5588ZM8.62389 20.1747C7.41216 20.4896 6.19622 19.7863 5.88401 18.6562L4.43817 19.0556C4.97829 21.0107 7.03196 22.1383 9.00118 21.6265L8.62389 20.1747ZM5.88401 18.6562C5.57441 17.5355 6.254 16.3532 7.4579 16.0403L7.08061 14.5885C5.10356 15.1023 3.89544 17.0911 4.43817 19.0556L5.88401 18.6562ZM7.4579 16.0403C8.66962 15.7254 9.88556 16.4287 10.1978 17.5588L11.6436 17.1594C11.1035 15.2043 9.04982 14.0768 7.08061 14.5885L7.4579 16.0403ZM8.9521 14.8652L6.79984 7.0747L5.354 7.47414L7.50626 15.2647L8.9521 14.8652ZM4.90421 5.19725L3.20051 4.72457L2.79949 6.16997L4.50319 6.64265L4.90421 5.19725ZM6.79984 7.0747C6.54671 6.15847 5.8211 5.45164 4.90421 5.19725L4.50319 6.64265C4.92878 6.76073 5.24573 7.08223 5.354 7.47414L6.79984 7.0747ZM11.1093 18.085L20.1886 15.7254L19.8114 14.2737L10.732 16.6332L11.1093 18.085Z"*/}
                        {/*                    fill="#1C274C"></path>*/}
                        {/*                <path*/}
                        {/*                    d="M19.1647 6.2358C18.6797 4.48023 18.4372 3.60244 17.7242 3.20319C17.0113 2.80394 16.1062 3.03915 14.2962 3.50955L12.3763 4.00849C10.5662 4.47889 9.66119 4.71409 9.24954 5.40562C8.8379 6.09714 9.0804 6.97492 9.56541 8.73049L10.0798 10.5926C10.5648 12.3481 10.8073 13.2259 11.5203 13.6252C12.2333 14.0244 13.1384 13.7892 14.9484 13.3188L16.8683 12.8199C18.6784 12.3495 19.5834 12.1143 19.995 11.4227C20.2212 11.0429 20.2499 10.6069 20.1495 10"*/}
                        {/*                    stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path>*/}
                        {/*            </g>*/}
                        {/*        </svg>*/}
                        {/*        <span*/}
                        {/*            className={`flex-1 ms-3 text-gray-400 text-md font-bold p-2 whitespace-nowrap ${selectedItemAdmin === 'orderItems' ? '!text-gray-950' : 'bg-none'}`}>Đơn Laptop</span>*/}
                        {/*    </Link>*/}
                        {/*</li>*/}

                        <li>
                            <Link
                                to='/admin/vouchers'
                                onClick={() => {
                                    handleClick('vouchers')
                                }}
                                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group 
                                ${selectedItemAdmin === 'vouchers' ? 'bg-white' : 'bg-none'}`}
                            >
                                <svg width="64px" className={'h-5 w-5'} viewBox="0 0 48 48"
                                     xmlns="http://www.w3.org/2000/svg"
                                     fill="#5640FB">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <g id="Layer_2" data-name="Layer 2">
                                            <g id="invisible_box" data-name="invisible box">
                                                <rect width="48" height="48" fill="none"></rect>
                                            </g>
                                            <g id="Layer_7" data-name="Layer 7">
                                                <g>
                                                    <path
                                                        d="M43,7H38a2,2,0,0,0-1.4.6L34,10.2,31.4,7.6A2,2,0,0,0,30,7H5a2.9,2.9,0,0,0-3,3V38a2.9,2.9,0,0,0,3,3H30a2,2,0,0,0,1.4-.6L34,37.8l2.6,2.6A2,2,0,0,0,38,41h5a2.9,2.9,0,0,0,3-3V10A2.9,2.9,0,0,0,43,7ZM42,37H38.8l-3.4-3.4a1.9,1.9,0,0,0-2.8,0L29.2,37H6V11H29.2l3.4,3.4a1.9,1.9,0,0,0,2.8,0L38.8,11H42Z"></path>
                                                    <path
                                                        d="M34,17a2,2,0,0,0-2,2v2a2,2,0,0,0,4,0V19A2,2,0,0,0,34,17Z"></path>
                                                    <path
                                                        d="M34,25a2,2,0,0,0-2,2v2a2,2,0,0,0,4,0V27A2,2,0,0,0,34,25Z"></path>
                                                    <circle cx="14" cy="20" r="2"></circle>
                                                    <circle cx="22" cy="28" r="2"></circle>
                                                    <path
                                                        d="M21.6,17.6l-10,10a1.9,1.9,0,0,0,0,2.8,1.9,1.9,0,0,0,2.8,0l10-10a2,2,0,0,0-2.8-2.8Z"></path>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                <span
                                    className={`flex-1 ms-3 text-gray-400 text-md font-bold p-2 whitespace-nowrap ${selectedItemAdmin === 'vouchers' ? '!text-gray-950' : 'bg-none'}`}>Mã giảm giá</span>
                            </Link>
                        </li>

                        <li>
                            <a
                                onClick={() => toggleModal()}
                                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
                            >
                                <svg viewBox="0 0 24 24" className={'h-5 w-5'} fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path
                                            d="M16 16.9998L21 11.9998M21 11.9998L16 6.99982M21 11.9998H9M12 16.9998C12 17.2954 12 17.4432 11.989 17.5712C11.8748 18.9018 10.8949 19.9967 9.58503 20.2571C9.45903 20.2821 9.31202 20.2985 9.01835 20.3311L7.99694 20.4446C6.46248 20.6151 5.69521 20.7003 5.08566 20.5053C4.27293 20.2452 3.60942 19.6513 3.26118 18.8723C3 18.288 3 17.5161 3 15.9721V8.02751C3 6.48358 3 5.71162 3.26118 5.12734C3.60942 4.3483 4.27293 3.75442 5.08566 3.49435C5.69521 3.29929 6.46246 3.38454 7.99694 3.55503L9.01835 3.66852C9.31212 3.70117 9.45901 3.71749 9.58503 3.74254C10.8949 4.00297 11.8748 5.09786 11.989 6.42843C12 6.55645 12 6.70424 12 6.99982"
                                            stroke="#5640FB" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round"></path>
                                    </g>
                                </svg>
                                <span className="flex-1 ms-3 text-gray-400 text-md font-bold p-1.5 whitespace-nowrap">Đăng xuất</span>
                            </a>

                        </li>
                    </ul>

                </div>
            </aside>
            <ConfirmModal
                isOpen={isModalOpen}
                toggleModal={toggleModal}
                handleSelected={handleSelected}
                confirmText="Bạn có chắc chắn muốn đăng xuất?"
            />


            <div className={'h-28 flex flex-col md:flex-row items-center justify-between me-8'}>

                {/*breadcrumb*/}
                <div className={'md:ms-8 my-4 lg:ms-80 items-center '}>

                    <nav aria-label="breadcrumb" className="w-full text-gray-800">
                        <ol className="flex h-8 space-x-2 text-gray-800">
                            <li className="flex items-center">
                                <a rel="noopener noreferrer" href="#" title="Back to homepage"
                                   className="flex items-center hover:underline">Trang chủ</a>
                            </li>

                            <li className="flex items-center space-x-1">
                                <span className="text-gray-600">/</span>
                                <a rel="noopener noreferrer" href="#"
                                   className="flex items-center px-1 capitalize cursor-default">
                                    {selectedItemAdmin === 'dashboard' && 'Bảng Điều Khiển'}
                                    {selectedItemAdmin === 'users' && 'Người Dùng'}
                                    {selectedItemAdmin === 'products' && 'Sản phẩm'}
                                    {selectedItemAdmin === 'orders' && 'Đơn Hàng'}
                                    {selectedItemAdmin === 'vouchers' && 'Mã giảm giá'}
                                </a>
                            </li>
                        </ol>
                    </nav>

                    {/*title*/}
                    <p className={'text-3xl font-bold'} style={{color: '#1B254B'}}>
                        {selectedItemAdmin === 'dashboard' && 'BẢNG ĐIỀU KHIỂN'}
                        {selectedItemAdmin === 'users' && 'NGƯỜI DÙNG'}
                        {selectedItemAdmin === 'products' && 'SẢN PHẨM'}
                        {selectedItemAdmin === 'orders' && 'ĐƠN HÀNG'}
                        {selectedItemAdmin === 'vouchers' && 'MÃ GIẢM GIÁ'}
                    </p>
                </div>

                {/*utils*/}
                <div className="flex items-center bg-white rounded-3xl p-2 ms-8 md:ms-0 w-80 lg:w-72">
                    {/*search bar*/}
                    <div className="max-w-[180px] w-full me-2">
                        <div className="relative">
                            <input type="text"
                                   name="query"
                                   onChange={handleSearchChange}
                                   className="w-full border h-10 p-4 rounded-full bg-gray-100"
                                   placeholder="Search..."/>
                            <button type="submit">
                            <svg
                                    className="text-teal-400 h-5 w-5 absolute top-3.5 right-3 fill-current dark:text-teal-300"
                                    version="1.1"
                                    x="0px" y="0px" viewBox="0 0 56.966 56.966"
                                >
                                    <path
                                        d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z">
                                    </path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/*open side bar button*/}
                    <button
                        onClick={toggleSidebar}
                        aria-controls="default-sidebar"
                        type="button"
                        className="inline-flex items-center p-2 me-2 text-sm text-gray-400 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    >
                        <span className="sr-only">Open sidebar</span>
                        <svg fill="gray" viewBox="0 0 52 52" className={'w-5 h-5'} data-name="Layer 1" id="Layer_1"
                             xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M50,12.5H2a2,2,0,0,1,0-4H50a2,2,0,0,1,0,4Z"></path>
                                <path d="M50,28H2a2,2,0,0,1,0-4H50a2,2,0,0,1,0,4Z"></path>
                                <path d="M50,43.5H2a2,2,0,0,1,0-4H50a2,2,0,0,1,0,4Z"></path>
                            </g>
                        </svg>
                    </button>

                    {/*svg ring*/}
                    <svg version="1.1" id="Uploaded to svgrepo.com" className={'w-6 h-6 me-2'}
                         viewBox="0 0 32 32"
                         fill="gray">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path className="linesandangles_een"
                                  d="M24,20v-5c0-4.079-3.055-7.438-7-7.931V5h-2v2.069C11.055,7.562,8,10.921,8,15v5 c0,1.105-0.895,2-2,2v2h20v-2C24.895,22,24,21.105,24,20z M9.463,22C9.804,21.411,10,20.728,10,20v-5c0-3.308,2.692-6,6-6 s6,2.692,6,6v5c0,0.728,0.196,1.411,0.537,2H9.463z M15,25h2v2h-2V25z"></path>
                        </g>
                    </svg>

                    <div className={'h-8 w-8 flex items-center justify-center rounded-full bg-indigo-600'}>
                        <p className={'text-white'}>G</p>
                    </div>

                </div>
            </div>


            {/* content */}
        </>
    );
}

export default Sidebar;
