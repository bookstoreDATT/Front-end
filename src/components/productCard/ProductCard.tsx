export default function ProductCard({ product }: { product: any }) {
    return (
        <div className='group cursor-pointer'>
            <div>
                <img
                    className='h-auto w-auto rounded-md duration-300 group-hover:scale-105'
                    src={product.thumbnail}
                    alt=''
                />
            </div>
            <div className='mt-4 w-full'>
                <h3 className='truncate text-base font-medium capitalize'>{product.name} âsdasdasdasd</h3>
            </div>
        </div>
    );
}
