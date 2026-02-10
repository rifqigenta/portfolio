import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        borel: ["Borel", "cursive"],
      },
    },
  },
  plugins: [],
};
