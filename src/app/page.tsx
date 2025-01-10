import Image from "next/image";
import styles from "./page.module.css";
import { Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Box>

        </Box>

        <Typography color='primary'>
        The purpose of glTF is to standardize Physically-Based Rendering (PBR) materials such that you can be confident your model will appear as intended in any lighting environment in any renderer. This is a very ambitious goal, as real-time rendering at this level of quality is still very much an area of active research with improvements being made constantly. This site demonstrates where we are on that path to convergence and highlights areas that could still use improvement. We are comparing the most popular real-time web renderers as well as path tracers (a rendering technique that uses far fewer approximations than are required by real-time renderers).
        </Typography>

        {/* Components */}
        <Box display='flex' flexWrap='wrap'>
          {new Array(15).fill(0).map((e,i) => { return <Box key={i} style={{width: '300px', height: '300px', background:'black', margin: '10px'}}/>})}
        </Box>
                        
      </main>
    </div>
  );
}
