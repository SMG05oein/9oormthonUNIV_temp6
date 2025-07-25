import { useState, useEffect } from "react";

export const useStore = (key) => {


    const [store, setStore] = useState([]);

    useEffect(() => {
        const fetchStore = async () => {
            key = encodeURIComponent(key);
            const currentUrl = window.location.href;

            // const url = `http://localhost:8080/store/map/search?keyword=${key}&centerY=36.84950309992622&centerX=127.15437257867464&minY=36.845258941966016&maxY=36.8530782657718&minX=127.14723334692333&maxX=127.16278946667573`;
            // const url = `http://54.180.25.62:8080/store/map/search?keyword=${key}&centerY=36.84950309992622&centerX=127.15437257867464&minY=36.845258941966016&maxY=36.8530782657718&minX=127.14723334692333&maxX=127.16278946667573`;
            const pullAddress =
                `/store/map/search?keyword=${key}&centerY=36.84950309992622&centerX=127.15437257867464&minY=36.845258941966016&maxY=36.8530782657718&minX=127.14723334692333&maxX=127.16278946667573`;

            const url = `/.netlify/functions/proxyGet?pullAddress=${encodeURIComponent(pullAddress)}`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                setStore(data);
            } catch (error) {
                console.error("Fetch 실패:", error);
            }
        };

        fetchStore();
    }, [key]);

    return store;
};
