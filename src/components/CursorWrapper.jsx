// src/components/CursorWrapper.jsx
import { Suspense, lazy } from "react";
const CustomCursor = lazy(() => import("./CustomCursor"));

export default function CursorWrapper({ children }) {
  return (
    <>
      {children}
      <Suspense fallback={null}>
        <CustomCursor />
      </Suspense>
    </>
  );
}
