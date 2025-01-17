export default async function Page({params }: { params: Promise<{ name: string }> }) {
    const name = (await params).name
  return <h1>Hello, {name}!</h1>
}