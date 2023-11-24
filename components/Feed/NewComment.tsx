"use client"
import { useRef, useState } from "react";

const NewComment = () => {
    const newCommentRef = useRef<HTMLTextAreaElement>(null);
    const [charCount, setCharCount] = useState<number>(255);

    const handleInputChange = () => {
        const textInput = newCommentRef.current!.value;
        const remainingCharacters = Math.max(255 - textInput.length, 0);
        setCharCount(remainingCharacters);
    }

  return (
    <form className="w-full bg-white rounded-lg shadow-lg mb-8 p-8">
        <h1>Add Comment</h1>
        <textarea 
            className="w-full bg-off-white rounded-lg h-24 mt-4 p-4"
            ref={newCommentRef}
            onChange={handleInputChange}
            maxLength={255}
        />
        <div className="flex justify-between baseline mt-4">
            <p>{charCount} Characters left</p>
            <button className="bg-purple text-white rounded-lg h-12 w-32">Post Comment</button>
        </div>
    </form>
  )
}

export default NewComment