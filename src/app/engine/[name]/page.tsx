import React from 'react'
import { Button, Typography, Box, Grid2 as Grid } from "@mui/material";
import type { Metadata, ResolvingMetadata  } from 'next'
import EnginePage from "@/components/EnginePage";
import engines from "@/data/engines.json"
import models from "@/data/model-index.Phasmatic.json"

export const dynamicParams = false; // models that are not included in the list, generate 404

export async function generateStaticParams() {
  return Object.keys(engines).map((engine) => ({
    name: engine
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
  const engine = (engines as Record<string, {label: string, description: string, name: string}>)[name];
  const engine_models = (models as Record<string, {name: string, label: string, images: RenderView[]}>);

  const render_views = Object.values(engine_models).filter((value) => {
    return value.images.some(image => image.name === engine.name);
  }); 

  return <EnginePage name={name} label={engine.label} description={engine.description} renderViews={render_views}/>
}