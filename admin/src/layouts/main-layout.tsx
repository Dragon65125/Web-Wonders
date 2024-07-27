import useCart from "@/components/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { useToken } from "@/contexts/access-token";
import { ShoppingBag } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

const MainLayout = () => {
  const { token, setToken } = useToken();
  const { items } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent page reload on form submit
    if (searchQuery.trim()) {
      // Log the search query for debugging
      console.log("Searching for:", searchQuery.trim());
      // Navigate to search results page
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen container">
      <nav className="h-16 border-b flex items-center">
        <div className="flex-1 flex items-center">
          <img src="./images/w.png" width="30" height="30" className="space-right" alt="Logo" />
          <b className="large-text">WEB WONDERS</b>
        </div>
        <div className="flex items-center ml-auto">
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              className="border rounded px-2 py-1"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              type="submit"
              variant="default"
              className="ml-2 text-sm px-2 py-1" // Adjust size with smaller padding and font size
            >
              Search
            </Button>
          </form>
          <ul className="flex items-center gap-4 ml-4">
            <li className="flex items-center">
              <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                  isPending ? "text-blue-100" : isActive ? "text-blue-400" : ""
                }
              >
                <div className="flex items-center space-x-2">
                  <img src="./images/home-icon-png-home-icon-31.png" width="20" height="20" alt="Home" />
                  <span>Home</span>
                </div>
              </NavLink>
            </li>
            <li className="flex items-center">
              <NavLink
                to="/products"
                className={({ isActive, isPending }) =>
                  isPending ? "text-blue-100" : isActive ? "text-blue-400" : ""
                }
              >
                <div className="flex items-center space-x-2">
                  <img src="./images/produce.png" width="20" height="20" alt="Products" />
                  <span>Products</span>
                </div>
              </NavLink>
            </li>
            <li className="flex items-center">
              <NavLink
                to="/vendors"
                className={({ isActive, isPending }) =>
                  isPending ? "text-blue-100" : isActive ? "text-blue-400" : ""
                }
              >
                <div className="flex items-center space-x-2">
                  <img src="./images/v.png" width="20" height="20" alt="Vendors" />
                  <span>Vendors</span>
                </div>
              </NavLink>
            </li>
            <li className="flex items-center">
              <NavLink
                to="/admin/dashboard"
                className={({ isActive, isPending }) =>
                  isPending ? "text-blue-100" : isActive ? "text-blue-400" : ""
                }
              >
                <div className="flex items-center space-x-2">
                  <img src="./images/admin-icon-png-17.jpg" width="20" height="20" alt="Admin" />
                  <span>Admin</span>
                </div>
              </NavLink>
            </li>
            <li className="flex items-center">
              <NavLink
                to="/categories"
                className={({ isActive, isPending }) =>
                  isPending ? "text-blue-100" : isActive ? "text-blue-400" : ""
                }
              >
                <div className="flex items-center space-x-2">
                  <img src="./images/ca.png" width="20" height="20" alt="Categories" />
                  <span>Categories</span>
                </div>
              </NavLink>
            </li>
            {token ? (
              <li className="flex items-center">
                <Button variant="link" onClick={() => setToken("")}>
                  <div className="flex items-center space-x-2">
                    <img src="./images/out.jpg" width="20" height="20" alt="Logout" />
                    <span>Logout</span>
                  </div>
                </Button>
              </li>
            ) : (
              <li className="flex items-center">
                <NavLink
                  to="/auth/login"
                  className={({ isActive, isPending }) =>
                    isPending ? "text-blue-100" : isActive ? "text-blue-400" : ""
                  }
                >
                  <div className="flex items-center space-x-2">
                    <img src="./images/in.jpg" width="20" height="20" alt="Login" />
                    <span>Login</span>
                  </div>
                </NavLink>
              </li>
            )}
            <Button onClick={() => navigate("/checkout")} variant="ghost" className="flex items-center space-x-2">
              <ShoppingBag size={20} color="white" />
              <span className="text-sm font-medium">{items.length}</span>
            </Button>
          </ul>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>
      <footer className="mt-auto h-16 border-t text-center flex items-center justify-center w-full">
        <p className="text-center"> Web-Wonders &copy; Copyright!!</p>
      </footer>
    </div>
  );
};

export default MainLayout;
