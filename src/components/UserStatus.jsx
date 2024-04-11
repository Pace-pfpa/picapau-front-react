import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export const UserStatus = () => {
    const [isOnline, setInsOnline] = useState(navigator.onLine)
    const navigate = useNavigate();


    useEffect(() => {
        const handleOnline = () => setInsOnline(true);
        const handleOffline = () => setInsOnline(false);
    
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
    
        //limpeza de memoria
        return () => {
          window.removeEventListener('online', handleOnline);
          window.removeEventListener('offline', handleOffline);
        }
      }, [])

      if(isOnline){
        return (
            <img className="userOnline" src="src/assets/UserOnline.png" alt="" />
        )
        
      }else{
        return (
            <img className="userOnline" src="src/assets/UserOflline.png" alt="" />
        )
      }
} 