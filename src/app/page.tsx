import Image from "next/image";
import styles from "./page.module.css";
import { Box, Typography } from "@mui/material";
import LandingPage from "@/components/LandingPage";

const models = [
  {name: "test1"},
  {name: "test2"},
  {name: "test3"},
  {name: "test4"},
  {name: "test5"},
  {name: "test6"},
  {name: "test7"},
  {name: "test8"},
  {name: "test9"},
  {name: "test10"},
  {name: "test11"},
  {name: "test12"},
  {name: "test13"},
  {name: "test14"},
  {name: "test15"},
]


export default function Home() {

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <LandingPage models={models}/>                        
      </main>
    </div>
  );
}
