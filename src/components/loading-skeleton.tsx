import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonCard() {
    return (
        <div className="px-6 py-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
                <Skeleton className="h-[170px] w-[450px]" />
                <Skeleton className="h-[170px] w-[450px]" />
                <Skeleton className="h-[170px] w-[450px]" />
                <Skeleton className="h-[170px] w-[450px]" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-7 gap-4 mt-6">
                <Skeleton className="h-[300px] col-span-4"/>
                <Skeleton className="h-[300px] col-span-3"/>
            </div>
        </div>
    )
}
