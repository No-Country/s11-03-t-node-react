import { Inter, Secular_One } from "next/font/google";

export const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-inter",
});

export const secular_one = Secular_One({
  weight: ["400"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-secular",
});
