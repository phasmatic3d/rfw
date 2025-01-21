"use client"
import React from 'react'
import { Button, Typography, Box, Grid2 as Grid } from "@mui/material";
import type { Metadata, ResolvingMetadata  } from 'next'
import ImageComparisonSlider from "@/components/ImageComparisonSlider";
import models from "@/data/models.json"
import CssBaseline from '@mui/material/CssBaseline';
import ModelCard from "@/components/ModelCard";

/*
export const dynamicParams = false; // models that are not included in the list, generate 404

export async function generateStaticParams() {
    
    return models.models.map((model) => ({
      name: model.name,
      description: model.description
    }))
}*/

/*export const metadata: Metadata = {
  title: 'My Page Title',
}*/

type Props = {
  params: Promise<{ name: string, description: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}


export async function generateMetadata( { params, searchParams }: Props, parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const {name, description} = await params;
 
  // fetch data
  //const product = await fetch(`https://.../${id}`).then((res) => res.json())
 
  // optionally access and extend (rather than replace) parent metadata
  //const previousImages = (await parent).openGraph?.images || []
  const previousImages: string[] = [];
 
  return {
    title: name,
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
    robots: {
      index: false,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    }
  }
}


const render_views = [
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

export default function Page({params}: { params: Promise<{ name: string, description: string }> }) {
  //const { name, description } = params;
  // Step 1: Set up state
  const [isVisible, setIsVisible] = React.useState(true);

  // Step 2: Toggle function
  const toggleDiv = () => {
    setIsVisible(!isVisible);
  };

  /*return (
    <>
     <Grid container sx={{height: '100%'}}>
                  <Grid size={2} sx={{height: '100%'}}>
                  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
                  </Grid>
                  <Grid size={10} sx={{overflow: "auto", height: '100%'}}>
                  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
                  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"                  </Grid>
                </Grid>
    </>
  )*/

  return (
    <>
      <Grid container direction="row" sx={{height: '100%'}}>
        <Grid size={4} sx={{overflow: "auto", height: '100%'}}>
        <Typography variant='h6'>Helmet</Typography>
        <Typography variant='h6'>Description</Typography>
        <Typography>The web component lets you declaratively add a 3D model to a web page, while hosting the model on your own site. The goal of the component is to enable adding 3D models to your website without understanding the underlying technology and platforms. The web component supports responsive design, and use cases like augmented reality on some devices. It includes features for accessibility, rendering quality, and interactivity</Typography>
        </Grid>
        <Grid container size={8} spacing={2} sx={{overflow: "auto", height: '100%', justifyContent: "space-evenly"}}>
          {render_views.map((e,i) => { return <ModelCard key={e.name} name={e.name}/>})}
        </Grid>
      </Grid>
    </>
  )
}