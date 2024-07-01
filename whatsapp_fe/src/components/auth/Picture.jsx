import { useRef, useState } from "react";

export default function Picture({
  readablePicture,
  setReadablePicture,
  setPicture,
}) {
  const inputRef = useRef();
  const [error, setError] = useState("");

  const handlePicture = (e) => {
    let pic = e.target.files[0];
    if (
      pic.type !== "image/png" &&
      pic.type !== "image/jpeg" &&
      pic.type !== "image/webp"
    ) {
      setError(
        `${pic.name} format is not supported. Please use png, jpeg or webp format.`
      );
      return;
    } else if (pic.size > 1024 * 1024 * 5) {
      setError(`${pic.name} is too large. Please use less than 5MB. `);
      return;
    } else {
      setPicture(pic);
      const reader = new FileReader();
      reader.readAsDataURL(pic);
      reader.onload = (e) => {
        setReadablePicture(e.target.result);
      };
      setError("");
    }
  };

  const handleChangePic = () => {
    setPicture("");
    setReadablePicture("");
  };

  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
      <label className="text-sm font-bold tracking-wide" htmlFor="picture">
        Picture (Optional)
      </label>
      {readablePicture ? (
        <div>
          <img
            src={readablePicture}
            alt="profile"
            className="w-20 h-20 object-cover rounded-full"
          />
          <div
            className="w-20 dark:bg-dark_bg_3 rounded-md text-xs font-bold flex items-center justify-center cursor-pointer mt-2 py-1"
            onClick={handleChangePic}
          >
            Remove
          </div>
        </div>
      ) : (
        <div
          className="w-full h-12 dark:bg-dark_bg_3 rounded-md font-bold flex items-center justify-center cursor-pointer"
          onClick={() => inputRef.current.click()}
        >
          Upload picture
        </div>
      )}
      <input
        ref={inputRef}
        hidden
        type="file"
        name="picture"
        id="picture"
        accept="image/png,image/jpeg,image/webp"
        onChange={handlePicture}
      />
      {error && (
        <div className="mt-2">
          <p className="text-red-400">{error}</p>
        </div>
      )}
    </div>
  );
}
