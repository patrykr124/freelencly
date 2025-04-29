import Header from "../components/UI/Header";
import { Image, ScanLineIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageUpload from "../components/UI/ImageUpload";
import Select from "../components/UI/Select";
import {  type Input } from "../lib/useCreate";
import useAuth from "../store/auth";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useUpdateJob } from "../lib/UpdateJob";
import { useCurrentJobs } from "../lib/useCurrentJob";

export default function Edit() {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [img, setImg] = useState<File | undefined>();
  const [category, setCategory] = useState("web_development");
  const [standardPrice, setStandardPrice] = useState(0);
  const [standardRevision, setStandardRevision] = useState(0);
  const [standardDesc, setStandardDesc] = useState("");
  const [mediumPrice, setMediumPrice] = useState(0);
  const [mediumRevision, setMediumRevision] = useState(0);
  const [mediumDesc, setMediumDesc] = useState("");
  const [premiumPrice, setPremiumPrice] = useState(0);
  const [premiumRevision, setPremiumRevision] = useState(0);
  const [premiumDesc, setPremiumDesc] = useState("");
  const [sucess, setSucess] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageSetting, setImageSetting] = useState(false);
  const [servicesPerHour, setServicesPerHour] = useState("yes");
  const [servicesPerHourPrice, setServicesPerHourPrice] = useState(0);
  const navigate = useNavigate();
  const {id} = useParams();
  const { data: job } = useCurrentJobs(id);
  const { token } = useAuth();
  const createJob = useUpdateJob(token ?? "", id ?? "");
  console.log(job)

  useEffect(() => {
    if(job){
      setTitle(job.title);
      setDesc(job.description);
      setImagePreview(`http://localhost:3000/uploads/${job.img}`);
      setCategory(job.category);

      const standardPackage = job.packages.find((el: { type: string; }) => el.type === "BASIC");
      const mediumPackage = job.packages.find((el: { type: string; }) => el.type === "STANDARD");
      const premiumPackage = job.packages.find((el: { type: string; })  => el.type === "PREMIUM");

      if(standardPackage){
        setStandardPrice(standardPackage.price);
        setStandardRevision(standardPackage.revisions);
        setStandardDesc(standardPackage.description);
      }

      if(mediumPackage){
        setMediumPrice(mediumPackage.price);
        setMediumRevision(mediumPackage.revisions);
        setMediumDesc(mediumPackage.description);
      }

      if(premiumPackage){
        setPremiumPrice(premiumPackage.price);
        setPremiumRevision(premiumPackage.revisions);
        setPremiumDesc(premiumPackage.description);
      }
     
      setServicesPerHour("yes");
      setServicesPerHourPrice(job.taskPerHours[0]?.hourlyRate);
    }
  },[job])

  function handleSend(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input: Input = {
      title,
      img,
      description,
      category,
      standardPrice,
      standardRevision,
      standardDesc,
      mediumPrice,
      mediumRevision,
      mediumDesc,
      premiumPrice,
      premiumRevision,
      premiumDesc,
      servicesPerHourPrice,
    };
    createJob.mutate(input, {
      onSuccess: (data) => {
        navigate(`/services/${category}/${id}`);
        console.log(data);
        setSucess("Udało się!");
      },

      onError: (error) => {
        console.error("Błąd w edit.tsx", error);
      },
    });
  }

  return (
    <div className=" flex flex-col justify-center items-center overflow-hidden">
      <Header img={"/img/create.jpg"} title="Create a announcment" />
      <div className="wrapper py-20 space-y-8">
        <h1 className="text-3xl">Create a announcment</h1>
        <form className="space-y-6" onSubmit={handleSend}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <label htmlFor="media">background</label>
          <div className="relative">
            <input
              ref={fileInputRef}
              className="hidden"
              type="file"
              accept="image/*"
              name="media"
              id="media"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setImg(e.target.files[0]);
                  const file = e.target.files[0];
                  setImagePreview(URL.createObjectURL(file));
                }
              }}
            />
            <div className="relative group overflow-hidden w-fit cursor-pointer">
              <div onClick={() => fileInputRef.current?.click()} className="">
                {imagePreview ? (
                  <ImageUpload
                    imageSetting={imageSetting}
                    imagePreview={imagePreview}
                  />
                ) : (
                  <Image
                    strokeWidth={0.3}
                    color="gray"
                    className="w-[400px] h-[200px]  bg-black/5 rounded-xl my-2"
                  />
                )}
              </div>
              <div className=" group-hover:opacity-100 opacity-0 bottom-2 transition-all rounded-b-xl duration-300 absolute left-0 w-full h-12 bg-black/80 flex items-center justify-end p-4">
                <div
                  onClick={() => setImageSetting((prev) => !prev)}
                  className="w-fit h-fit"
                >
                  <ScanLineIcon
                    strokeWidth={0.5}
                    size={35}
                    color="white"
                    className=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description">Description</label>
            <ReactQuill theme="snow" value={description} onChange={setDesc} />
          </div>
          <Select category={category} setCategory={setCategory} />
          <div className="flex gap-4">
            <div className="jobPackage">
              <div className="space-y-4">
                <h2 className="text-2xl">Standard</h2>
                <label htmlFor="price">Price</label>
                <input
                  onChange={(e) => setStandardPrice(Number(e.target.value))}
                  value={standardPrice}
                  type="number"
                  name="price"
                  id="price"
                />
                <label htmlFor="revision">Revision</label>
                <input
                  onChange={(e) => setStandardRevision(Number(e.target.value))}
                  value={standardRevision}
                  type="number"
                  name="revision"
                  id="revision"
                />
                <label htmlFor="description">description</label>
                <div className="">
                  <textarea
                    onChange={(e) => setStandardDesc(e.target.value)}
                    value={standardDesc}
                    className="h-40 w-full p-2 border-[1px] border-black/10 rounded-xl"
                    name="description"
                    id="description"
                  />
                </div>
              </div>
            </div>

            <div className="jobPackage">
              <div className="space-y-4">
                <h2 className="text-2xl">Medium</h2>
                <label htmlFor="price">Price</label>
                <input
                  onChange={(e) => setMediumPrice(Number(e.target.value))}
                  value={mediumPrice}
                  type="text"
                  name="price"
                  id="price"
                />
                <label htmlFor="revision">Revision</label>
                <input
                  onChange={(e) => setMediumRevision(Number(e.target.value))}
                  value={mediumRevision}
                  type="number"
                  name="revision"
                  id="revision"
                />
                <label htmlFor="description">description</label>
                <div className="">
                  <textarea
                    onChange={(e) => setMediumDesc(e.target.value)}
                    value={mediumDesc}
                    className="h-40 w-full p-2 border-[1px] border-black/10 rounded-xl"
                    name="description"
                    id="description"
                  />
                </div>
              </div>
            </div>

            <div className="jobPackage">
              <div className="space-y-4">
                <h2 className="text-2xl">Premium</h2>
                <label htmlFor="price">Price</label>
                <input
                  onChange={(e) => setPremiumPrice(Number(e.target.value))}
                  value={premiumPrice}
                  type="text"
                  name="price"
                  id="price"
                />
                <label htmlFor="revision">Revision</label>
                <input
                  onChange={(e) => setPremiumRevision(Number(e.target.value))}
                  value={premiumRevision}
                  type="number"
                  name="revision"
                  id="revision"
                />
                <label htmlFor="description">description</label>
                <div className="">
                  <textarea
                    onChange={(e) => setPremiumDesc(e.target.value)}
                    value={premiumDesc}
                    className="h-40 w-full p-2 border-[1px] border-black/10 rounded-xl"
                    name="description"
                    id="description"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl">Services per hours</h2>
            <div className="space-y-6 ">
              <div className="flex gap-4">
                <label className="flex gap-1 items-center justify-center w-fit">
                  <input
                    className="w-fit -mt-0"
                    type="radio"
                    name="servicesPerHour"
                    value="yes"
                    checked={servicesPerHour === "yes"}
                    onChange={() => setServicesPerHour("yes")}
                  />
                  <p className="flex items-center justify-center">Yes</p>
                </label>
                <label className="flex gap-1 items-center justify-center w-fit">
                  <input
                    className="w-fit -mt-0"
                    type="radio"
                    name="servicesPerHour"
                    value="no"
                    checked={servicesPerHour === "no"}
                    onChange={() => setServicesPerHour("no")}
                  />
                  No
                </label>
              </div>
              {servicesPerHour === "yes" && (
                <div className="space-y-4">
                  <label htmlFor="price">Price (zł)</label>
                  <input
                    onChange={(e) =>
                      setServicesPerHourPrice(Number(e.target.value))
                    }
                    value={servicesPerHourPrice}
                    type="number"
                    name="price"
                    id="price"
                  />
                </div>
              )}
            </div>
          </div>
          {createJob.isError && <p>{JSON.stringify(createJob.error)}</p>}
          {<p>{sucess}</p>}
          <button
            disabled={createJob.isPending}
            type="submit"
            className="bg-black text-white px-12 py-3 rounded-xl cursor-pointer"
          >
            Edit
          </button>
        </form>
      </div>
    </div>
  );
}
