import { ReactElement } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import DragComponent from "@/components/DragComponent";
import SideMenu from "@/components/SideMenu";
import { Grid, Paper, Typography } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export default function Home(): ReactElement {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <SideMenu />
      <main className={styles.main}>
        <DragComponent />
        <Grid container>
          <Grid item xs={10}>
            <Typography variant='h6' gutterBottom component='div'>
              Grid with nested items
            </Typography>
            <Grid container spacing={2}>
              {[0, 1, 2].map((value) => (
                <Grid key={value} item alignItems={"center"}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "row" }}
                    elevation={0}
                  >
                    <Typography variant='h6' component='div'>
                      {value}
                    </Typography>
                    <Typography variant='body2'>
                      {`Cras mattis consectetur purus sit amet fermentum.
                    Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                    Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}
