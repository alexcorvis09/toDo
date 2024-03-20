import { useState } from "react";
import { useEffect } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [toDos, settoDos] = useState([]);

  useEffect(() => {
    console.log("Comoponente terminó de renderizar");
  }, []);

  useEffect(() => {
    console.log("Use effect todos:", toDos);
  }, [toDos]);

  useEffect(() => {
    console.log("Use effect text:", text);
  }, [text]);

  useEffect(() => {
    console.log("Use effect text o todos:", text, toDos);
  }, [text, toDos]);

  function addHandler() {
    if (text.trim().length > 0) {
      settoDos([text.trim(), ...toDos]);
      setText("");
    }
  }

  function keyDownHandler(event) {
    if (event.key == "Enter") addHandler();
  }

  //closure
  function removeItem(index) {
    return () => {
      const filtered = toDos.filter((item, inneri) => inneri != index);
      settoDos(filtered);
    };
  }

  return (
    <main className="min-h-screen bg-purple-100 text-gray-500 flex flex-col p-5 gap-8">
      <div className="w-full flex justify-center items-center gap-2">
        <input
          type="text"
          className="bg-white text-black p-2 max-w-sm w-full rounded"
          onChange={(event) => setText(event.target.value)}
          onKeyDown={keyDownHandler}
          value={text}
        />
        <button className="bg-gray-300 p-2 rounded" onClick={addHandler}>
          Add
        </button>
      </div>
      <div className="w-full flex flex-col gap-3">
        {toDos.map((item, index) => {
          return (
            <div
              className="w-full flex justify-center items-center gap-2"
              key={`todo ${index}`}
            >
              <p className="max-w-sm w-full">{item}</p>
              <button
                className="bg-purple-300 p-2 rounded"
                onClick={removeItem(index)}
              >
                Done
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}
