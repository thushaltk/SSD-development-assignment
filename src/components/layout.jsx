import { Outlet } from "react-router";

const Layout = () => {
    return ( 
        <div className="App">
            <Outlet/>
        </div>
     );
}
 
export default Layout;