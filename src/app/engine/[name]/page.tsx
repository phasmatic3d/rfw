import React from 'react'
import { Button, Typography, Box, Grid2 as Grid } from "@mui/material";
import type { Metadata, ResolvingMetadata  } from 'next'
import EnginePage from "@/components/pages/EnginePage";
import engines from "@/data/engines.json"

export const dynamicParams = false; // models that are not included in the list, generate 404

export async function generateStaticParams() {
    return Object.values(engines).map((model) => ({
      name: model.name
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

  return <EnginePage name={name} description={"Description"}/>
}