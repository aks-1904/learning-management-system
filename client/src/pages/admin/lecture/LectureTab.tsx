import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

const MEDIA_API = `http://localhost:8080/media`;

const LectureTab = () => {
  const [title, setTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState<any>(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [buttonDisable, setButtonDisable] = useState(true);

  const config = {
    onUploadProgress: ({ loaded, total }: ProgressEvent) => {
      if (total) {
        setUploadProgress(Math.round((loaded * 100) / total));
      }
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  };

  const fileChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const res: any = await axios.post(
          `${MEDIA_API}/upload-video`,
          formData,
          config
        );
        if (res.data?.success) {
          setUploadVideoInfo({
            videoUrl: res.data?.data?.secure_url || res.data?.data?.url,
            publicId: res.data?.data?.publicId,
          });
          setButtonDisable(false);
          toast.success(res.data?.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Video upload failed");
      } finally {
        setMediaProgress(false);
      }
    }
  };

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Make changes and click save when done.
          </CardDescription>
        </div>
        <div>
          <Button variant={"destructive"}>Remove Lecture</Button>
        </div>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="flex flex-col gap-1">
            <Label>Title</Label>
            <Input type="text" placeholder="Ex. VS code setup" />
          </div>
          <div className="flex flex-col gap-1">
            <Label>
              Video <span className="text-red-500">*</span>
            </Label>
            <Input
              onChange={fileChangeHandler}
              type="file"
              accept="video/*"
              placeholder="Ex. VS code setup"
              className="w-fit"
            />
          </div>
          <div className="flex items-center space-x-2 my-2">
            <Switch id="isPreviewFree" />
            <Label htmlFor="isPreviewFree">Is this video FREE</Label>
          </div>
          {mediaProgress && (
            <div className="my-4">
              <Progress value={uploadProgress} />
              <p>{uploadProgress}% uploaded</p>
            </div>
          )}
          <div className="mt-4">
            <Button type="submit">Update Lecture</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
