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
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import {
  useEditLectureMutation,
  useGetLectureByIdQuery,
  useRemoveLectureMutation,
} from "@/features/api/courseapi";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

const MEDIA_API = `http://localhost:8080/media`;

const LectureTab = () => {
  const [title, setTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState<any>(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [buttonDisable, setButtonDisable] = useState(true);

  const { courseId, lectureId } = useParams();
  const { data: lectureData } = useGetLectureByIdQuery(lectureId);
  const lecture = lectureData?.lecture;

  useEffect(()=>{
    if(lecture){
      setTitle(lecture?.title);
      setIsFree(lecture?.isPreviewFree || false);
      setUploadVideoInfo(lecture?.videoInfo);
    }
  }, [lecture])

  const [editLecture, { data, isLoading, error, isSuccess }] =
    useEditLectureMutation();
  const [
    removeLecture,
    { isLoading: removeLoading, isSuccess: removeSuccess },
  ] = useRemoveLectureMutation();

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
            publicId: res.data?.data?.public_id,
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

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
    }
    if (error) {
      const message =
        "data" in error
          ? (error.data as { message?: string })?.message
          : "Login Failed";
      toast.error(message);
    }
    if (removeSuccess) {
      toast.success("Lecture removed successfully");
    }
  }, [error, isSuccess, removeSuccess]);

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
          {removeLoading ? (
            <Button disabled variant={"destructive"}>
              <Loader2 /> Please Wait...
            </Button>
          ) : (
            <Button
              variant={"destructive"}
              onClick={async () => {
                await removeLecture(lectureId);
                if (removeSuccess) {
                  navigate(`/instructor/course/${courseId}/lectures`, {
                    replace: true,
                  });
                }
              }}
            >
              Remove Lecture
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            await editLecture({
              title,
              videoInfo: uploadVideoInfo,
              isPreviewFree: isFree,
              courseId,
              lectureId,
            });
          }}
        >
          <div className="flex flex-col gap-1">
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Ex. VS code setup"
            />
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
            <Switch
              checked={isFree}
              onCheckedChange={setIsFree}
              id="isPreviewFree"
            />
            <Label htmlFor="isPreviewFree">Is this video FREE</Label>
          </div>
          {mediaProgress && (
            <div className="my-4">
              <Progress value={uploadProgress} />
              <p>{uploadProgress}% uploaded</p>
            </div>
          )}
          <div className="mt-4">
            {isLoading ? (
              <>
                <Button>
                  <Loader2 className="animate-spin mr-2" />
                  Please Wait...
                </Button>
              </>
            ) : (
              <>
                <Button type="submit">Update Lecture</Button>
              </>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
