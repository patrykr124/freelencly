interface props {
    imagePreview: string;
    imageSetting: boolean
}
export default function ImageUpload({ imagePreview, imageSetting }: props) {
    return (
        <div className="box  w-full h-full">
            <img src={imagePreview} className={`w-[400px] h-[200px] rounded-xl my-2 ${imageSetting ? 'object-contain' : 'object-cover'}`} />
           
        </div>
    )
}