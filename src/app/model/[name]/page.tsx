import React from 'react'
import { Button, Typography, Box, Grid2 as Grid } from "@mui/material";
import type { Metadata, ResolvingMetadata  } from 'next'
import ModelPage from "@/components/ModelPage";
import models from "@/data/model-index.Phasmatic.json"

export const dynamicParams = false; // models that are not included in the list, generate 404

export async function generateStaticParams() {
    return Object.values(models).map((model) => ({
      name: model.name,
      description: "dfgsfgsdfgsdfg"
    }))
}

/*export const metadata: Metadata = {
  title: 'My Page Title',
}*/

type Props = {
  params: Promise<{ name: string, description: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}


export async function generateMetadata( { params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
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

export default async function Page({params}: { params: Promise<{ name: string, description: string }> }) {
  const { name, description } = await params;

  //const model = Object.values(models).find((model) => {model.name === name});
  
  const render_views = name === "DragonAttenuation"? [
    {name: "three.js", thumbnail: `/images/dragon/model-viewer-golden.png`, image: `/images/dragon/model-viewer-golden.png`},
    {name: "filament.js", thumbnail: `/images/dragon/filament-golden.png`, image: `/images/dragon/model-viewer-golden.png`},
    {name: "babylon.js", thumbnail: `/images/dragon/babylon-golden.png`, image: `/images/dragon/model-viewer-golden.png`},
    {name: "gltf-sample-viewer", thumbnail: `/images/dragon/gltf-sample-viewer-golden.png`, image: `/images/dragon/model-viewer-golden.png`},
    {name: "three-gpu-pathtracer", thumbnail: `/images/dragon/three-gpu-pathtracer-golden.png`, image: `/images/dragon/model-viewer-golden.png`},
    {name: "Dassault STELLAR", thumbnail: `/images/dragon/stellar-golden.png`, image: `/images/dragon/model-viewer-golden.png`},
    {name: "Blender Cycles", thumbnail: `/images/dragon/blender-cycles-golden.png`, image: `/images/dragon/model-viewer-golden.png`}
  ]:
  [
    {name: "three.js", thumbnail: `/images/other/babylon-golden.png`, image: `/images/other/babylon-golden.png`},
    {name: "filament.js", thumbnail: `/images/other/babylon-golden.png`, image: `/images/other/babylon-golden.png`},
    {name: "babylon.js", thumbnail: `/images/other/babylon-golden.png`, image: `/images/other/babylon-golden.png`},
    {name: "gltf-sample-viewer", thumbnail: `/images/other/babylon-golden.png`, image: `/images/other/babylon-golden.png`},
    {name: "three-gpu-pathtracer", thumbnail: `/images/other/babylon-golden.png`, image: `/images/other/babylon-golden.png`},
    {name: "Dassault STELLAR", thumbnail: `/images/other/babylon-golden.png`, image: `/images/other/babylon-golden.png`},
    {name: "Chaos Group V-Ray", thumbnail: `/images/other/babylon-golden.png`, image: `/images/other/babylon-golden.png`},
    {name: "Blender Cycles", thumbnail: `/images/other/babylon-golden.png`, image: `/images/other/babylon-golden.png`}
  ];

  return <ModelPage name={name} description={"Description"} renderViews={render_views}/>
}