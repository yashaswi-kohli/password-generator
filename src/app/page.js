"use client";

import { useCallback, useEffect, useState, useRef } from "react";

export default function Home() {
    const [length, setLength] = useState(8);
    const [password, setPassword] = useState("");
    const [includeNumbers, setIncludeNumbers] = useState(false);
    const [includeCharacters, setIncludeCharacters] = useState(false);

    const passwordRef = useRef(null);

    const passwordGenerate = useCallback(() => {
        let newPassword = "";
        let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if (includeNumbers) characters += "0123456789";
        if (includeCharacters) characters += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

        for (let i = 1; i <= length; ++i) {
            newPassword += characters.charAt(
                Math.floor(Math.random() * characters.length) + 1
            );
        }
        setPassword(newPassword);
    }, [length, includeNumbers, includeCharacters, setPassword]);

    useEffect(() => {
        passwordGenerate();
    }, [length, includeNumbers, includeCharacters, passwordGenerate]);

    return (
        <main className="min-h-screen p-24">
            <p className="text-6xl">Password Generator</p>
            <div className="bg-orange-600 mt-10 h-[132px] w-3/5 rounded-3xl">
                <div className="mt-10 mx-5">
                    <input
                        type="text"
                        className="border-2 border-gray-300 mt-6 ml-1 p-2 h-full w-5/6 border-none rounded-xl bg-white text-black outline-none"
                        value={password}
                        placeholder={password}
                        readOnly
                        ref={passwordRef}
                    />
                    <button
                        className="bg-blue-500 rounded-xl text-white text-xl px-4 py-1 ml-2"
                        onClick={() => {
                            passwordRef.current?.select();
                            window.navigator.clipboard.writeText(password);
                        }}
                    >
                        Copy
                    </button>
                </div>
                <div className="flex mx-5 mt-4 justify-around">
                    <div className="flex items-center mt-2 ml-1">
                        <label className="text-xl mr-3">Length:</label>
                        <input
                            type="range"
                            id="length"
                            min={6}
                            max={50}
                            value={length}
                            onChange={(e) => {
                                setLength(e.target.value);
                            }}
                        />
                        <span className="ml-2 text-xl">{length}</span>
                    </div>
                    <div className="flex items-center mt-2 ml-1 gap-2">
                        <input
                            type="checkbox"
                            checked={includeNumbers}
                            onChange={(e) =>
                                setIncludeNumbers(e.target.checked)
                            }
                        />
                        <label className="text-xl">Include Numbers</label>
                    </div>
                    <div className="flex items-center mt-2 ml-1 gap-2">
                        <input
                            type="checkbox"
                            checked={includeCharacters}
                            onChange={(e) =>
                                setIncludeCharacters(e.target.checked)
                            }
                        />
                        <label className="text-xl">Include Characters</label>
                    </div>
                </div>
            </div>
        </main>
    );
}
