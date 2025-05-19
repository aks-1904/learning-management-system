import { CourseDetails } from "@/types/form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // or bubble.css

interface Props {
  input: CourseDetails;
  setInput: React.Dispatch<React.SetStateAction<CourseDetails>>;
}

const RichTextEditor = (props: Props) => {
  const handleChange = (content: string) => {
    props.setInput({ ...props.input, description: content });
  };

  return (
    <div className="max-w-full">
      <ReactQuill
        theme="snow"
        value={props.input.description}
        onChange={handleChange}
        placeholder="Write something amazing..."
        className="bg-white dark:bg-zinc-900 text-black dark:text-white"
      />
    </div>
  );
};

export default RichTextEditor;
