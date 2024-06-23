
const HeaderComponent = () => {
    return (
        <div className="card">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/home">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/admin/users/page/1">Users</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/admin/categories">Categories</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/admin/brands">Brands</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/admin/products">Products</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/admin/customers">Customers</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/admin/shipping">Shipping</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/admin/reports">Reports</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/admin/orders">Orders</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/admin/articles">Articles</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/admin/settings" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Settings
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="/admin/menus">Menus</a></li>
                                    <li><a className="dropdown-item" href="/admin/roles">Roles</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default HeaderComponent;