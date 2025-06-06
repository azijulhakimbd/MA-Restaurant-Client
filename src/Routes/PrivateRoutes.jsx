import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useLocation } from 'react-router';
import Spinner from '../Components/Spinner';

const PrivateRoutes = ({children}) => {
   const {user,loading}=use(AuthContext)
       const location =useLocation();
        if (loading){
            return <Spinner></Spinner>;
        }
        if(user && user?.email){
            return children;
        }
        return <Navigate state={location.pathname} to={'/login'}></Navigate>

};

export default PrivateRoutes;