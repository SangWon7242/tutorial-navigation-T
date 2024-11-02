import React, { createContext, useState, useEffect } from "react";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const AppLoadingContext = createContext();

const fetchFonts = () => {
  return Font.loadAsync({
    "my-custom-font": require("../assets/fonts/GmarketSansTTFBold.ttf"), // 사용자 정의 폰트
  });
};

export const AppLoadingProvider = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadResources = async () => {
      try {
        await fetchFonts(); // 폰트 로드
        await new Promise((resolve) => setTimeout(resolve, 1500)); // 예시로 2초 대기
      } catch (e) {
        console.warn(e); // 로드 중 오류 발생 시 경고
      } finally {
        setFontsLoaded(true); // 폰트 로드 완료 상태 업데이트
        await SplashScreen.hideAsync(); // 폰트 로드가 완료되면 스플래시 스크린 숨기기
      }
    };

    // 스플래시 스크린이 자동으로 숨겨지지 않도록 설정
    SplashScreen.preventAutoHideAsync();

    loadResources(); // 리소스 로드 시작
  }, []);

  return (
    <AppLoadingContext.Provider value={{ fontsLoaded }}>
      {children}
    </AppLoadingContext.Provider>
  );
};

export default AppLoadingContext;
