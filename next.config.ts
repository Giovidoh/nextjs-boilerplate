import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      // `import Icon from "./icon.svg"` → React component (SVGR).
      // `import iconUrl from "./icon.svg?url"` → regular static asset.
      "*.svg": {
        condition: { not: { query: /[?&]url(?=&|$)/ } },
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

export default withNextIntl(nextConfig);
