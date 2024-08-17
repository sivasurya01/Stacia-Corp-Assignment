import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loading from "./Components/Loading";
function App() {
  const LazyloadProducts = lazy(() => import("./Pages/Products"));
  const LazyPaymentForm = lazy(() => import("./Pages/PaymentForm"));
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<Loading />}>
          <LazyloadProducts />
        </Suspense>
      ),
    },
    {
      path: "/PaymentForm/:id",
      element: (
        <Suspense fallback={<Loading />}>
          <LazyPaymentForm />
        </Suspense>
      ),
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
