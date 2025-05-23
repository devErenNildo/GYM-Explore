"use client";

import { Provider } from "react-redux";
import { store } from "@/app/store/store";
import EmotionRegistry from "../EmotionRegistry";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Provider store={store}>
                    <EmotionRegistry>
                        <main>{children}</main>
                    </EmotionRegistry>
                </Provider>
            </div>
        </>
    );
}
