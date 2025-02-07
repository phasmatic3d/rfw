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

  const model = (models as any)[name];

  const render_views = model.images;
  
  return <ComparePage name={name} description={"Description"} renderViews={render_views}/>
}