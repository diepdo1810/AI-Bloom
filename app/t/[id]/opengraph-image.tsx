import { ImageResponse } from 'next/og'
import { useImageStore } from '@/stores'

export const runtime = 'edge'

export default async function Image({ params }: { params: { id: string } }) {
  const { getImageById } = useImageStore.getState()
  const data = getImageById(params.id)

  return new ImageResponse(
      (
          <div tw="flex w-full h-full items-center justify-center bg-white">
            {data?.image && (
                <img
                    src={data.image}
                    alt={data.prompt}
                    tw="max-w-full max-h-full"
                />
            )}
          </div>
      ),
      {
        width: 1200,
        height: 630,
      }
  )
}
