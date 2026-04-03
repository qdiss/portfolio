// src/components/CursorWrapper.jsx
import { Suspense, lazy } from "react";
const CustomCursor = lazy(() => import("./CustomCursor"));
const CookieManager = lazy(() => import("./CookieManager"));

export default function CursorWrapper({ children }) {
  return (
    <>
      {children}
      <Suspense fallback={null}>
        <CustomCursor />
        <CookieManager />
      </Suspense>
    </>
  );
}
