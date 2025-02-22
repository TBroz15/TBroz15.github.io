import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import "@fontsource/jetbrains-mono";
import { ColorModeScript, ColorModeProvider } from "@kobalte/core";

export default function App() {
  return (
    <Router
      base={import.meta.env.SERVER_BASE_URL}
      root={(props) => (
        <MetaProvider>
          <Title>TBroz15</Title>
          <Suspense>
            <>
              <ColorModeScript
                storageType={"localStorage"}
                initialColorMode="dark"
              />
              <ColorModeProvider initialColorMode="dark">
                {props.children}
              </ColorModeProvider>
            </>
          </Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
