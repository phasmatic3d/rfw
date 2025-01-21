import Image from "next/image";
import styles from "./page.module.css";
import { Box, Typography } from "@mui/material";
import LandingPage from "@/components/LandingPage";

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
