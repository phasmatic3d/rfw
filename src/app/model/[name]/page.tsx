import models from "@/data/models.json"

export const dynamicParams = false; // models that are not included in the list, generate 404

export async function generateStaticParams() {
    
    return models.models.map((model) => ({
      name: model.name,
      description: model.description
    }))
}

export default async function Page({params}: { params: Promise<{ name: string, description: string }> }) {
    const { name, description } = await params;
  return <h1>Hello, {name}! with description {description}</h1>
}