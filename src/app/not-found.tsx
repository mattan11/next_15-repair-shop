import Image from 'next/image'

export const metadata = {
    title: 'Page Not Found',
}

const NotFound = () => {
    return (
        <div className="flex w-full min-h-screen">
            <div className="mx-auto py-4 flex flex-col justify-center items-center gap-4">
                <h2 className="text-2xl">Page Not Found</h2>
                <Image
                    className="m-0 rounded-xl"
                    src="/images/not-found-1024x1024.png"
                    width={300}
                    height={300}
                    sizes="300px"
                    alt="Page Not Found"
                    priority={true}
                    title="Page Not Found"
                />
            </div>
        </div>
    )
}

export default NotFound
