import React from 'react'
import { Button, Typography, Box, Grid2 as Grid } from "@mui/material";
import type { Metadata, ResolvingMetadata  } from 'next'
import ComparePage from "@/components/ComparePage";
import models from "@/data/model-index.Phasmatic.json"
import { basePath } from '@/lib/paths';

export const dynamicParams = false; // models that are not included in the list, generate 404

export async function generateStaticParams() {
    
    return Object.values(models).map((model) => ({
      name: model.name
    }))
}

export const metadata: Metadata = {
  title: 'Model Comparison',
}

type Props = {
  params: Promise<{ name: string}>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}


/*export async function generateMetadata( { params, searchParams }: Props, parent: ResolvingMetadata
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
}*/

export default async function Page({params}: { params: Promise<{ name: string }> }) {
  const { name } = await params;

  const render_views = name === "DragonAttenuation"? [
    {name: "three.js", thumbnail: `/images/dragon/model-viewer-golden.png`, image: `/images/dragon/model-viewer-golden.png`},
    {name: "filament.js", thumbnail: `/images/dragon/filament-golden.png`, image: `/images/dragon/filament-golden.png`},
    {name: "babylon.js", thumbnail: `/images/dragon/babylon-golden.png`, image: `/images/dragon/babylonr-golden.png`},
    {name: "gltf-sample-viewer", thumbnail: `/images/dragon/gltf-sample-viewer-golden.png`, image: `/images/dragon/gltf-sample-viewer-golden.png`},
    {name: "three-gpu-pathtracer", thumbnail: `/images/dragon/three-gpu-pathtracer-golden.png`, image: `/images/dragon/three-gpu-pathtracer-golden.png`},
    {name: "Dassault STELLAR", thumbnail: `/images/dragon/stellar-golden.png`, image: `/images/dragon/stellar-golden.png`},
    {name: "Blender Cycles", thumbnail: `/images/dragon/blender-cycles-golden.png`, image: `/images/dragon/blender-cycles-golden.png`}
  ]:
  [
    {name: "three.js", thumbnail: `/images/abeautifulgame/model-viewer-golden.png`, image: `/images/abeautifulgame/model-viewer-golden.png`},
    {name: "filament.js", thumbnail: `/images/abeautifulgame/filament-golden.png`, image: `/images/abeautifulgame/filament-golden.png`},
    {name: "babylon.js", thumbnail: `/images/abeautifulgame/babylon-golden.png`, image: `/images/abeautifulgame/babylon-golden.png`},
    {name: "gltf-sample-viewer", thumbnail: `/images/abeautifulgame/gltf-sample-viewer-golden.png`, image: `/images/abeautifulgame/gltf-sample-viewer-golden.png`},
    {name: "three-gpu-pathtracer", thumbnail: `/images/abeautifulgame/three-gpu-pathtracer-golden.png`, image: `/images/abeautifulgame/three-gpu-pathtracer-golden.png`},
    {name: "Dassault STELLAR", thumbnail: `/images/abeautifulgame/stellar-golden.png`, image: `/images/abeautifulgame/stellar-golden.png`},
    {name: "Chaos Group V-Ray", thumbnail: `/images/abeautifulgame/babylon-golden.png`, image: `/images/abeautifulgame/babylon-golden.png`},
    {name: "Blender Cycles", thumbnail: `/images/abeautifulgame/blender-cycles-golden.png`, image: `/images/abeautifulgame/blender-cycles-golden.png`}
  ];
  
  return <ComparePage name={name} description={"Description"} renderViews={render_views}/>
}