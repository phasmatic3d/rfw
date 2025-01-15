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

import ModelList from "../../public/models/model-index.Khronos.json"

export default function Home() {
  //const response = fetch("./public/models/model-index.Khronos.json");
  //const models = (await response).json();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <LandingPage models={ModelList}/>                        
      </main>
    </div>
  );
}
