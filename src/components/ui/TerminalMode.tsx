"use client";

import React, { useState, useEffect, useRef } from "react";
import { profileConfig } from "@/config/profile";
import { Terminal, X } from "lucide-react";

interface TerminalModeProps {
  onClose: () => void;
}

interface CommandHistoryItem {
  id?: string;
  command: string;
  output?: React.ReactNode;
  isCancelled?: boolean;
}

const ALL_COMMANDS = [
  "resume help",
  "resume whoami",
  "resume experience",
  "resume projects",
  "resume skills",
  "resume education",
  "resume download-pdf",
  "clear",
  "exit",
  "gui",
  "ls",
  "npm run farm",
  "pwd",
  "date",
  "echo",
  "history",
  "uptime"
];

function getSharedPrefix(arr: string[]): string {
  if (arr.length === 0) return "";
  let prefix = arr[0];
  for (let i = 1; i < arr.length; i++) {
    while (arr[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (prefix === "") return "";
    }
  }
  return prefix;
}

// Recursive helper to clone a React node tree and slice text to a maximum length.
// This allows typing out styled HTML/React components without rendering raw brackets or broken structures.
function cloneAndSliceNode(node: React.ReactNode, maxLength: number): { element: React.ReactNode; length: number } {
  if (node === null || node === undefined) {
    return { element: null, length: 0 };
  }

  if (typeof node === "string") {
    const slice = node.slice(0, maxLength);
    return { element: slice, length: slice.length };
  }

  if (typeof node === "number") {
    const str = String(node);
    const slice = str.slice(0, maxLength);
    return { element: slice, length: slice.length };
  }

  if (Array.isArray(node)) {
    let currentLength = 0;
    const elements: React.ReactNode[] = [];
    for (const child of node) {
      if (currentLength >= maxLength) break;
      const { element, length } = cloneAndSliceNode(child, maxLength - currentLength);
      elements.push(element);
      currentLength += length;
    }
    return { element: elements, length: currentLength };
  }

  if (React.isValidElement(node)) {
    const props = node.props as any;
    if (props && props.children !== undefined) {
      const { element: slicedChildren, length } = cloneAndSliceNode(props.children, maxLength);
      const cloned = React.cloneElement(node, undefined, slicedChildren);
      return { element: cloned, length };
    }
    return { element: node, length: 0 };
  }

  return { element: node, length: 0 };
}

interface TypewriterProps {
  children: React.ReactNode;
  speed?: number; // Characters to reveal per frame
  onComplete?: () => void;
}

function Typewriter({ children, speed = 6, onComplete }: TypewriterProps) {
  const [maxLength, setMaxLength] = useState(0);
  const totalLengthRef = useRef(0);
  const onCompleteRef = useRef(onComplete);

  // Keep references updated
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Compute total text content length in dry run
  useEffect(() => {
    const { length } = cloneAndSliceNode(children, Infinity);
    totalLengthRef.current = length;
  }, [children]);

  useEffect(() => {
    let frameId: number;
    const tick = () => {
      setMaxLength((prev) => {
        const next = prev + speed;
        if (next >= totalLengthRef.current) {
          if (onCompleteRef.current) {
            onCompleteRef.current();
          }
          return totalLengthRef.current;
        }
        frameId = requestAnimationFrame(tick);
        return next;
      });
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [children, speed]);

  const { element } = cloneAndSliceNode(children, maxLength);
  return <>{element}</>;
}

function TerminalLoader() {
  const [dots, setDots] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 250);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="text-zinc-500 font-mono flex items-center gap-1.5 py-1">
      <span className="w-2 h-2 rounded-full bg-accent-blue animate-ping" />
      <span>Processing command{dots}</span>
    </div>
  );
}

export default function TerminalMode({ onClose }: TerminalModeProps) {
  const [input, setInput] = useState("resume help");
  const [isExecuting, setIsExecuting] = useState(false);
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      id: "init",
      command: "system-init",
      output: (
        <div className="text-zinc-400 space-y-2">
          <p className="text-accent-green font-bold">
            Welcome to Sandeep Halyal's Interactive Terminal CLI (v1.5.0)
          </p>
          <p>
            Type <span className="text-accent-blue font-semibold">`resume help`</span> to list all available commands and get started.
          </p>
          <p className="text-xs">
            Shortcut: Press <span className="text-zinc-300 font-semibold bg-zinc-800 px-1 py-0.5 rounded">`</span> or <span className="text-zinc-300 font-semibold bg-zinc-800 px-1 py-0.5 rounded">Ctrl + ~</span> at any time to toggle between Terminal and GUI modes.
          </p>
          <p className="text-[10px] text-zinc-500">
            Tab Auto-Complete: Press <span className="text-zinc-400 font-semibold bg-zinc-800 px-1 py-0.5 rounded">Tab</span> to auto-complete or list matching commands.
          </p>
        </div>
      ),
    },
  ]);
  const [commandList, setCommandList] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load history from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("terminal_command_history");
      if (saved) {
        try {
          setCommandList(JSON.parse(saved));
        } catch (e) {
          console.error("Error loading command history", e);
        }
      }
    }
    inputRef.current?.focus();
  }, []);

  // Continuous scroll to bottom while executing commands (handles spinner + typewriter growth)
  useEffect(() => {
    if (isExecuting && containerRef.current) {
      const scrollContainer = containerRef.current;
      const interval = setInterval(() => {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isExecuting]);

  // Scroll to bottom whenever history changes (just in case)
  useEffect(() => {
    if (containerRef.current) {
      const scrollContainer = containerRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
      const timer = setTimeout(() => {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [history]);

  // Re-focus input after command execution completes
  useEffect(() => {
    if (!isExecuting) {
      inputRef.current?.focus();
    }
  }, [isExecuting]);

  // Click handler to re-focus input
  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isExecuting) return;

    if (e.ctrlKey && (e.key === "c" || e.key === "C")) {
      e.preventDefault();
      setHistory((prev) => [
        ...prev,
        {
          command: input,
          isCancelled: true,
        },
      ]);
      setInput("");
      setHistoryIndex(-1);
      return;
    }

    if (e.ctrlKey && (e.key === "l" || e.key === "L")) {
      e.preventDefault();
      setHistory([]);
      return;
    }

    if (e.ctrlKey && (e.key === "u" || e.key === "U")) {
      e.preventDefault();
      setInput("");
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandList.length === 0) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex < commandList.length) {
        setHistoryIndex(nextIndex);
        setInput(commandList[commandList.length - 1 - nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = historyIndex - 1;
      if (nextIndex >= 0) {
        setHistoryIndex(nextIndex);
        setInput(commandList[commandList.length - 1 - nextIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const currentVal = input.toLowerCase();
      const trimmedVal = currentVal.trim();

      // If input is empty, print all commands as hints
      if (!trimmedVal) {
        setHistory((prev) => [
          ...prev,
          {
            command: "",
            output: (
              <div className="text-zinc-500 font-mono text-xs grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1">
                {ALL_COMMANDS.map((cmd) => (
                  <div key={cmd} className="hover:text-zinc-300 transition-colors">
                    {cmd}
                  </div>
                ))}
              </div>
            ),
          },
        ]);
        return;
      }

      // Filter matches
      const matches = ALL_COMMANDS.filter((cmd) => cmd.startsWith(currentVal));

      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        // Complete as much of the prefix as possible
        const shared = getSharedPrefix(matches);
        if (shared && shared.length > currentVal.length) {
          setInput(shared);
        }

        // Show suggestions list in terminal output
        setHistory((prev) => [
          ...prev,
          {
            command: input,
            output: (
              <div className="text-zinc-500 font-mono text-xs grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1">
                {matches.map((cmd) => (
                  <div key={cmd}>{cmd}</div>
                ))}
              </div>
            ),
          },
        ]);
      }
    }
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isExecuting) return;

    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const cmdLower = trimmedInput.toLowerCase();

    // Clear runs instantly without loading animations
    if (cmdLower === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    // Save to history and persist
    const nextList = [...commandList, trimmedInput];
    setCommandList(nextList);
    if (typeof window !== "undefined") {
      localStorage.setItem("terminal_command_history", JSON.stringify(nextList));
    }
    setHistoryIndex(-1);
    setInput("");

    // Put CLI into executing state
    setIsExecuting(true);

    const tempId = Date.now().toString() + Math.random().toString();

    // Add loading block to the terminal history
    setHistory((prev) => [
      ...prev,
      {
        id: tempId,
        command: trimmedInput,
        output: <TerminalLoader />,
      },
    ]);

    // Random loading delay between 500ms and 1200ms
    const delay = Math.floor(Math.random() * (1200 - 500) + 500);

    setTimeout(() => {
      let finalContent: React.ReactNode = null;

      // Command parser outputs
      if (cmdLower === "exit" || cmdLower === "gui") {
        onClose();
        setIsExecuting(false);
        return;
      } else if (cmdLower === "resume help") {
        finalContent = (
          <div className="space-y-2 text-zinc-300">
            <p className="text-accent-blue font-bold">Available Commands:</p>
            <div className="grid grid-cols-[200px_1fr] gap-x-4 gap-y-1.5 font-mono text-sm">
              <span className="text-accent-green">resume whoami</span>
              <span>Display bio, contact info, and profiles</span>
              <span className="text-accent-green">resume experience</span>
              <span>List detailed work history (RoaDo, Samprithi Farms)</span>
              <span className="text-accent-green">resume projects</span>
              <span>View personal projects and live website links</span>
              <span className="text-accent-green">resume skills</span>
              <span>Show core technical and domain skills</span>
              <span className="text-accent-green">resume education</span>
              <span>Show academic credentials</span>
              <span className="text-accent-green">resume download-pdf</span>
              <span>Open the print-optimized PDF resume</span>
              <span className="text-accent-green">clear</span>
              <span>Clear the screen</span>
              <span className="text-accent-green">exit / gui</span>
              <span>Return to the 3D graphical portfolio interface</span>
            </div>
            <p className="text-xs text-zinc-500 pt-1">
              Tip: You can also try standard terminal commands like `ls`, `cd`, `sudo`, or `npm run farm`.
            </p>
          </div>
        );
      } else if (cmdLower === "resume whoami") {
        finalContent = (
          <div className="space-y-2 text-zinc-300">
            <p className="text-white font-semibold text-lg">{profileConfig.personal.name}</p>
            <p className="text-accent-green font-medium">{profileConfig.personal.title}</p>
            <p className="italic text-zinc-400">"{profileConfig.personal.tagline}"</p>
            <div className="pt-2 grid grid-cols-[100px_1fr] gap-x-2 text-sm">
              <span className="text-zinc-500">Location:</span>
              <span>{profileConfig.personal.location}</span>
              <span className="text-zinc-500">Email:</span>
              <a href={`mailto:${profileConfig.personal.email}`} className="text-accent-blue hover:underline">
                {profileConfig.personal.email}
              </a>
              <span className="text-zinc-500">Phone:</span>
              <a href={`tel:${profileConfig.personal.phone}`} className="text-accent-blue hover:underline">
                {profileConfig.personal.phone}
              </a>
              <span className="text-zinc-500">GitHub:</span>
              <a href={profileConfig.personal.github} target="_blank" rel="noreferrer" className="text-accent-blue hover:underline">
                {profileConfig.personal.github}
              </a>
              <span className="text-zinc-500">LinkedIn:</span>
              <a href={profileConfig.personal.linkedin} target="_blank" rel="noreferrer" className="text-accent-blue hover:underline">
                {profileConfig.personal.linkedin}
              </a>
              <span className="text-zinc-500">Quora:</span>
              <a href={profileConfig.personal.quora} target="_blank" rel="noreferrer" className="text-accent-blue hover:underline">
                {profileConfig.personal.quora}
              </a>
            </div>
          </div>
        );
      } else if (cmdLower === "resume experience") {
        finalContent = (
          <div className="space-y-6 text-zinc-300">
            {profileConfig.experience.map((exp, idx) => (
              <div key={idx} className="border-l-2 border-accent-green pl-4 space-y-2">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div>
                    <h4 className="text-white font-bold text-base">{exp.role}</h4>
                    <p className="text-accent-green text-sm font-semibold">{exp.company}</p>
                  </div>
                  <span className="text-xs text-zinc-500 font-mono bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                    {exp.period}
                  </span>
                </div>
                {exp.description && <p className="text-zinc-400 text-xs italic">{exp.description}</p>}
                {exp.link && (
                  <div className="text-xs">
                    <span className="text-zinc-500">Link: </span>
                    <a href={exp.link} target="_blank" rel="noreferrer" className="text-accent-blue hover:underline">
                      {exp.link}
                    </a>
                  </div>
                )}
                <ul className="list-disc list-inside text-xs text-zinc-300 space-y-1.5 pl-1 pt-1">
                  {exp.achievements.map((ach, aIdx) => (
                    <li key={aIdx} className="leading-relaxed">
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      } else if (cmdLower === "resume projects") {
        finalContent = (
          <div className="space-y-6 text-zinc-300">
            {profileConfig.projects.map((proj, idx) => (
              <div key={idx} className="border-l-2 border-accent-blue pl-4 space-y-2">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <h4 className="text-white font-bold text-base">{proj.name}</h4>
                  <span className="text-xs text-zinc-500 font-mono bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                    {proj.period}
                  </span>
                </div>
                <p className="text-zinc-300 text-xs leading-relaxed">{proj.description}</p>
                {proj.link && (
                  <div className="text-xs">
                    <span className="text-zinc-500">URL: </span>
                    <a href={proj.link} target="_blank" rel="noreferrer" className="text-accent-green hover:underline">
                      {proj.link}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      } else if (cmdLower === "resume skills") {
        finalContent = (
          <div className="space-y-2 text-zinc-300">
            <p className="text-accent-green font-bold">Skills Summary:</p>
            <div className="flex flex-wrap gap-2 pt-1">
              {profileConfig.skills.map((skill, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-xs text-accent-green font-mono">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        );
      } else if (cmdLower === "resume education") {
        finalContent = (
          <div className="space-y-4 text-zinc-300">
            {profileConfig.education.map((edu, idx) => (
              <div key={idx} className="border-l-2 border-accent-blue pl-4 space-y-1">
                <h4 className="text-white font-bold text-sm">{edu.degree}</h4>
                <p className="text-zinc-400 text-xs">{edu.institution} | {edu.period}</p>
                <p className="text-accent-blue text-xs font-semibold">Minor: {edu.minor}</p>
              </div>
            ))}
          </div>
        );
      } else if (cmdLower === "resume download-pdf") {
        finalContent = (
          <div className="text-accent-green">
            <p>[SYSTEM] Triggering PDF Resume download...</p>
            <p className="text-zinc-400 text-xs">Opening page in a new window to auto-print.</p>
          </div>
        );
        if (typeof window !== "undefined") {
          window.open("/resume", "_blank");
        }
      } else if (cmdLower.startsWith("sudo")) {
        finalContent = <p className="text-red-400 font-mono">Permission denied: Nice try though! 😉</p>;
      } else if (cmdLower === "ls") {
        finalContent = (
          <div className="font-mono text-zinc-300 text-sm space-y-1">
            <p className="text-zinc-500">drwxr-xr-x  sandeep  staff   4096 Jul  1 13:00  <span className="text-accent-blue font-bold">experience/</span></p>
            <p className="text-zinc-500">drwxr-xr-x  sandeep  staff   4096 Jul  1 13:00  <span className="text-accent-blue font-bold">projects/</span></p>
            <p className="text-zinc-500">drwxr-xr-x  sandeep  staff   4096 Jul  1 13:00  <span className="text-accent-blue font-bold">skills/</span></p>
            <p className="text-zinc-500">-rw-r--r--  sandeep  staff    852 Jul  1 13:00  <span className="text-zinc-300">readme.md</span></p>
          </div>
        );
      } else if (cmdLower.startsWith("cd")) {
        finalContent = <p className="text-zinc-400">cd: You are already exactly where you need to be. Sticking to root is recommended.</p>;
      } else if (cmdLower === "pwd") {
        finalContent = <p className="text-zinc-300">/home/sandeep/portfolio</p>;
      } else if (cmdLower === "date") {
        finalContent = <p className="text-zinc-300">{new Date().toString()}</p>;
      } else if (cmdLower.startsWith("echo")) {
        const echoText = trimmedInput.substring(4).trim();
        finalContent = <p className="text-zinc-300">{echoText}</p>;
      } else if (cmdLower === "uptime") {
        const seconds = typeof window !== "undefined" ? Math.floor(performance.now() / 1000) : 0;
        const mins = Math.floor(seconds / 60);
        const hrs = Math.floor(mins / 60);
        finalContent = <p className="text-zinc-300">up {hrs > 0 ? `${hrs} hours, ` : ""}{mins % 60} minutes, {seconds % 60} seconds</p>;
      } else if (cmdLower === "history") {
        finalContent = (
          <div className="font-mono text-zinc-300 text-sm space-y-1">
            {nextList.map((cmd, idx) => (
              <div key={idx} className="flex gap-4">
                <span className="text-zinc-500 w-8 text-right">{idx + 1}</span>
                <span>{cmd}</span>
              </div>
            ))}
          </div>
        );
      } else if (cmdLower === "npm run farm") {
        finalContent = (
          <div className="font-mono text-zinc-300 space-y-2">
            <p className="text-zinc-500">&gt; samprithi-farms@1.0.0 farm</p>
            <p className="text-zinc-500">&gt; node scripts/feed-chickens.js</p>
            <p className="pt-2 text-accent-green">🌾 Feeding 1500+ Country Chickens...</p>
            <p className="text-accent-blue">🥚 Egg production check: 300+ layers operating at peak efficiency</p>
            <p className="text-yellow-600"> Broccoli, Spinach and Tomatoes status: Growing in organic fashion</p>
            <p className="text-green-500 font-bold">[SUCCESS] Samprithi Farms operating at optimal parameters!</p>
          </div>
        );
      } else {
        finalContent = (
          <div className="text-red-400 font-mono space-y-1">
            <p>Command not found: "{trimmedInput}"</p>
            <p className="text-zinc-400 text-xs">
              Type <span className="text-accent-blue font-semibold">`resume help`</span> to view a list of supported commands.
            </p>
          </div>
        );
      }

      // Wrap output in a Typewriter component to animate printing at ~100 tps speed (~6 chars per tick)
      // When typewriter completes typing, isExecuting is set to false to unlock the command line.
      const output = (
        <Typewriter speed={6} onComplete={() => setIsExecuting(false)}>
          {finalContent}
        </Typewriter>
      );

      // Update history with Typewriter content
      setHistory((prev) =>
        prev.map((item) => (item.id === tempId ? { ...item, output } : item))
      );
    }, delay);
  };

  return (
    <div
      onClick={handleContainerClick}
      className="absolute inset-0 bg-[#050505] text-zinc-300 font-mono flex flex-col z-50 select-text cursor-text"
      style={{
        backgroundImage: "radial-gradient(rgba(16, 185, 129, 0.03) 1px, transparent 0)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* Terminal Title Bar */}
      <div className="flex justify-between items-center bg-[#0d0d0d] px-4 py-2 border-b border-zinc-900 shrink-0 pointer-events-auto select-none">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <button
              onClick={onClose}
              disabled={isExecuting}
              className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 flex items-center justify-center transition-colors group disabled:opacity-40"
            >
              <X size={8} className="text-red-950 opacity-0 group-hover:opacity-100" />
            </button>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-zinc-500 text-xs ml-2 flex items-center gap-1.5 font-sans">
            💬 sandeep@portfolio: ~
          </span>
        </div>

        <button
          onClick={onClose}
          disabled={isExecuting}
          className="text-zinc-500 hover:text-white transition-colors text-xs font-semibold px-2 py-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded font-sans flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Exit CLI (GUI Mode)
        </button>
      </div>

      {/* Terminal Scroll Content */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 max-w-4xl w-full mx-auto pb-24"
      >
        {history.map((item, idx) => (
          <div key={idx} className="space-y-2">
            {item.command !== "system-init" && (
              <div className="flex items-center gap-2 text-zinc-500 text-sm select-none">
                <span className="text-accent-green font-bold">sandeep@portfolio</span>
                <span>:</span>
                <span className="text-accent-blue font-bold">~</span>
                <span>$</span>
                <span className="text-zinc-200 font-medium font-mono">
                  {item.command}
                  {item.isCancelled && <span className="text-zinc-500 font-bold ml-1">^C</span>}
                  {!item.command && !item.isCancelled && <span className="opacity-0">empty</span>}
                </span>
              </div>
            )}
            <div className="pl-2 sm:pl-4">{item.output}</div>
          </div>
        ))}

        {/* Input Prompter */}
        {!isExecuting ? (
          <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 pt-2">
            <div className="flex items-center gap-2 text-zinc-500 text-sm shrink-0 select-none">
              <span className="text-accent-green font-bold">sandeep@portfolio</span>
              <span>:</span>
              <span className="text-accent-blue font-bold">~</span>
              <span>$</span>
            </div>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none border-none text-zinc-200 font-mono caret-accent-green text-sm select-text"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              maxLength={100}
            />
          </form>
        ) : (
          <div className="flex items-center gap-2 pt-2 text-zinc-600 text-sm select-none">
            <span>[BUSY] running command process...</span>
          </div>
        )}
      </div>
    </div>
  );
}
