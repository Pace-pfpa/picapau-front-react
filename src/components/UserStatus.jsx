import { useState, useEffect } from "react";
import userOnline from '../assets/UserOnline.png';
import userOffline from '../assets/Offilne.png'

export const UserStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [imgSrc, setImgSrc] = useState('');

    useEffect(() => {
        // Pré-carregar ambas as imagens
        const onlineImg = new Image();
        onlineImg.src = {userOnline};

        const offlineImg = new Image();
        offlineImg.src = {userOffline};

        // Definir o src baseado no estado inicial
        setImgSrc(isOnline ? onlineImg.src : offlineImg.src);

        const handleOnline = () => {
            setIsOnline(true);
            setImgSrc(onlineImg.src); // Atualiza a imagem quando fica online
        };
        const handleOffline = () => {
            setIsOnline(false);
            setImgSrc(offlineImg.src); // Atualiza a imagem quando fica offline
        };
    
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
    
        // Limpeza de memória
        return () => {
          window.removeEventListener('online', handleOnline);
          window.removeEventListener('offline', handleOffline);
        };
      }, []);

    return (
        <img className="userOnline" src={imgSrc} alt={isOnline ? "User Online" : "User Offline"} />
    );
};
