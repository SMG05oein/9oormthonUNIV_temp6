import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk"

export default function useKakaoLoader() {
    useKakaoLoaderOrigin({
        appkey: process.env.REACT_APP_KAKAOMAP_KEY,
        libraries: ["clusterer", "drawing", "services"],
    })
}